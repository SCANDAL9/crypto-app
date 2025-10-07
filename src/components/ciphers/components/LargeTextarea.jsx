import React from "react";
import "../../../styles/vigenerePanel.css";

const LargeTextarea = ({ label, value, onChange, placeholder, rows = 6 }) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <textarea
        rows={rows}
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default LargeTextarea;
