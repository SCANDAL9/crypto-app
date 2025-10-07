import React from "react";
import "../../../styles/vigenerePanel.css";

const InputText = ({ label, value, onChange, placeholder, error, type = "text" }) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <span style={{ color: "#ff5c5c", fontSize: "13px" }}>{error}</span>}
    </div>
  );
};

export default InputText;
