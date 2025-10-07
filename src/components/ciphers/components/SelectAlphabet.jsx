import React, { useState } from "react";
import ModalAlphabet from "./ModalAlphabet.jsx";
import "../../../styles/vigenerePanel.css";

const SelectAlphabet = ({ value, onChange }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (e) => {
    const val = e.target.value;
    if (val === "Personalizado...") {
      setShowModal(true);
    } else {
      onChange(val);
    }
  };

  return (
    <>
      <div className="input-group">
        <label className="input-label">Alfabeto</label>
        <select className="input-field" value={value} onChange={handleSelect}>
          <option>Inglés (A–Z)</option>
          <option>Español (A–Z + Ñ)</option>
          <option>a–z</option>
          <option>Alfanumérico</option>
          <option>A–Z + 0–9 + espacio</option>
          <option>Personalizado...</option>
        </select>
      </div>

      {showModal && (
        <ModalAlphabet
          onClose={() => setShowModal(false)}
          onConfirm={(customAlphabet) => {
            onChange(customAlphabet);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default SelectAlphabet;
