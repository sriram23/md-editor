import React, {useState, useEffect} from "react";
import Editor from "./components/Editor.jsx";
import "./App.scss";
const App = () => {
  const [toast, setToast] = useState("")
  const [toastCount, setToastCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, [toastCount]);
  return (
    <div className="main-container">
      <Editor onCopy={(text) => {
        setToastCount(toastCount+1)
        setToast(text)
        console.log(text)
      }}/>
      {showToast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default App;
