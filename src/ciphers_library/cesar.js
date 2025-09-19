
export function cifrarCesar(plaintext, shift, options = {}) {
  if (typeof plaintext !== 'string') {
    throw new Error('El texto a cifrar debe ser una cadena de caracteres');
  }
  const alphabet = (options.alphabet || "ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
  const n = alphabet.length;
  const map = new Map(alphabet.map((c,i)=>[c,i]));
  const normalize = options.normalize === 'uppercase' 
      ? s => s.toUpperCase() 
      : options.normalize ==='lowercase'
        ? s => s.toLowerCase()
        : s => s;

  const text = normalize(plaintext);
  let result = "";

  const preserveCase = options.preserveCase ?? true; // mantener no-alfabeto
  try {
    for (const ch of text) {
      if (!map.has(ch)) {
        if (preserveCase) {
          result += ch;
        }
        continue;
      }
      const i = map.get(ch);
      const j = ((i + shift) % n + n) % n;
      result += alphabet[j];
    }
  } catch (error) {
    throw new Error(`Error durante el cifrado: ${error.message}`);
  }
  return result;
}


//para ser llamado desde otras carpetas
export function descifrarCesar(ciphertext, shift, options = {}) {
  if (typeof ciphertext !== 'string') {
    throw new Error('El texto cifrado debe ser una cadena de caracteres');
  }
  
  try {
    return cifrarCesar(ciphertext, -shift, options);
  } catch (error) {
    throw new Error(`Error durante el descifrado: ${error.message}`);
  }
}

