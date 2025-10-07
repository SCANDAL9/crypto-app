// src/components/ciphers/VigenerePanel.jsx
import React from "react";
import { useSettings } from "../../settings/SettingsContext.jsx";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";
import OutputDisplay from "../OutputDisplay.jsx";
import { useGenericCipher } from "../../hooks/useGenericCipher.js";
import { cifrarVigenere, descifrarVigenere } from "../../ciphers_library/vigenere.js";
import "../../styles/vigenerePanel.css"; 

const PANEL_CONFIG = {
  encrypt: { title: "Cifrar 🔏", buttonText: "Cifrar" },
  decrypt: { title: "Descifrar 🔓", buttonText: "Descifrar" },
};

function VigenerePanel({ type }) {
  const settings = useSettings();

  const cipherFunctions = {
    type: "vigenere",
    encrypt: cifrarVigenere,
    decrypt: descifrarVigenere,
  };

  const { text, setText, key, setKey, output, processCipher } =
    useGenericCipher(cipherFunctions, settings, "CLAVE");

  const { copied, copyToClipboard } = useCopyToClipboard();
  const config = PANEL_CONFIG[type];

  const handleAction = () => processCipher(type);
  const handleCopy = () => copyToClipboard(output);

  return (
    <div className="panel vigenere-panel">
      <h2 className="vigenere-title">{config.title}</h2>

      <div className="form-group">
        <label>Clave:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Ejemplo: CLAVE"
          className="vigenere-input"
        />
      </div>

      <div className="form-group">
        <label>Texto:</label>
        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingrese el texto a cifrar o descifrar"
          className="vigenere-textarea"
        />
      </div>

      <button className="vigenere-btn" onClick={handleAction}>
        {config.buttonText}
      </button>

      <OutputDisplay output={output} copied={copied} onCopy={handleCopy} />
    </div>
  );
}

export default VigenerePanel;
