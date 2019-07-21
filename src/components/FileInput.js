import React from "react";
import styled from "styled-components";

const Button = styled.label`
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  font: inherit;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin: 0;
  background: transparent;
  overflow: visible;
  text-transform: none;
  border: 2px solid #7d4cdb;
  border-radius: 18px;
  color: #444444;
  padding: 4px 22px;
  font-size: 18px;
  line-height: 24px;
  -webkit-transition: 0.1s ease-in-out;
  transition: 0.1s ease-in-out;
`;

class FileInput extends React.Component {
  constructor() {
    super();
    this.state = {
      fileInput: React.createRef()
    };
  }
  handleFileChange() {
    const files = Array.from(this.state.fileInput.current.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    this.props.onFileChanged(formData);
  }
  render() {
    return (
      <form>
        <Button htmlFor={"fileInput"}>Upload</Button>
        <input
          style={{ display: "none" }}
          type="file"
          id="fileInput"
          ref={this.state.fileInput}
          onChange={() => this.handleFileChange()}
        />
      </form>
    );
  }
}

export default FileInput;
