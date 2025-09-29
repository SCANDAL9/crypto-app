import { useState } from "react";
import { cifrarAutokey, descifrarAutokey } from "../../ciphers_library/autokey.js";
import { getAlphabetByType } from "../../utils/alphabetUtils.js";
import { processTextForCipher } from "../../utils/textProcessing.js";

export const useAutokeyCipher = (settings) => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("KEY");
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
        ? cifrarAutokey(processedText, key, alphabet)
        : descifrarAutokey(processedText, key, alphabet);

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
