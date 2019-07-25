require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const app = express();

const {
  ExpressMoveFilePromisified,
  S3GetObjectPromisified,
  S3PutObjectPromisified
} = require("./util/promisified-functions");

const port = process.env.PORT || 8000;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(fileUpload());
app.use(cors());

app.get("/files/:fileId", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  } catch (error) {
    next(new Error(error));
  }
});

app.get("/api/files/:fileName", async (req, res, next) => {
  try {
    const data = await S3GetObjectPromisified(
      `${req.params.fileName.replace("-formatted", "")}.js`
    );
    res.send(data.Body.toString());
  } catch (error) {
    next(new Error(error));
  }
});

app.post("/api/upload", async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const file = req.files[0];
    const currentTime = Date.now();
    const fileName = `/tmp/${file.md5}-${currentTime}.js`;
    await ExpressMoveFilePromisified(file, fileName);
    const unformattedFile = fs.readFileSync(fileName).toString();
    const formattedFile = prettier.format(unformattedFile);
    const base64data = new Buffer(formattedFile, "binary");
    await S3PutObjectPromisified(fileName, base64data);
    fs.writeFileSync(
      `/tmp/${file.md5}-${currentTime}-formatted.js`,
      formattedFile
    );
    res.status(200).send({
      fileName: `${file.md5}-${currentTime}-formatted`,
      file: formattedFile
    });
  } catch (error) {
    next(new Error(error));
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: error.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
