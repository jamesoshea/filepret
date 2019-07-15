const express = require("express");
const path = require("path");
const prettier = require("prettier");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(fileUpload());
app.use(cors());

app.post("/api/upload", function(req, res) {
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files[0];
  const currentTime = Date.now();
  const fileName = `/tmp/${file.md5}-${currentTime}.js`;
  file.mv(fileName, err => {
    if (err) return res.status(500).send(err);
    const unformattedFile = fs.readFileSync(fileName).toString();
    const formattedFile = prettier.format(unformattedFile);
    fs.writeFileSync(
      `/tmp/${file.md5}-${currentTime}-formatted.js`,
      formattedFile
    );
    res.sendFile(`/tmp/${file.md5}-${currentTime}-formatted.js`, {}, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("File sent");
      }
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
