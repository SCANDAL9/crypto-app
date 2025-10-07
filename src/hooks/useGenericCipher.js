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
        
        // Para cifrados que usan números (Caesar y RailFence)
        if ((cipherFunctions.type === 'caesar' || cipherFunctions.type === 'railfence') && 
            (!key || isNaN(Number(key)))) return;
        
        // Para cifrados que usan claves de texto (no Caesar ni RailFence)
        if (cipherFunctions.type !== 'caesar' && 
            cipherFunctions.type !== 'railfence' && 
            !key) return;

        const alphabet = getAlphabetByType(alphabetType, customAlphabet);
        const processedText = processTextForCipher(
            text, 
            alphabet, 
            preserveCase, 
            alphabetType, 
            enableNormalization
        );

        const processedKey = (cipherFunctions.type === 'caesar' || cipherFunctions.type === 'railfence')
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