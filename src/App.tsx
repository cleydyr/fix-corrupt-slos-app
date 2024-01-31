import { useState } from "react"
import { processCode } from "./lib/process-code";
import "./App.css"

function App() {
  const [code, setCode] = useState("");

  const output = code === "" ? "" : (processCode(code) ?? "Unexpected or malformed JSON");

  return (
    <>
    <div className="header">
      <h1>Corrupt SLO Fixer</h1>
    </div>
    <div className="main">
      <div className="container">
          <div className="column">
            <h2>Input</h2>
            <textarea
            onChange={(event) => {
              setCode(event.target.value);
            }} />
          </div>
          <div className="column">
            <h2>Output</h2>
            <textarea
              disabled
              value={output} />
          </div>
        </div>
    </div>
    <div className="footer">
      <p>🌻 by Cleydyr</p>
    </div>
    </>
  )
}

export default App
