import React, { useState } from "react"
import ReactMarkdown from "react-markdown"

import "./Editor.scss"

const Editor = () => {
    const [md, setMd] = useState();
    return (
        <div className="editor-container">
            <div className="editor">
                <textarea className="text-area" placeholder="Your markdown content goes here..." onChange={(e) => setMd(e.target.value)} ></textarea>
            </div>
            <div className="renderer">
                <ReactMarkdown>
                    {md}
                </ReactMarkdown>
            </div>
        </div>
    )
}
export default Editor