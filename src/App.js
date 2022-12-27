import React from "react";
import Editor from "./components/Editor.jsx";
import "./App.scss";
const App = () => {
  return (
    <div className="main-container">
      <div className="alert">
        Alert: This is still in development. Everything might not work and
        sometime would crash
      </div>
      <Editor />
    </div>
  );
};

export default App;
