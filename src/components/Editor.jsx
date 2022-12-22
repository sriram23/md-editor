import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
const Editor = () => {
    const [md, setMd] = useState("");
    return (
        <div>
            <textarea onChange={(e) => setMd(e.target.value)} ></textarea>
            <div>
                <ReactMarkdown>
                    {md}
                </ReactMarkdown>
            </div>
        </div>
    )
}
export default Editor