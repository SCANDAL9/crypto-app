import React from "react";
import { useSettings } from "../context/SettingsContext.jsx";
import { useCesarCipher } from "../hooks/useCesarCipher.js";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import CipherForm from "./CipherForm.jsx";
import OutputDisplay from "./OutputDisplay.jsx";

const PANEL_CONFIG = {
  encrypt: {
    title: "Cifrar 🔏",
    buttonText: "Cifrar"
  },
  decrypt: {
    title: "Descifrar 🔓",
    buttonText: "Descifrar"
  }
};

function CesarPanel({ type }) {
  const settings = useSettings();
  const { 
    text, 
    setText, 
    shift, 
    setShift, 
    output, 
    processCipher 
  } = useCesarCipher(settings);
  
  const { copied, copyToClipboard } = useCopyToClipboard();

  const config = PANEL_CONFIG[type];
  
  const handleAction = () => processCipher(type);
  const handleCopy = () => copyToClipboard(output);

  return (
    <div className="panel">
      <h2>{config.title}</h2>
      
      <CipherForm
        shift={shift}
        onShiftChange={setShift}
        text={text}
        onTextChange={setText}
        onSubmit={handleAction}
        buttonText={config.buttonText}
      />
      
      <OutputDisplay
        output={output}
        copied={copied}
        onCopy={handleCopy}
      />
    </div>
  );
}

export default CesarPanel;


