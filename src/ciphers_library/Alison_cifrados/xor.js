function xorStrings(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const t = text.charCodeAt(i);
    const k = key.charCodeAt(i % key.length);
    const c = t ^ k; // XOR
    result += String.fromCharCode(c);
  }
  return result;
}

export function cifrarXOR(plaintext, key) {
  if (typeof plaintext !== "string" || typeof key !== "string" || key.length === 0)
    throw new Error("Texto y clave deben ser cadenas válidas");

  // Cifrar (el resultado puede tener caracteres no imprimibles)
  const xorResult = xorStrings(plaintext, key);

  // Para visualizar mejor: convertir a Base64
  return btoa(xorResult);
}

export function descifrarXOR(ciphertext, key) {
  if (typeof ciphertext !== "string" || typeof key !== "string" || key.length === 0)
    throw new Error("Texto y clave deben ser cadenas válidas");

  // Decodificar Base64
  const decoded = atob(ciphertext);
  const xorResult = xorStrings(decoded, key);

  return xorResult;
}