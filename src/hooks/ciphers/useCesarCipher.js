import { useState } from 'react';
import { cifrarCesar, descifrarCesar } from '../../ciphers_library/cesar.js';
import { getAlphabetByType } from '../../utils/alphabetUtils.js';
import { processTextForCipher } from '../../utils/textProcessing.js';

export const useCesarCipher = (settings) => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  const {
    alphabetType,
    customAlphabet,
    enableNormalization,
    preserveCase
  } = settings;

  const processCipher = (type) => {
    if (!text) return;

    const alphabet = getAlphabetByType(alphabetType, customAlphabet);
    const processedText = processTextForCipher(
      text, 
      alphabet, 
      preserveCase, 
      alphabetType, 
      enableNormalization
    );

    const result = type === "encrypt"
      ? cifrarCesar(processedText, shift, alphabet)
      : descifrarCesar(processedText, shift, alphabet);
    
    setOutput(result);
  };

  return {
    text,
    setText,
    shift,
    setShift,
    output,
    processCipher
  };
};