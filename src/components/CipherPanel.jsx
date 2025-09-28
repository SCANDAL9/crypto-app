import React from "react";
import CesarPanel from "./ciphers/CesarPanel.jsx";
import TranspColumnPanel from "./ciphers/TranspColumnPanel.jsx";
import AutokeyPanel from "./ciphers/AutokeyPanel.jsx";
// import VigenerePanel from "./VigenerePanel.jsx"; // futuro

function CipherPanel({ type, method }) {
  switch (method) {
    case "cesar":
      return <CesarPanel type={type} />;
    // case "vigenere":
    //   return <VigenerePanel type={type} />;
    case "autokey":
      return  <AutokeyPanel type={type} />;
    case "transposicion-columnas":
      return <TranspColumnPanel type={type} />;
    default:
      return <div>Selecciona un cifrado</div>;
  }
}

export default CipherPanel;
