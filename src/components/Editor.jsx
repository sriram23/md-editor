import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
// Prism for code keyword highlight
import Prism from "prismjs";
// remarkGfm for extended MD
import remarkGfm from "remark-gfm";
// rehypeRaw to accept html
import rehypeRaw from "rehype-raw";
import "./Editor.scss";

const Editor = ({ onCopy }) => {
  const [md, setMd] = useState({ value: "", caret: -1, target: null });
  const [splitView, setSplitView] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const textRef = useRef();
  const BUTTONS = [
    {
      id: 1,
      value: "code",
      label: "</>",
      tooltip: "Insert Code snippet",
    },
    {
      id: 2,
      value: "bold",
      label: <b>{"\u0042"}</b>,
      tooltip: "Insert Bold text",
    },
    {
      id: 3,
      value: "italics",
      label: <i>{"\u0069"}</i>,
      tooltip: "Insert Italics text",
    },
    {
      id: 4,
      value: "quote",
      label: "“ ” ",
      tooltip: "Insert Quote",
    },
    {
      id: 5,
      value: "ol",
      label: <div>1. ___</div>,
      tooltip: "Insert orderd list",
    },
    {
      id: 6,
      value: "ul",
      label: <b>{"\u2022 ___"}</b>,
      tooltip: "Insert un-ordered list",
    },
    {
      id: 7,
      value: "link",
      label: "🔗",
      tooltip: "Insert Link",
    },
    {
      id: 8,
      value: "img",
      label: "🖼",
      tooltip: "Insert image",
    },
    {
      id: 9,
      value: "strk",
      label: <strike>"Strike"</strike>,
      tooltip: "Insert Strikethrough",
    },
    {
      id: 10,
      value: "check",
      label: "☑",
      tooltip: "Insert Checklist",
    },
    {
      id: 11,
      value: "table",
      label: "□□□□",
      tooltip: "Insert table",
    },
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
      img: "![Alt](https://picsum.photos/536/354)",
      strk: "~~Strike Through~~",
      check: ` - [ ] Item 1
 - [x] Item 2`,
      table: `|Heading 1| Heading 2 |
|----------|----------|
|Value1 | Value2 `,
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
        value.substring(position) +
        "\n";
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
  const handleCopy = (e) => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.value);
      onCopy("MD Copied to Clipboard");
    }
  };

  return (
    <div className="main-editor-container">
      <div className="editor-header">
        <h1>Markdown Editor</h1>
        <div className="control-button-container">
        <button
          className="control-button"
          onClick={() => {
            setSplitView(!splitView);
          }}
        >
          {splitView ? "Show Unified view" : "Show Split view"}
        </button>
        {!splitView && (
          <button
            className="control-button"
            onClick={() => {
              setShowEditor(!showEditor);
            }}
          >
            {showEditor ? "Preview" : "Editor"}
          </button>
        )}
        </div>
      </div>
      <div className="editor-container">
        {((!splitView && showEditor) || splitView) && (
          <div className="editor">
            <h2>Editor</h2>
            <div className="button-section">
              <div className="button-container">
                {BUTTONS.map((btn) => (
                  <button
                    className="syntax-buttons"
                    key={btn.id}
                    title={btn.tooltip}
                    onClick={() => insertTemplate(btn.value)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <button
                className="copy-button"
                title="Copy the markdown to clipboard"
                onClick={handleCopy}
              >
                📄Copy
              </button>
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
        )}

        {((!splitView && !showEditor) || splitView) && (
          <div className="renderer">
            <h2>Preview</h2>
            <ReactMarkdown
              key={md.value}
              className="react-markdown"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {md.value}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default Editor;
