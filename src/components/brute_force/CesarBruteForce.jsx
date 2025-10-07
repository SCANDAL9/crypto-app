import React from "react";
import { useCesarAnalysis } from "../../hooks/useCesarAnalysis.js";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";

function CesarBruteForce() {
  const {
    textoCifrado,
    resultado,
    detallesAnalisis,
    ejecutando,
    setTextoCifrado,
    ejecutarAtaqueFuerzaBruta,
  } = useCesarAnalysis();
  
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleCopyDetalles = () => copyToClipboard(detallesAnalisis);
  const handleCopyResultado = () => copyToClipboard(resultado);

  return (
    <div className="double-panel">
      {/* Panel izquierdo: Análisis */}
      <div className="panel">
        <h2>🔓 Ataque César - Fuerza Bruta</h2>

        <div className="form-group">
          <label>Texto Cifrado:</label>
          <textarea
            rows="8"
            value={textoCifrado}
            onChange={(e) => setTextoCifrado(e.target.value.toUpperCase())}
            placeholder="Ingresa el texto cifrado con César para analizarlo..."
          />
          <small style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
            📏 Longitud: {textoCifrado.length} caracteres
            {textoCifrado.length < 10 &&
              textoCifrado.length > 0 &&
              " ⚠️ Se recomiendan al menos 10 caracteres"}
          </small>
        </div>

        <button
          onClick={ejecutarAtaqueFuerzaBruta}
          disabled={ejecutando || !textoCifrado.trim()}
          style={{
            opacity: ejecutando ? 0.6 : 1,
            cursor: ejecutando ? "not-allowed" : "pointer",
          }}
        >
          {ejecutando ? "⏳ Analizando..." : "🚀 Ejecutar Fuerza Bruta"}
        </button>

        {/* Detalles del análisis */}
        <div className="output-container">
          <button className="copy-btn" onClick={handleCopyDetalles}>
            Copy
          </button>
          <div
            className="output"
            style={{
              minHeight: "200px",
              fontSize: "11px",
              lineHeight: "1.4",
              whiteSpace: "pre-line",
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {detallesAnalisis || "Los detalles del análisis César aparecerán aquí..."}
          </div>
          <div className={`copy-msg ${copied ? "show" : ""}`}>
            ¡Detalles copiados!
          </div>
        </div>
      </div>

      {/* Panel derecho: Resultados */}
      <div className="panel">
        <h2>📋 Resultado</h2>

        <div className="output-container">
          <button className="copy-btn" onClick={handleCopyResultado}>
            Copy
          </button>
          <div
            className="output"
            style={{
              minHeight: "300px",
              backgroundColor: resultado.includes("🔍")
                ? "rgba(40, 167, 69, 0.2)"
                : resultado.includes("❌")
                ? "rgba(220, 53, 69, 0.2)"
                : "rgba(0,0,0,0.25)",
              border: resultado.includes("🔍")
                ? "1px solid rgba(40, 167, 69, 0.4)"
                : resultado.includes("❌")
                ? "1px solid rgba(220, 53, 69, 0.4)"
                : "none",
              whiteSpace: "pre-line",
              lineHeight: "1.5",
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            }}
          >
            {resultado || "El resultado del análisis César aparecerá aquí..."}
          </div>
          <div className={`copy-msg ${copied ? "show" : ""}`}>
            ¡Resultado copiado!
          </div>
        </div>
      </div>
    </div>
  );
}

export default CesarBruteForce;