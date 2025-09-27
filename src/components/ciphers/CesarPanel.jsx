import React from "react";
import { useSettings } from "../../settings/SettingsContext.jsx";
import { useCesarCipher } from "../../hooks/useCesarCipher.js";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";
import OutputDisplay from "../OutputDisplay.jsx";

const PANEL_CONFIG = {
  encrypt: { title: "Cifrar 🔏", buttonText: "Cifrar" },
  decrypt: { title: "Descifrar 🔓", buttonText: "Descifrar" },
};

function CesarPanel({ type }) {
  const settings = useSettings();
  const { text, setText, shift, setShift, output, processCipher } =
    useCesarCipher(settings);

  const { copied, copyToClipboard } = useCopyToClipboard();

  const config = PANEL_CONFIG[type];

  const handleAction = () => processCipher(type);
  const handleCopy = () => copyToClipboard(output);

  return (
    <div className="panel">
      <h2>{config.title}</h2>

      <>
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
        <button onClick={handleAction}>{config.buttonText}</button>
      </>

      <OutputDisplay output={output} copied={copied} onCopy={handleCopy} />
    </div>
  );
}

export default CesarPanel;
