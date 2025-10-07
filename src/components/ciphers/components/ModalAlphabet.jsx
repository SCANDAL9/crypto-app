import React, { useState } from "react";
import "../../../styles/vigenerePanel.css";

const ModalAlphabet = ({ onClose, onConfirm }) => {
  const [customAlphabet, setCustomAlphabet] = useState("");
  const [error, setError] = useState("");

  const validateAlphabet = (text) => {
    if (!text) return setError("El alfabeto no puede estar vacío");
    const set = new Set([...text]);
    if (set.size !== text.length)
      return setError("El alfabeto contiene caracteres duplicados");
    setError("");
    onConfirm(text);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000
      }}
    >
      <div style={{
        background: "#0f192e",
        borderRadius: "12px",
        padding: "24px",
        width: "360px",
        color: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Alfabeto Personalizado</h3>
        <p style={{ fontSize: "13px", opacity: 0.8, marginBottom: "10px" }}>
          Ingresa los caracteres del alfabeto (sin espacios ni duplicados)
        </p>
        <input
          type="text"
          className="input-field"
          value={customAlphabet}
          onChange={(e) => setCustomAlphabet(e.target.value)}
          placeholder="ej: ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        />
        {error && <span style={{ color: "#ff5c5c", fontSize: "13px" }}>{error}</span>}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
          <button className="secondary" onClick={onClose}>Cancelar</button>
          <button
            className="primary"
            onClick={() => validateAlphabet(customAlphabet)}
            disabled={!!error}
            style={{ opacity: error ? 0.5 : 1 }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlphabet;
