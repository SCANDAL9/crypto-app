import { useState } from "react";
import { cesarFuerzaBruta } from "../ciphers_library/brute_force/cesarFuerzaBruta.js";

/**
 * Hook personalizado para manejar la lógica del análisis César por fuerza bruta
 * Separa la lógica de negocio de la presentación
 */
export const useCesarAnalysis = () => {
  const [textoCifrado, setTextoCifrado] = useState("");
  const [resultado, setResultado] = useState("");
  const [detallesAnalisis, setDetallesAnalisis] = useState("");
  const [ejecutando, setEjecutando] = useState(false);

  const ejecutarAtaqueFuerzaBruta = async () => {
    if (!textoCifrado.trim()) {
      setResultado("Por favor, ingresa un texto cifrado.");
      setDetallesAnalisis("");
      return;
    }

    setEjecutando(true);
    try {
      // Simular un pequeño delay para mostrar el estado de "ejecutando"
      await new Promise((resolve) => setTimeout(resolve, 300));

      const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
      const resultados = cesarFuerzaBruta(textoCifrado.trim(), alphabet);
      
      // Formatear los resultados
      const resultadoFormateado = formatearResultadoCesar(resultados, textoCifrado);
      const detallesFormateados = formatearDetallesCesar(resultados, alphabet);
      
      setResultado(resultadoFormateado);
      setDetallesAnalisis(detallesFormateados);
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
    ejecutarAtaqueFuerzaBruta,
    limpiarResultados,
  };
};

/**
 * Formatea el resultado principal del análisis César
 */
const formatearResultadoCesar = (resultados, textoCifrado) => {
  if (!resultados || resultados.length === 0) {
    return "❌ No se pudieron generar resultados de descifrado";
  }

  let output = "🔍 ANÁLISIS CÉSAR - FUERZA BRUTA\n";
  output += "=".repeat(50) + "\n\n";
  output += `📜 Texto original: "${textoCifrado}"\n`;
  output += `🔢 Total de variantes generadas: ${resultados.length}\n\n`;
  output += "📋 POSIBLES DESCIFRADOS:\n";
  output += "-".repeat(30) + "\n";

  resultados.forEach((item, index) => {
    const numero = (index + 1).toString().padStart(2, "0");
    output += `${numero}. Desplazamiento ${item.shift.toString().padStart(2, " ")}: "${item.texto}"\n`;
  });

  output += "\n💡 Revisa los resultados y selecciona el que tenga más sentido.";
  
  return output;
};

/**
 * Formatea los detalles técnicos del análisis César
 */
const formatearDetallesCesar = (resultados, alphabet) => {
  if (!resultados || resultados.length === 0) {
    return "No hay detalles disponibles.";
  }

  let detalles = "🔧 DETALLES TÉCNICOS DEL ANÁLISIS\n";
  detalles += "=".repeat(45) + "\n\n";
  detalles += `🔤 Alfabeto utilizado: "${alphabet}"\n`;
  detalles += `📏 Longitud del alfabeto: ${alphabet.length} caracteres\n`;
  detalles += `⚙️ Método: Fuerza bruta exhaustiva\n`;
  detalles += `🔄 Desplazamientos probados: 0 a ${alphabet.length - 1}\n\n`;
  
  detalles += "📊 ANÁLISIS POR DESPLAZAMIENTO:\n";
  detalles += "-".repeat(35) + "\n";

  resultados.forEach((item) => {
    const textoPreview = item.texto.length > 30 ? 
      `${item.texto.substring(0, 27)}...` : 
      item.texto;
    
    detalles += `• Shift ${item.shift.toString().padStart(2, " ")}: "${textoPreview}"\n`;
    detalles += `  └─ Caracteres: ${item.texto.length}\n`;
  });

  detalles += "\n🎯 RECOMENDACIONES:\n";
  detalles += "• Busca palabras con sentido en español\n";
  detalles += "• Verifica la estructura gramatical\n";
  detalles += "• Los espacios y puntuación se mantienen\n";
  detalles += "• El desplazamiento 0 devuelve el texto original";

  return detalles;
};