import React from "react";
import CesarPanel from "./ciphers/CesarPanel.jsx";
import TranspColumnPanel from "./ciphers/TranspColumnPanel.jsx";
import AutokeyPanel from "./ciphers/AutokeyPanel.jsx";
import VigenerePanel from "./ciphers/VigenerePanel.jsx";

// Alison cifrados
import PlayfairPanel from "./Alison_Panel/PlayfairPanel.jsx";
import XORPanel from "./Alison_Panel/XORPanel.jsx";

// Criptoanálisis
import VigenereBruteForce from "./brute_force/VigenereBruteForce.jsx";
import CesarBruteForce from "./brute_force/CesarBruteForce.jsx";

// Ishizawa cifrados
import PermutacionPanel from "./Ishizawa/PermutacionPanel.jsx";
import RailFencePanel from "./Ishizawa/RailFencePanel.jsx";


function CipherPanel({ type, method }) {
  switch (method) {
    case "cesar":
      return <CesarPanel type={type} />;
    case "vigenere":
      return <VigenerePanel type={type} />;
    case "autokey":
      return  <AutokeyPanel type={type} />;
    case "transposicion-columnas":
      return <TranspColumnPanel type={type} />;
    case "playfair":
      return <PlayfairPanel type={type} />;
    case "xor":
      return <XORPanel type={type} />;
    case "vigenere-brute-force":
      return <VigenereBruteForce />;
    case "cesar-brute-force":
      return <CesarBruteForce />;
    case "permutacion":
      return <PermutacionPanel type={type} />;
    case "rail-fence":
      return <RailFencePanel type={type} />;
    default:
      return <div>Selecciona un cifrado</div>;
  }
}

export default CipherPanel;
