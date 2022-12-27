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
    textRef.current.selectionEnd = md.caret 
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
    } 
  }

  const insertCode = () => {
    const value = md.value
    const position = md.caret
    if(textRef.current.selectionStart === textRef.current.selectionEnd){
      const code = `\`\`\` Javascript -- Change your language
\`\`\``
    const finalValue = value.substring(0,position) + code + "\n" + value.substring(position)
    setMd((pr) => ({
      ...pr,
      value: finalValue
    }))
    } else {
      const finalValue = value.substring(0, textRef.current.selectionStart)+ "``` Javascript\n" + value.substring(textRef.current.selectionStart, textRef.current.selectionEnd) + "\n```" + value.substring(textRef.current.selectionEnd)
      setMd((pr) => ({
      ...pr,
      value: finalValue
    }))
    } 
    
  }
  
  return (
    <div className="editor-container">
      <div className="editor">
        <h2>Editor</h2>
        <div className="button-container">
          <button onClick={insertCode}>{"</>"}</button>
        </div>
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
        <h2>Preview</h2>
        <ReactMarkdown className="react-markdown">{md.value}</ReactMarkdown>
      </div>
    </div>
  );
};
export default Editor;
