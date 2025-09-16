import React, { useState } from "react";
import { cifrarCesar, descifrarCesar } from "../ciphers_library/cesar.js";

function CesarPanel({ type }) {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (!text) return;
    const options = { normalize: "uppercase" };
    let result = "";

    result =
      type === "encrypt"
        ? cifrarCesar(text, shift, options)
        : descifrarCesar(text, shift, options);

    setOutput(result);
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel">
      <h2>{type === "encrypt" ? "Cifrar 🔏" : "Descifrar 🔓"}</h2>

      <div className="form-group">
        <label>Shift:</label>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="form-group">
        <label>Texto:</label>
        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button onClick={handleAction}>
        {type === "encrypt" ? "Cifrar" : "Descifrar"}
      </button>

      <div className="output-container">
        <div className="output">{output || "Resultado..."}</div>
        <button className="copy-btn" onClick={copyOutput}>Copy</button>
        <div className={`copy-msg ${copied ?  "show" : ""}`}>¡Texto copiado!</div>
      </div>
    </div>
  );
}

export default CesarPanel;
