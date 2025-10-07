// src/components/CipherDasboard.jsx 
import React, { useState, useEffect } from "react";
import Header from "../layout/Header.jsx";
import Sidebar from "../layout/Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import { SettingsProvider } from "../settings/SettingsContext.jsx";

import ciphers from "../utils/ciphersData.js";

function CipherDashboard() {
  const [selectedCipher, setSelectedCipher] = useState("cesar");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCipher, setCurrentCipher] = useState("Cifrado César");

  const filteredCiphers = ciphers.filter((cipher) =>
      cipher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cipher.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const cipherObj = ciphers.find((c) => c.id === selectedCipher);
    if (cipherObj) {
      setCurrentCipher(cipherObj.displayName || cipherObj.name);
    }
  }, [selectedCipher]);

  return (
    <SettingsProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          ciphers={filteredCiphers}
          selectedCipher={selectedCipher}
          setSelectedCipher={setSelectedCipher}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            currentCipher={currentCipher}
          />
          <MainContent selectedCipher={selectedCipher} />
        </div>
      </div>
    </SettingsProvider>
  );
}

export default CipherDashboard;
