import React, { useState } from "react";
import CipherPanel from "./CipherPanel.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";

const ciphers = [
  { id: "cesar", name: "César", description: "Cifrado por desplazamiento" },
  { id: "vigenere", name: "Vigenère", description: "Cifrado polialfabético" },
  // ...otros cifrados
];

function CipherDashboard() {
  const [selectedCipher, setSelectedCipher] = useState("cesar");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCiphers = ciphers.filter((cipher) =>
    cipher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cipher.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
}

export default CipherDashboard;
