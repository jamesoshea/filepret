import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Divider } from "@blueprintjs/core";
import axios from "axios";
import "./App.css";
const REACT_APP_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000/api";

const App = props => {
  const [formattedFile, setFormattedFile] = useState("");
  const [formattedFileName, setFormattedFileName] = useState("");

  const uploadFile = e => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    axios
      .post(`${REACT_APP_BASE_URL}/upload`, formData, {
        headers: {
          Accept: "application/json",
          Encoding: "multipart/form-data"
        }
      })
      .then(res => {
        setFormattedFileName(res.data.fileName);
        setFormattedFile(res.data.file);
      });
  };

  useEffect(() => {
    if (!window.location.pathname.includes("/files/")) {
      return;
    }
    const fileName = window.location.pathname.split("/")[2];
    axios
      .get(`${REACT_APP_BASE_URL}/files/${fileName}`, {
        headers: {
          Accept: "text/plain"
        }
      })
      .then(res => {
        setFormattedFileName(fileName);
        setFormattedFile(res.data);
      });
  }, []);
  return (
    <div className="app">
      <h1>host-with-the-most</h1>
      <p>Enterprise grade&trade; JavaScript snippet formatter and file host</p>
      <Divider />
      <label className="bp3-file-input">
        <span className="bp3-file-upload-input"></span>
        <input type="file" name="fileUploaded" onChange={uploadFile} />
      </label>
      {formattedFile && formattedFileName && (
        <div>
          <Divider />
          <a href={`${window.location.origin}/files/${formattedFileName}`}>
            Permalink
          </a>
          <SyntaxHighlighter language="javascript" style={docco}>
            {formattedFile}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default App;
