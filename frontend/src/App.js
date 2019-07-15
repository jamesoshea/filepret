import React from 'react';
import './App.css';

function App() {
  const uploadPath = `${process.env.REACT_APP_BASE_URL}/upload`
  return (
    <div className="App">
    <h1>most-host</h1>
    <p>Welcome to cool app</p>
    <form method="post" action={uploadPath} encType="multipart/form-data">
      <input type="file" name="fileUploaded" />
      <input type="submit" />
    </form>
    </div>
  );
}

export default App;
