import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [alphabetType, setAlphabetType] = useState('mayusculas');
    const [customAlphabet, setCustomAlphabet] = useState('');

    return (
        <SettingsContext.Provider value={{ alphabetType, setAlphabetType, customAlphabet, setCustomAlphabet }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}