import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Grommet, Heading } from "grommet";
import axios from "axios";
import "./App.css";
import FileInput from "./components/FileInput";
import Permalink from "./components/Permalink";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const REACT_APP_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000/api";

const App = () => {
  const [formattedFile, setFormattedFile] = useState("");
  const [formattedFileName, setFormattedFileName] = useState("");
  const fileInput = React.createRef();

  const uploadFile = formData => {
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
      })
      .catch(err => {
        setFormattedFileName("");
        setFormattedFile("");
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
    <Grommet theme={theme}>
      <Heading>host-with-the-most</Heading>
      <FileInput inputRef={fileInput} onFileChanged={uploadFile} />
      {formattedFile && formattedFileName && (
        <div>
          <Permalink formattedFileName={formattedFileName} />
          <SyntaxHighlighter language="javascript" style={docco}>
            {formattedFile}
          </SyntaxHighlighter>
        </div>
      )}
    </Grommet>
  );
};

export default App;
