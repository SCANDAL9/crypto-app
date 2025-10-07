//src/hooks/useGenericCipher.js
import { useState } from 'react';
import { getAlphabetByType } from '../utils/alphabetUtils';
import { processTextForCipher } from '../utils/textProcessing';

export const useGenericCipher = (cipherFunctions, settings, defaultKey = "") => {
    const [text, setText] = useState("");
    const [key, setKey] = useState(defaultKey);
    const [output, setOutput] = useState("");

    const {
        alphabetType,
        customAlphabet,
        enableNormalization,
        preserveCase
    } = settings;

    const processCipher = (type) => {
        if (!text) return;
        if (cipherFunctions.type === 'caesar' && (!key || isNaN(Number(key)))) return;
        
        if (cipherFunctions.type !== 'caesar' && !key) return;

        const alphabet = getAlphabetByType(alphabetType, customAlphabet);
        const processedText = processTextForCipher(
            text, 
            alphabet, 
            preserveCase, 
            alphabetType, 
            enableNormalization
        );

        const processedKey = cipherFunctions.type === 'caesar'
        ? Number(key)
        : key;
    
        const result = type === "encrypt"
          ? cipherFunctions.encrypt(processedText, processedKey, alphabet)
          : cipherFunctions.decrypt(processedText, processedKey, alphabet);

        setOutput(result);
    };
    
    return {
        text,
        setText,
        key,
        setKey,
        output,
        processCipher
    }; 
    
};