// src/componentes/TransColumnPanel.jsx
import React, { useState } from "react";
import { useSettings } from "../../settings/SettingsContext.jsx";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";
import OutputDisplay from "../OutputDisplay.jsx";
// import { useTranspColumnCipher } from "../../hooks/ciphers/useTranspColumnCipher.js";
import { useGenericCipher } from "../../hooks/useGenericCipher.js";
import { cifrarTranspColumn, descifrarTranspColumn } from "../../ciphers_library/transposicionColumnas.js";

const PANEL_CONFIG = {
  encrypt: { title: "Cifrar 🔏", buttonText: "Cifrar" },
  decrypt: { title: "Descifrar 🔓", buttonText: "Descifrar" },
};

function TranspColumnPanel({ type }) {
  const settings = useSettings(); 

  const cipherFunctions = { 
    type: 'transposicion-columnas', 
    encrypt: cifrarTranspColumn, 
    decrypt: descifrarTranspColumn 
  };

  const { text, setText, key, setKey, output, processCipher } =
    useGenericCipher(cipherFunctions, settings, "KEY");

  const { copied, copyToClipboard } = useCopyToClipboard();

  const config = PANEL_CONFIG[type];

  const handleAction = () => processCipher(type);
  const handleCopy = () => copyToClipboard(output);

  return (
    <div className="panel">
      <h2>{config.title}</h2>

      <>
        <div className="form-group">
          <label>Clave:</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
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
        <button onClick={handleAction}>{config.buttonText}</button>
      </>

      <OutputDisplay output={output} copied={copied} onCopy={handleCopy} />
    </div>
  );
}

export default TranspColumnPanel;
