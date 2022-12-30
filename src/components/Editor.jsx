import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import remarkGfm from 'remark-gfm'

import "./Editor.scss";

const Editor = () => {
  const [md, setMd] = useState({ value: "", caret: -1, target: null });
  const textRef = useRef();
  const BUTTONS = [
    {
      id: 1,
      value: "code",
      label: "</>",
    },
    {
      id: 2,
      value: "bold",
      label: (<b>{"\u0042"}</b>),
    },
    {
      id: 3,
      value: "italics",
      label: (<i>{"\u0069"}</i>),
    },
    {
      id: 4,
      value: "quote",
      label: "\u0022",
    },
    {
      id: 5,
      value: "ol",
      label: "1",
    },
    {
      id: 6,
      value: "ul",
      label: "\u2022",
    },
    {
      id: 7,
      value: "link",
      label: "Link",
    },
    {
      id: 8,
      value: "img",
      label: "Image",
    },
    {
      id: 9,
      value: "strk",
      label: "Strike through"
    },
    {
      id: 10,
      value: "check",
      label: "Task List"
    },
    {
      id: 11,
      value: "table",
      label: "Table"
    }
  ];
  useEffect(() => {
    Prism.highlightAll();
  });
  useEffect(() => {
    textRef.current.selectionStart = md.caret;
    textRef.current.selectionEnd = md.caret;
  }, [md]);
  const handleKeyChange = (e) => {
    setMd({
      value: e.target.value,
      caret: e.target.selectionStart,
      target: e.target,
    });
  };
  const handleTab = (e) => {
    let content = e.target.value;
    let caret = e.target.selectionStart;
    if (e.key === "Tab") {
      e.preventDefault();
      let newText =
        content.substring(0, caret) + "\t" + content.substring(caret);
      setMd({ value: newText, caret: caret + 1, target: e.target });
    }
  };

  const getSyntax = (type) => {
    const syntax = {
      code: `\`\`\` Javascript -- Change your language
\`\`\``,
      bold: "__Bold__",
      italics: "_italics_",
      quote: "> Quote",
      ol: "1. ",
      ul: "- ",
      link: "[Link](https://link.com)",
      img: "![Alt](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1024px-Markdown-mark.svg.png)",
      strk: "~~Strike Through~~",
      check: ` - [ ] Item 1
 - [x] Item 2`,
      table: `|Heading 1| Heading 2 |
|----------|----------|
|Value1 | Value2 `
    };
    return syntax[type];
  };

  const insertTemplate = (type) => {
    const value = md.value;
    const position = md.caret;
    if (textRef.current.selectionStart === textRef.current.selectionEnd) {
      const syntax = getSyntax(type);
      const finalValue =
        value.substring(0, position) +
        syntax +
        "\n" +
        value.substring(position)+"\n";
      setMd((pr) => ({
        ...pr,
        // TODO: Need to check why 3 works and lesser values doesn't work
        caret: pr.caret + syntax.length + 3,
        value: finalValue,
      }));
    } else {
      const finalValue =
        value.substring(0, textRef.current.selectionStart) +
        "``` Javascript\n" +
        value.substring(
          textRef.current.selectionStart,
          textRef.current.selectionEnd
        ) +
        "\n```" +
        value.substring(textRef.current.selectionEnd);
      setMd((pr) => ({
        ...pr,
        value: finalValue,
      }));
    }
  };

  return (
    <div className="editor-container">
      <div className="editor">
        <h2>Editor</h2>
        <div className="button-container">
          {/* <button onClick={() => insertTemplate("code")}>{"</>"}</button> */}
          {BUTTONS.map((btn) => (
            <button key={btn.id} onClick={() => insertTemplate(btn.value)}>
              {btn.label}
            </button>
          ))}
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
        <ReactMarkdown className="react-markdown" remarkPlugins={[remarkGfm]}>{md.value}</ReactMarkdown>
      </div>
    </div>
  );
};
export default Editor;
