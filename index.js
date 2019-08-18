require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const prettier = require("prettier");
const app = express();

const { S3PutObjectPromisified } = require("./util/promisified-functions");

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "../build")));
app.use(fileUpload());
app.use(cors());

app.post("/upload", async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;
    const currentTime = Date.now();

    const fileName = `${file.md5}-${currentTime}.js`;
    const unformattedFile = file.data.toString();
    const formattedFile = prettier.format(unformattedFile, { parser: "babel" });
    const base64data = Buffer.from(formattedFile, "binary");

    await S3PutObjectPromisified(fileName, base64data);
    res.status(200).send({
      fileName: `${file.md5}-${currentTime}-formatted`,
      file: formattedFile
    });
  } catch (error) {
    next(new Error(error));
  }
});

app.use((error, req, res) => {
  console.log(error);
  res.status(500).json({ message: error.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
