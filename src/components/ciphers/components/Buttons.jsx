import React from "react";
import "../../../styles/vigenerePanel.css";

export const PrimaryButton = ({ children, onClick, disabled }) => (
  <button
    className="primary"
    onClick={onClick}
    disabled={disabled}
    style={{ opacity: disabled ? 0.6 : 1 }}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, onClick }) => (
  <button className="secondary" onClick={onClick}>
    {children}
  </button>
);
