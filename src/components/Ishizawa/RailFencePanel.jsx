import React, { useState } from "react";
import { useSettings } from "../../settings/SettingsContext.jsx";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";
import OutputDisplay from "../OutputDisplay.jsx";
import { useGenericCipher } from "../../hooks/useGenericCipher.js";
import { cifrarRailFence, descifrarRailFence } from "../../ciphers_library/Ishizawa/railFence.js";

const PANEL_CONFIG = {
  encrypt: { title: "Cifrar 🔏", buttonText: "Cifrar" },
  decrypt: { title: "Descifrar 🔓", buttonText: "Descifrar" },
};

function RailFencePanel({ type }) {
  const settings = useSettings();

  const cipherFunctions = { 
    type: 'railfence', 
    encrypt: (text, railsCount, alphabet) => cifrarRailFence(text, railsCount, alphabet), 
    decrypt: (text, railsCount, alphabet) => descifrarRailFence(text, railsCount, alphabet)
  };

  const { text, setText, key, setKey, output, processCipher } =
    useGenericCipher(cipherFunctions, settings, "3");

  const { copied, copyToClipboard } = useCopyToClipboard();

  const config = PANEL_CONFIG[type];

  const handleAction = () => processCipher(type);
  const handleCopy = () => copyToClipboard(output);

  return (
    <div className="panel">
      <h2>{config.title}</h2>

      <>
        <div className="form-group">
          <label>Rieles:</label>
          <input
            type="number"
            value={key}
            onChange={(e) => setKey(parseInt(e.target.value, 10))}
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

export default RailFencePanel;