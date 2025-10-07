import React from "react";
import "../../../styles/vigenerePanel.css";

const ResultCard = ({ result, onCopy, length, coincidenceIndex }) => {
  return (
    <div className="result-card">
      <div className="result-header">
        <span>Resultado</span>
        <button className="copy-btn" onClick={onCopy}>📋 Copiar</button>
      </div>
      <textarea readOnly rows={4} value={result || ""}></textarea>
      {result && (
        <small style={{ opacity: 0.7 }}>
          Longitud: {length} | Índice de coincidencia: {coincidenceIndex.toFixed(4)}
        </small>
      )}
    </div>
  );
};

export default ResultCard;
