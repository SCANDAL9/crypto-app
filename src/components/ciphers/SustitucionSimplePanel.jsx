import React from "react";
import { useSettings } from "../../settings/SettingsContext.jsx";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";
import OutputDisplay from "../OutputDisplay.jsx";
import { useGenericCipher } from "../../hooks/useGenericCipher.js";
import {
  cifrarSustitucionSimple,
  descifrarSustitucionSimple,
} from "../../ciphers_library/sustitucionSimple.js";

const PANEL_CONFIG = {
  encrypt: { title: "Cifrar 🔏", buttonText: "Cifrar" },
  decrypt: { title: "Descifrar 🔓", buttonText: "Descifrar" },
};

function SustitucionSimplePanel({ type }) {
  const settings = useSettings();

  // Definimos funciones de cifrado y descifrado
  const cipherFunctions = {
    type: "sustitucion-simple",
    encrypt: cifrarSustitucionSimple,
    decrypt: descifrarSustitucionSimple,
  };

  // Hook genérico para manejar texto, clave y salida
  const { text, setText, key, setKey, output, processCipher } =
    useGenericCipher(cipherFunctions, settings, "CLAVE");

  const { copied, copyToClipboard } = useCopyToClipboard();
  const config = PANEL_CONFIG[type];

  const handleAction = () => processCipher(type);
  const handleCopy = () => copyToClipboard(output);

  return (
    <div className="panel">
      <h2>{config.title}</h2>

      <>
        <div className="form-group">
          <label>Palabra Clave:</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Ejemplo: CLAVE"
          />
          <small>
            ⚙️ Se usará esta clave para generar el alfabeto permutado.
          </small>
        </div>

        <div className="form-group">
          <label>Texto:</label>
          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <button onClick={handleAction}>{config.buttonText}</button>
      </>

      <OutputDisplay output={output} copied={copied} onCopy={handleCopy} />
    </div>
  );
}

export default SustitucionSimplePanel;
