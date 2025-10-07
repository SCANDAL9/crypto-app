// src/ciphers_library/autokey.js
function extendKeyAutokey(plaintext, key, alphabetType) {
  // Filtramos la clave inicial para que solo tenga caracteres válidos
  let extendedKey = "";
  for (const ch of key) {
    if (alphabetType.includes(ch)) extendedKey += ch;
  }

  // Si la clave ya cubre el texto, la cortamos al tamaño del texto
  if (extendedKey.length >= plaintext.length) {
    return extendedKey.slice(0, plaintext.length);
  }

  // Extendemos usando el texto plano hasta alcanzar la longitud del texto
  let idx = 0;
  while (extendedKey.length < plaintext.length && 
    idx < plaintext.length) {
    const ch = plaintext[idx++];
    if (alphabetType.includes(ch)) {
      extendedKey += ch;
    }
  }

  return extendedKey;
}
export function cifrarAutokey(plaintext, key, alphabetType) {
  if (typeof plaintext !== "string") {
    throw new Error("El texto a cifrar debe ser una cadena de caracteres");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("La clave debe ser un string no vacío");
  }

  const extendedKey = extendKeyAutokey(plaintext, key, alphabetType);
  const n = alphabetType.length;
  let result = "";

  for (let i = 0; i < plaintext.length; i++) {
    const p = alphabetType.indexOf(plaintext[i]);
    const k = alphabetType.indexOf(extendedKey[i]);

    result += p !== -1 && k !== -1 ? alphabetType[(p + k) % n] : plaintext[i];
  }

  return result;
}

export function descifrarAutokey(ciphertext, key, alphabetType) {
  if (typeof ciphertext !== "string") {
    throw new Error("El texto cifrado debe ser una cadena de caracteres");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("La clave debe ser un string no vacío");
  }

  let result = "";
  let extendedKey = key;
  const n = alphabetType.length;

  for (let i = 0; i < ciphertext.length; i++) {
    const c = alphabetType.indexOf(ciphertext[i]);
    const k = alphabetType.indexOf(extendedKey[i]);

    const p = c !== -1 && k !== -1 ? (c - k + n) % n : -1;

    const plainChar = p !== -1 ? alphabetType[p] : ciphertext[i];

    result += plainChar;

    // Extendemos la clave con el texto descifrado
    if (
      alphabetType.includes(plainChar) &&
      extendedKey.length < ciphertext.length
    ) {
      extendedKey += plainChar;
    }
  }

  return result;
}
