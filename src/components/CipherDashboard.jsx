import React, { useState } from "react";
import CipherPanel from "./CipherPanel.jsx";
import Header from "../layout/Header.jsx";
import Sidebar from "../layout/Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import { SettingsProvider } from "../context/SettingsContext.jsx";

import ciphers from "../utils/ciphersData.js";

function CipherDashboard() {
  const [selectedCipher, setSelectedCipher] = useState("cesar");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCiphers = ciphers.filter((cipher) =>
    cipher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cipher.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SettingsProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          ciphers={filteredCiphers}
          selectedCipher={selectedCipher}
          setSelectedCipher={setSelectedCipher}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <MainContent selectedCipher={selectedCipher} />
        </div>
      </div>
    </SettingsProvider>

  );
}

export default CipherDashboard;
