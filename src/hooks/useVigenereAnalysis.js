import { useState } from "react";
import { vigenereFuerzaBruta } from "../ciphers_library/brute_force/vigenereFuerzaBruta.js";
import { formatearResultado } from "../utils/resultFormatter.js";

/**
 * Hook personalizado para manejar la lógica del análisis Vigenère
 * Separa la lógica de negocio de la presentación
 */
export const useVigenereAnalysis = () => {
  const [textoCifrado, setTextoCifrado] = useState("");
  const [resultado, setResultado] = useState("");
  const [detallesAnalisis, setDetallesAnalisis] = useState("");
  const [ejecutando, setEjecutando] = useState(false);

  const ejecutarAtaqueKasiski = async () => {
    if (!textoCifrado.trim()) {
      setResultado("Por favor, ingresa un texto cifrado.");
      setDetallesAnalisis("");
      return;
    }

    setEjecutando(true);
    try {
      // Simular un pequeño delay para mostrar el estado de "ejecutando"
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = vigenereFuerzaBruta(
        textoCifrado,
        "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
      );

      const { resultadoPrincipal, detalles } = formatearResultado(
        result,
        textoCifrado
      );
      setResultado(resultadoPrincipal);
      setDetallesAnalisis(detalles);
    } catch (error) {
      setResultado(`❌ Error: ${error.message}`);
      setDetallesAnalisis("");
    } finally {
      setEjecutando(false);
    }
  };

  const limpiarResultados = () => {
    setResultado("");
    setDetallesAnalisis("");
  };

  return {
    // Estado
    textoCifrado,
    resultado,
    detallesAnalisis,
    ejecutando,

    // Acciones
    setTextoCifrado,
    ejecutarAtaqueKasiski,
    limpiarResultados,
  };
};
