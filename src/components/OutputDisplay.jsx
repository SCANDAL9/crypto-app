import React from 'react';

const OutputDisplay = ({ output, copied, onCopy }) => {
  return (
    <div className="output-container">
      <div className="output">{output || "Resultado..."}</div>
      <button className="copy-btn" onClick={onCopy}>
        Copy
      </button>
      <div className={`copy-msg ${copied ? "show" : ""}`}>
        ¡Texto copiado!
      </div>
    </div>
  );
};

export default OutputDisplay;