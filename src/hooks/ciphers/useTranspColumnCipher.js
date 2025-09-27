import { useState } from "react";
import {
  cifrarTranspColumn,
  descifrarTranspColumn,
} from "../../ciphers_library/transposicionColumnas.js";
import {
  getAlphabetByType,
  processTextForCipher,
} from "../../utils/textProcessing.js";

export const useTranspColumnCipher = (settings) => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("CLAVE");
  const [output, setOutput] = useState("");

  const { alphabetType, customAlphabet, enableNormalization, preserveCase } =
    settings;

  const processCipher = (type) => {
    if (!text || !key) return;

    const alphabet = getAlphabetByType(alphabetType, customAlphabet);
    const processedText = processTextForCipher(
      text,
      alphabet,
      preserveCase,
      alphabetType,
      enableNormalization
    );

    const result =
      type === "encrypt"
        ? cifrarTranspColumn(processedText, key, alphabet)
        : descifrarTranspColumn(processedText, key, alphabet);

    setOutput(result);
  };

  return {
    text,
    setText,
    key,
    setKey,
    output,
    processCipher,
  };
};
