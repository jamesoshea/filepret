import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      formattedFile: ""
    };
    this.uploadFile = e => {
      const files = Array.from(e.target.files);
      const formData = new FormData();

      files.forEach((file, i) => {
        formData.append(i, file);
      });
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
          headers: {
            Accept: "text/plain",
            Encoding: "multipart/form-data"
          }
        })
        .then(res => {
          this.setState({
            formattedFile: res.data
          });
        });
    };
  }

  render() {
    return (
      <div className="App">
        <h1>most-host</h1>
        <p>Welcome to cool app</p>
        <form onSubmit={() => false}>
          <input type="file" name="fileUploaded" onChange={this.uploadFile} />
        </form>
        {this.state.formattedFile && (
          <div>
            <h1>voici le file, wow</h1>
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
