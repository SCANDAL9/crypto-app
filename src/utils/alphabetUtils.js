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

  let selectedAlphabet = alphabets[alphabetType] || alphabets.mayusminus;

  // Para alfabeto personalizado, asegurar que no haya caracteres duplicados
  if (alphabetType === "personalizado" && customAlphabet) {
    selectedAlphabet = [...new Set(customAlphabet.split(''))].join('');
    
    // Validar que tenga al menos 2 caracteres
    if (selectedAlphabet.length < 2) {
      console.warn("Alfabeto personalizado inválido");
      selectedAlphabet = alphabets.mayusminus;
    }
  }

  return selectedAlphabet;
};