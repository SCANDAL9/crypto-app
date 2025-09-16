import React from "react";
import CesarPanel from "./CesarPanel.jsx";
// import VigenerePanel from "./VigenerePanel.jsx"; // futuro

function CipherPanel({ type, method }) {
  switch (method) {
    case "cesar":
      return <CesarPanel type={type} />;
    // case "vigenere":
    //   return <VigenerePanel type={type} />;
    default:
      return <div>Selecciona un cifrado</div>;
  }
}

export default CipherPanel;
