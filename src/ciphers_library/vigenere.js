// Extiende la clave para que coincida con la longitud del texto
function extendKeyVigenere(plaintext, key, alphabetType) {
  let extendedKey = "";
  let keyIndex = 0;

  for (let i = 0; i < plaintext.length; i++) {
    const ch = plaintext[i];

    // Si el carácter está en el alfabeto, usamos la clave
    if (alphabetType.includes(ch)) {
      // Repetimos la clave circularmente
      extendedKey += key[keyIndex % key.length];
      keyIndex++;
    } else {
      // Para caracteres que no están en el alfabeto, no avanzamos la clave
      extendedKey += ch;
    }
  }

  return extendedKey;
}

export function cifrarVigenere(plaintext, key, alphabetType) {
  if (typeof plaintext !== "string") {
    throw new Error("El texto a cifrar debe ser una cadena de caracteres");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("La clave debe ser un string no vacío");
  }

  // Filtramos la clave para que solo tenga caracteres válidos
  let cleanKey = "";
  for (const ch of key) {
    if (alphabetType.includes(ch)) {
      cleanKey += ch;
    }
  }

  if (cleanKey.length === 0) {
    throw new Error(
      "La clave debe contener al menos un carácter válido del alfabeto"
    );
  }

  const extendedKey = extendKeyVigenere(plaintext, cleanKey, alphabetType);
  const n = alphabetType.length;
  let result = "";

  for (let i = 0; i < plaintext.length; i++) {
    const ch = plaintext[i];
    const keyChar = extendedKey[i];

    // Si el carácter no está en el alfabeto, lo dejamos igual
    if (!alphabetType.includes(ch)) {
      result += ch;
      continue;
    }

    const pIndex = alphabetType.indexOf(ch);
    const kIndex = alphabetType.indexOf(keyChar);

    // Aplicamos la fórmula de Vigenère: (P + K) mod n
    const cIndex = (pIndex + kIndex) % n;
    result += alphabetType[cIndex];
  }

  return result;
}

export function descifrarVigenere(ciphertext, key, alphabetType) {
  if (typeof ciphertext !== "string") {
    throw new Error("El texto cifrado debe ser una cadena de caracteres");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("La clave debe ser un string no vacío");
  }

  // Filtramos la clave para que solo tenga caracteres válidos
  let cleanKey = "";
  for (const ch of key) {
    if (alphabetType.includes(ch)) {
      cleanKey += ch;
    }
  }

  if (cleanKey.length === 0) {
    throw new Error(
      "La clave debe contener al menos un carácter válido del alfabeto"
    );
  }

  const extendedKey = extendKeyVigenere(ciphertext, cleanKey, alphabetType);
  const n = alphabetType.length;
  let result = "";

  for (let i = 0; i < ciphertext.length; i++) {
    const ch = ciphertext[i];
    const keyChar = extendedKey[i];

    // Si el carácter no está en el alfabeto, lo dejamos igual
    if (!alphabetType.includes(ch)) {
      result += ch;
      continue;
    }

    const cIndex = alphabetType.indexOf(ch);
    const kIndex = alphabetType.indexOf(keyChar);

    // Aplicamos la fórmula de descifrado: (C - K + n) mod n
    const pIndex = (cIndex - kIndex + n) % n;
    result += alphabetType[pIndex];
  }

  return result;
}
