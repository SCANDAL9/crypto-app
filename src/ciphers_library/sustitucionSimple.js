// src/ciphers_library/sustitucionSimple.js
/**
 * =============================================
 * 🔐 Cifrado de Sustitución Simple (compatible con tu configuración)
 * - Usa el alfabeto activo (string o array) exactamente como llega.
 * - Si el alfabeto contiene A..Z y a..z, aplica la permutación a mayúsculas
 *   y la refleja a minúsculas (misma correspondencia).
 * - Si no, permuta el alfabeto completo tal cual (modo genérico).
 * - Caracteres fuera del alfabeto se preservan.
 * =============================================
 */

// Convierte alphabetType a array y valida unicidad
function normalizeAlphabet(alphabetType) {
  const alphabet = Array.isArray(alphabetType)
    ? alphabetType.slice()
    : String(alphabetType || '').split('');
  if (alphabet.length < 2) {
    throw new Error('El alfabeto debe tener al menos 2 caracteres');
  }
  const set = new Set(alphabet);
  if (set.size !== alphabet.length) {
    throw new Error('El alfabeto no debe contener caracteres duplicados');
  }
  return alphabet;
}

// Extrae grupos (A..Z y a..z) y sus índices en el alfabeto
function extractCaseGroups(alphabet) {
  const upperIdx = [];
  const lowerIdx = [];
  const upperSeq = [];
  const lowerSeq = [];

  const has = new Set(alphabet);

  alphabet.forEach((ch, i) => {
    const up = ch.toUpperCase();
    const low = ch.toLowerCase();
    const isLetter = up !== low; // general para letras latinas (incluye Ñ/ñ)
    if (!isLetter) return;

    if (ch === up && has.has(low)) {
      upperIdx.push(i);
      upperSeq.push(ch);
    } else if (ch === low && has.has(up)) {
      lowerIdx.push(i);
      lowerSeq.push(ch);
    }
  });

  return { upperIdx, lowerIdx, upperSeq, lowerSeq };
}

// Construye el alfabeto permutado respetando caso si aplica
function buildPermutedAlphabet(keyword, alphabet) {
  const perm = alphabet.slice();

  const { upperIdx, lowerIdx, upperSeq, lowerSeq } = extractCaseGroups(alphabet);
  const hasBothCases =
    upperSeq.length > 0 &&
    lowerSeq.length > 0 &&
    upperSeq.length === lowerSeq.length;

  if (hasBothCases) {
    // --- Permutamos MAYÚSCULAS con la keyword (normalizada a mayúsculas) ---
    const kwUpperUnique = [];
    const seen = new Set();
    for (const k of String(keyword || '')) {
      const Ku = k.toUpperCase();
      if (upperSeq.includes(Ku) && !seen.has(Ku)) {
        seen.add(Ku);
        kwUpperUnique.push(Ku);
      }
    }
    const remainingUpper = upperSeq.filter(ch => !seen.has(ch));
    const permUpper = kwUpperUnique.concat(remainingUpper);      // p.ej. CLAVEB...

    // --- Reflejamos la misma permutación en minúsculas ---
    const permLower = permUpper.map(ch => ch.toLowerCase());

    // --- Escribimos en las posiciones reales del alfabeto ---
    for (let i = 0; i < upperIdx.length; i++) {
      perm[upperIdx[i]] = permUpper[i];
    }
    for (let i = 0; i < lowerIdx.length; i++) {
      perm[lowerIdx[i]] = permLower[i];
    }
    // Los demás (números, símbolos, etc.) quedan en su lugar
  } else {
    // --- Modo genérico: permuta TODO el alfabeto tal cual llega ---
    const seen = new Set();
    const prefix = [];
    for (const k of String(keyword || '')) {
      if (!seen.has(k) && alphabet.includes(k)) {
        seen.add(k);
        prefix.push(k);
      }
    }
    const suffix = alphabet.filter(ch => !seen.has(ch));
    const seq = prefix.concat(suffix);
    for (let i = 0; i < alphabet.length; i++) perm[i] = seq[i];
  }

  return perm.join('');
}

/**
 * Cifra sustitución simple.
 * @param {string} plaintext
 * @param {string} keyword
 * @param {string|string[]} alphabetType
 */
export function cifrarSustitucionSimple(plaintext, keyword, alphabetType) {
  if (typeof plaintext !== 'string') {
    throw new Error('El texto a cifrar debe ser una cadena de caracteres');
  }
  const alphabet = normalizeAlphabet(alphabetType);
  const permutado = buildPermutedAlphabet(keyword, alphabet);

  const encMap = new Map(alphabet.map((ch, i) => [ch, permutado[i]]));
  let result = '';
  for (const ch of plaintext) {
    result += encMap.has(ch) ? encMap.get(ch) : ch;
  }
  return result;
}

/**
 * Descifra sustitución simple.
 * @param {string} ciphertext
 * @param {string} keyword
 * @param {string|string[]} alphabetType
 */
export function descifrarSustitucionSimple(ciphertext, keyword, alphabetType) {
  if (typeof ciphertext !== 'string') {
    throw new Error('El texto cifrado debe ser una cadena de caracteres');
  }
  const alphabet = normalizeAlphabet(alphabetType);
  const permutado = buildPermutedAlphabet(keyword, alphabet);

  const decMap = new Map(permutado.split('').map((ch, i) => [ch, alphabet[i]]));
  let result = '';
  for (const ch of ciphertext) {
    result += decMap.has(ch) ? decMap.get(ch) : ch;
  }
  return result;
}


