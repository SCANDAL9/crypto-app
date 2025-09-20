import React, { useState } from "react";
import { cifrarCesar, descifrarCesar } from "../ciphers_library/cesar.js";
import { useSettings } from "./context/SettingsContext.jsx";

function CesarPanel({ type }) {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    alphabetType,
    customAlphabet,
    enableNormalization,
    preserveCase
  } = useSettings();

  const getAlphabet = () => {
    switch (alphabetType) {
      case "mayusculas":
        return { alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" };
      case "minusculas":
        return { alphabet: "abcdefghijklmnopqrstuvwxyz" };
      case "mayusminus":
        return {
          alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        };
      case "simbolos":
        return {
          alphabet: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
        };
      case "alfanumerico":
        return {
          alphabet:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        };
      case "numeros":
        return { alphabet: "0123456789" };
      case "personalizado":
        return { alphabet: customAlphabet };
      default:
        return { alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" };
    }
  };

  const normalizeTextInput = (inputText) => {
    if (!enableNormalization) return inputText;

    switch (alphabetType) {
      case "mayusculas":
        return inputText.toUpperCase();
      case "minusculas":
        return inputText.toLowerCase();
      case "mayusminus":
      case "simbolos":
      case "alfanumerico":
      case "numeros":
      case "personalizado":
      default:
        return inputText;
    }
  };

  const deleteCase = (inputText, alphabet) => {
    return inputText
      .split("")
      .filter(char => alphabet.includes(char)) // solo dejamos los que están en el alfabeto
      .join("");
  }

  const handleAction = () => {
    if (!text) return;
    const alphabet = getAlphabet().alphabet;

    let processedText = preserveCase ? text : deleteCase(text, alphabet);
    processedText = normalizeTextInput(processedText);
    
    let result = "";
    result =
      type === "encrypt"
        ? cifrarCesar(processedText, shift, alphabet)
        : descifrarCesar(processedText, shift, alphabet);

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

export default CesarPanel;
