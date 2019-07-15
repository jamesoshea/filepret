const express = require("express");
// const crypto = require("crypto");
const path = require("path");
const prettier = require("prettier");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "static")));
app.use(fileUpload());

app.post("/upload", function(req, res) {
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.fileUploaded;
  const currentTime = Date.now();
  const fileName = `./files/${currentTime}.js`;

  file.mv(fileName, (err) => {
    if (err) return res.status(500).send(err);
    const unformattedFile = fs.readFileSync(fileName).toString();
    const formattedFile = prettier.format(unformattedFile, {
      semi: false,
      parser: "babel"
    });
    fs.writeFileSync(`./files/${currentTime}-formatted.js`, formattedFile);
    res.sendFile(path.join(__dirname, `files/${currentTime}-formatted.js`), {}, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Sent:', fileName)
        }
      })
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
