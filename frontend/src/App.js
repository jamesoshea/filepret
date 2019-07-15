import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import "./App.css";
const REACT_APP_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      formattedFileName: "",
      formattedFile: ""
    };
    this.uploadFile = e => {
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
          this.setState({
            formattedFileName: res.data.fileName,
            formattedFile: res.data.file
          });
        });
    };
  }
  componentDidMount() {
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
        this.setState({
          formattedFileName: fileName,
          formattedFile: res.data
        });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>most-host</h1>
        <p>Welcome to cool app</p>
        <form onSubmit={() => false}>
          <input type="file" name="fileUploaded" onChange={this.uploadFile} />
        </form>
        {this.state.formattedFile && this.state.formattedFileName && (
          <div>
            <h3>enjoy your form atting</h3>
            <a
              href={`${window.location.origin}/files/${this.state.formattedFileName}`}
            >
              permalink
            </a>
            <SyntaxHighlighter language="javascript" style={docco}>
              {this.state.formattedFile}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    );
  }
}

export default App;
