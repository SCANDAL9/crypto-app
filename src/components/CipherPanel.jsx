import React, { useState } from "react";
import {
  cifrarCesar,
  descifrarCesar,
} from "../ciphers_library/cesar.js";

function CipherPanel({ type }) {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [method, setMethod] = useState("cesar");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (!text) return;
    let result = "";
    const options = { normalize: "uppercase" };

    if (type === "encrypt") {
      switch (method) {
        case "cesar":
          result = cifrarCesar(text, shift, options);
          break;
      }
    } else {
      switch (method) {
        case "cesar":
          result = descifrarCesar(text, shift, options);
          break;
      }
    }
    setOutput(result);
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true); // muestra el mensaje
    setTimeout(() => setCopied(false), 2000); // opcional: puedes hacer un div tipo snackbar
  };

  return (
    <div className="panel">
      <h2>{type === "encrypt" ? "Cifrar 🔏" : "Descifrar 🔓"}</h2>
      <div className="form-group">
        <label>Método:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="cesar">César</option>
          {/* Más métodos */}
        </select>
      </div>

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
        <button className="copy-btn" onClick={copyOutput}>
          Copy
        </button>
        <div className={`copy-msg ${copied ? "show" : ""}`}>
          ¡Texto copiado!
        </div>
      </div>
    </div>
  );
}

export default CipherPanel;
