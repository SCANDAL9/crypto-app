/**
 * Convierte caracteres especiales a su forma base (é→e, ç→c, etc.)
 * Nota: La ñ/Ñ se mantiene como ñ/Ñ ya que es parte del alfabeto español
 */
export const normalizeChars = (text, enableNormalization) => {
  if (!enableNormalization) return text;

  // Normalizar caracteres con acentos usando expresiones regulares
  return text
    // Variantes de A (minúscula)
    .replace(/[áàäâāăąǎǟǡǣǻ]/g, 'a')
    // Variantes de A (mayúscula)
    .replace(/[ÁÀÄÂĀĂĄǍǞǠǢǺ]/g, 'A')
    
    // Variantes de E (minúscula)
    .replace(/[éèëêēěęėĕȅȇȩ]/g, 'e')
    // Variantes de E (mayúscula)
    .replace(/[ÉÈËÊĒĚĘĖĔȄȆȨ]/g, 'E')
    
    // Variantes de I (minúscula)
    .replace(/[íìïîīįĩĭȉȋ]/g, 'i')
    // Variantes de I (mayúscula)
    .replace(/[ÍÌÏÎĪĮĨĬȈȊ]/g, 'I')
    
    // Variantes de O (minúscula)
    .replace(/[óòöôōőõŏøǒǫǭȍȏȫȭȯȱ]/g, 'o')
    // Variantes de O (mayúscula)
    .replace(/[ÓÒÖÔŌŐÕŎØǑǪǬȌȎȪȬȮȰ]/g, 'O')
    
    // Variantes de U (minúscula)
    .replace(/[úùüûūůűũŭųǔǖǘǚǜȕȗ]/g, 'u')
    // Variantes de U (mayúscula)
    .replace(/[ÚÙÜÛŪŮŰŨŬŲǓǕǗǙǛȔȖ]/g, 'U')
    
    // Variantes de C (minúscula)
    .replace(/[çćčĉċ]/g, 'c')
    // Variantes de C (mayúscula)
    .replace(/[ÇĆČĈĊ]/g, 'C')
    
    // Variantes de S (minúscula)
    .replace(/[śšşŝș]/g, 's')
    // Variantes de S (mayúscula)
    .replace(/[ŚŠŞŜȘ]/g, 'S')
    
    // Variantes de Z (minúscula)
    .replace(/[źžżẑ]/g, 'z')
    // Variantes de Z (mayúscula)
    .replace(/[ŹŽŻẐ]/g, 'Z')
    
    // Variantes de Y (minúscula)
    .replace(/[ýÿŷȳ]/g, 'y')
    // Variantes de Y (mayúscula)
    .replace(/[ÝŸŶȲ]/g, 'Y')
    
    // Otras consonantes especiales (minúscula)
    .replace(/[łľĺļ]/g, 'l')
    .replace(/[řŕŗ]/g, 'r')
    .replace(/[ńň]/g, 'n')  // Solo otras variantes de n, NO ñ
    .replace(/[ğĝġģ]/g, 'g')
    .replace(/[ďđ]/g, 'd')
    .replace(/[ťţ]/g, 't')
    
    // Otras consonantes especiales (mayúscula)
    .replace(/[ŁĽĹĻ]/g, 'L')
    .replace(/[ŘŔŖ]/g, 'R')
    .replace(/[ŃŇ]/g, 'N')  // Solo otras variantes de N, NO Ñ
    .replace(/[ĞĜĠĢ]/g, 'G')
    .replace(/[ĎĐ]/g, 'D')
    .replace(/[ŤŢ]/g, 'T');
};

/**
 * Ajusta el caso del texto según el alfabeto utilizado
 * - Alfabeto en mayúsculas → convierte texto a mayúsculas
 * - Alfabeto en minúsculas → convierte texto a minúsculas  
 * - Alfabeto mixto → mantiene caso original del texto
 */
export const normalizeCase = (text, alphabet) => {
  if (!alphabet || alphabet.length === 0) return text;
  
  // Detectar tipo de alfabeto
  const hasUpperCase = /[A-ZÑ]/.test(alphabet);
  const hasLowerCase = /[a-zñ]/.test(alphabet);
  
  if (hasUpperCase && !hasLowerCase) {
    // Solo mayúsculas: convertir texto a mayúsculas
    return text.toUpperCase();
  } else if (hasLowerCase && !hasUpperCase) {
    // Solo minúsculas: convertir texto a minúsculas
    return text.toLowerCase();
  } else {
    // Alfabeto mixto: mantener caso original
    return text;
  }
};

/**
 * Controla qué caracteres se mantienen en el texto procesado
 * - preserveNonAlpha=true: mantiene puntuación, espacios, números
 * - preserveNonAlpha=false: solo caracteres del alfabeto
 */
export const preserveNonAlpha = (text, alphabet, preserveNonAlphabetic = false) => {
  if (preserveNonAlphabetic) {
    // Mantener letras del alfabeto + caracteres especiales (puntuación, espacios, números, símbolos)
    const specialChars = /[.,;:!?¡¿'"()\-\s\d@#$%&*+=<>{}[\]|\\~`^_]/;
    return text
      .split("")
      .filter((char) => alphabet.includes(char) || specialChars.test(char))
      .join("");
  } else {
    // Solo mantener caracteres del alfabeto
    return text
      .split("")
      .filter((char) => alphabet.includes(char))
      .join("");
  }
};

/**
 * Procesa el texto para cifrados con tu lógica original + soporte para acentos
 */
export function processTextForCipher(
  text,
  alphabet,
  preserveCase,
  alphabetType,
  enableNormalization
) {
  // Primero normalizamos el texto si está habilitado
  let processedText = normalizeText(text, alphabetType, enableNormalization);
  
  // Luego filtramos por alfabeto si no preservamos el case
  if (!preserveCase) {
    processedText = filterByAlphabet(processedText, alphabet);
  }
  
  return processedText;
}

export const normalizeText = (text, alphabetType, enableNormalization) => {
  if (!enableNormalization) return text;

  // Primero eliminar acentos
  let normalizedText = normalizeChars(text, true);

  const normalizers = {
    mayusculas: (text) => text.toUpperCase(),
    minusculas: (text) => text.toLowerCase(),
  };

  return normalizers[alphabetType] ? normalizers[alphabetType](normalizedText) : normalizedText;
};

export const filterByAlphabet = (text, alphabet) => {
  return text
    .split("")
    .filter((char) => alphabet.includes(char))
    .join("");
};

// Alias para mantener compatibilidad temporal
export const normalizeAccents = normalizeChars;
