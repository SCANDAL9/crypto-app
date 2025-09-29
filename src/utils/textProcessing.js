export const normalizeText = (text, alphabetType, enableNormalization) => {
  if (!enableNormalization) return text;

  const normalizers = {
    mayusculas: (text) => text.toUpperCase(),
    minusculas: (text) => text.toLowerCase(),
  };

  return normalizers[alphabetType] ? normalizers[alphabetType](text) : text;
};

export const filterByAlphabet = (text, alphabet) => {
  return text
    .split("")
    .filter((char) => alphabet.includes(char))
    .join("");
};

export const processTextForCipher = (
  text,
  alphabet,
  preserveCase,
  alphabetType,
  enableNormalization
) => {
  // Primero normalizamos el texto si está habilitado
  let processedText = normalizeText(text, alphabetType, enableNormalization);
  
  // Luego filtramos por alfabeto si no preservamos el case
  if (!preserveCase) {
    processedText = filterByAlphabet(processedText, alphabet);
  }
  
  return processedText;
};
