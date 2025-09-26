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