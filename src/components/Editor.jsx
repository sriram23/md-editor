import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";

import "./Editor.scss";
import PLACEHOLDER from "../static/defaultMd";

const Editor = () => {
  const spaces = 4
  const [md, setMd] = useState({value: PLACEHOLDER, caret: -1, target: null});
  useEffect(() => {
    Prism.highlightAll();
  });
  useEffect(() => {

    if(md.caret >= 0){

        md.target.setSelectionRange(md.caret + spaces, md.caret + spaces);

    }

}, [md]);
  const handleKeyChange = (e) => {
    setMd({value: e.target.value, caret: -1, target: e.target})
  }
  const handleTab = (e) => {
    let content = e.target.value;
    let caret   = e.target.selectionStart;
    if(e.key === "Tab"){
      console.log("Tab is pressed")
      e.preventDefault()
      let newText = content.substring(0, caret) + ' '.repeat(spaces) + content.substring(caret);
      setMd({value: newText, caret: caret, target: e.target});
    }
  }
  return (
    <div className="editor-container">
      <div className="editor">
        <textarea
          className="text-area"
          placeholder="Your markdown content goes here..."
          onChange={handleKeyChange}
          onKeyDown={handleTab}
          value={md.value}
        ></textarea>
      </div>
      <div className="renderer">
        <ReactMarkdown>{md.value}</ReactMarkdown>
      </div>
    </div>
  );
};
export default Editor;
