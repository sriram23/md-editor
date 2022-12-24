import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";

import "./Editor.scss";

const Editor = () => {
  const [md, setMd] = useState({value: "", caret: -1, target: null});
  const textRef =  useRef()
  useEffect(() => {
    Prism.highlightAll();
  });
  useEffect(() => {
    textRef.current.selectionStart = md.caret 
  }, [md])
  const handleKeyChange = (e) => {
    setMd({value: e.target.value, caret: e.target.selectionStart, target: e.target})
  }
  const handleTab = (e) => {
    let content = e.target.value;
    let caret   = e.target.selectionStart;
    if(e.key === "Tab"){
      e.preventDefault()
      let newText = content.substring(0, caret) + '\t' + content.substring(caret);
      setMd({value: newText, caret: caret+1, target: e.target});
    } else {
      setMd((pr) => ({
        ...pr,
        caret,
        target: e.target
      }))
    }
  }
  return (
    <div className="editor-container">
      <div className="editor">
        <textarea
          className="text-area"
          ref={textRef}
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
