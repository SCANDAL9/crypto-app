export const normalizeText = (text, alphabetType, enableNormalization) => {
  if (!enableNormalization) return text;

  const normalizers = {
    mayusculas: (text) => text.toUpperCase(),
    minusculas: (text) => text.toLowerCase()
  };

  return normalizers[alphabetType] ? normalizers[alphabetType](text) : text;
};

export const filterByAlphabet = (text, alphabet) => {
  return text
    .split("")
    .filter(char => alphabet.includes(char))
    .join("");
};

export const processTextForCipher = (text, alphabet, preserveCase, alphabetType, enableNormalization) => {
  let processedText = preserveCase ? text : filterByAlphabet(text, alphabet);
  return normalizeText(processedText, alphabetType, enableNormalization);
};

export const getAlphabetByType = (alphabetType, customAlphabet) => {
  const alphabets = {
    mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    minusculas: "abcdefghijklmnopqrstuvwxyz",
    mayusminus: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    simbolos: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
    alfanumerico: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    numeros: "0123456789",
    personalizado: customAlphabet
  };

  return alphabets[alphabetType] || alphabets.mayusculas;
};