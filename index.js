require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const prettier = require("prettier");

const { version } = require("./package.json");
const app = express();

const { S3PutObjectPromisified } = require("./util/promisified-functions");

const port = process.env.PORT || 8000;

app.use(fileUpload());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(`Prêt-à-formatter upload version ${version} running`);
});

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

// eslint-disable-next-line
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: error.message });
  next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
