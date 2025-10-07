import { descifrarCesar } from "../cesar.js";

// Genera todas las posibles variantes de descifrado
export function cesarFuerzaBruta(ciphertext, alphabetType) {
  // Validación básica: el texto debe ser string
  if (typeof ciphertext !== "string") {
    throw new Error("El texto cifrado debe ser una cadena de caracteres");
  }

  const alphabet = Array.isArray(alphabetType)
    ? alphabetType
    : alphabetType.split("");

  const n = alphabet.length;
  const resultados = [];

  try {
    // Probar todos los posibles desplazamientos [0, n-1]
    for (let shift = 0; shift < n; shift++) {
      const intento = descifrarCesar(ciphertext, shift, alphabet);
      resultados.push({
        shift,
        texto: intento
      });
    }
  } catch (error) {
    throw new Error(`Error durante la fuerza bruta: ${error.message}`);
  }

  return resultados;
}