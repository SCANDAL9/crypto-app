import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [alphabetType, setAlphabetType] = useState('mayusculas');
    const [customAlphabet, setCustomAlphabet] = useState('');
    const [enableNormalization, setEnableNormalization] = useState(false);
    const [preserveCase, setPreserveCase] = useState(true);

    return (
        <SettingsContext.Provider value={{ 
            alphabetType, 
            setAlphabetType, 
            customAlphabet, 
            setCustomAlphabet,
            enableNormalization,
            setEnableNormalization,
            preserveCase,
            setPreserveCase 
            }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}