/**
 * =============================================
 * 🔐 Cifrado Vigenère – CryptoLab
 * Implementación robusta con validaciones,
 * normalización y soporte de alfabetos personalizados.
 * =============================================
 */

// ✅ Validar que el alfabeto sea válido
function validateAlphabet(alphabet) {
  if (typeof alphabet !== "string")
    throw new Error("alphabet debe ser un string (ej: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')");
  if (alphabet.length < 2)
    throw new Error("alphabet debe tener al menos 2 caracteres");
  const set = new Set([...alphabet]);
  if (set.size !== alphabet.length)
    throw new Error("alphabet no debe contener caracteres duplicados");
  return true;
}

// ✅ Validar parámetros tipo string
function validateStringParam(param, name = "param") {
  if (typeof param !== "string")
    throw new Error(`${name} debe ser un string`);
}

// ✅ Normaliza texto según el alfabeto
// Convierte a mayúsculas o minúsculas según el alfabeto dado
function normalizeAndFilter(text, alphabet) {
  const isUpper = alphabet === alphabet.toUpperCase();
  const normalized = isUpper ? text.toUpperCase() : text.toLowerCase();
  const allowed = new Set([...alphabet]);
  return [...normalized].filter(ch => allowed.has(ch)).join("");
}

// ✅ Extiende la clave hasta el tamaño del texto
function extendKey(text, key, alphabet) {
  validateStringParam(key, "key");
  if (key.length === 0)
    throw new Error("La clave no puede estar vacía");

  let extended = "";
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    extended += key[keyIndex % key.length];
    keyIndex++;
  }
  return extended;
}

/**
 * 🔒 Cifrar con Vigenère
 * @param {string} plaintext - texto claro
 * @param {string} key - clave de cifrado
 * @param {string} alphabet - alfabeto a usar
 * @returns {string} texto cifrado
 */
export function cifrarVigenere(plaintext, key, alphabet) {
  validateStringParam(plaintext, "plaintext");
  validateStringParam(key, "key");
  validateAlphabet(alphabet);

  const cleanText = normalizeAndFilter(plaintext, alphabet);
  const cleanKey = normalizeAndFilter(key, alphabet);
  const extendedKey = extendKey(cleanText, cleanKey, alphabet);

  const n = alphabet.length;
  let result = "";

  for (let i = 0; i < cleanText.length; i++) {
    const p = alphabet.indexOf(cleanText[i]);
    const k = alphabet.indexOf(extendedKey[i]);
    if (p === -1 || k === -1) {
      result += cleanText[i];
    } else {
      result += alphabet[(p + k) % n];
    }
  }

  return result;
}

/**
 * 🔓 Descifrar con Vigenère
 * @param {string} ciphertext - texto cifrado
 * @param {string} key - clave usada
 * @param {string} alphabet - alfabeto a usar
 * @returns {string} texto descifrado
 */
export function descifrarVigenere(ciphertext, key, alphabet) {
  validateStringParam(ciphertext, "ciphertext");
  validateStringParam(key, "key");
  validateAlphabet(alphabet);

  const cleanText = normalizeAndFilter(ciphertext, alphabet);
  const cleanKey = normalizeAndFilter(key, alphabet);
  const extendedKey = extendKey(cleanText, cleanKey, alphabet);

  const n = alphabet.length;
  let result = "";

  for (let i = 0; i < cleanText.length; i++) {
    const c = alphabet.indexOf(cleanText[i]);
    const k = alphabet.indexOf(extendedKey[i]);
    if (c === -1 || k === -1) {
      result += cleanText[i];
    } else {
      result += alphabet[(c - k + n) % n];
    }
  }

  return result;
}

