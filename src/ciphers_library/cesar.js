export function cifrarCesar(plaintext, shift, alphabetType) {
  // Valida que el texto a cifrar sea una cadena; si no, lanza un error
  if (typeof plaintext !== "string") {
    throw new Error("El texto a cifrar debe ser una cadena de caracteres");
  }

  // Convierte el parámetro alphabetType en un array de caracteres:
  // - si ya es un array, se usa tal cual
  // - si es un string, se divide en caracteres individuales
  const alphabet = Array.isArray(alphabetType)
    ? alphabetType
    : alphabetType.split("");

  const n = alphabet.length;

  // Crea un mapa donde la clave es el carácter y el valor su índice 
  // en el alfabeto
  const map = new Map(alphabet.map((c, i) => [c, i]));
  let result = "";

  try {
    // Itera cada carácter del texto original
    for (const ch of plaintext) {
      // Si el carácter no está en el alfabeto, lo agregamos tal cual al resultado
      // Esto permite preservar espacios, números o símbolos según necesidad      
      if (!map.has(ch)) {
        result += ch;
        continue; // pasa al siguiente carácter
      }
      // Obtiene el índice original del carácter dentro del alfabeto
      const i = map.get(ch);
      // Aplica el desplazamiento del cifrado César:
      const j = (((i + shift) % n) + n) % n;
      result += alphabet[j];
    }
  } catch (error) {
    throw new Error(`Error durante el cifrado: ${error.message}`);
  }
  return result;
}

//para ser llamado desde otras carpetas
export function descifrarCesar(ciphertext, shift, alphabetType) {
  if (typeof ciphertext !== "string") {
    throw new Error("El texto cifrado debe ser una cadena de caracteres");
  }

  try {
    return cifrarCesar(ciphertext, -shift, alphabetType);
  } catch (error) {
    throw new Error(`Error durante el descifrado: ${error.message}`);
  }
}
