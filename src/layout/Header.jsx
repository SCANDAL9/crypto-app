import React, { useState } from "react";
import SettingsMain from "../settings/SettingsMain";
import { SettingsIcon } from '../assets/icons.jsx';
import "../styles/header.css";
import "../styles/settings.css";

function Header({ searchTerm, setSearchTerm, currentCipher }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          🔒 CryptoLab {currentCipher ? `- ${currentCipher}` : ""}
        </div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar cifrados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
            <div className="tool-icon"><SettingsIcon width={20} height={20}/></div>
        </button>
      </div>

      {showSettings && (
        <div className="settings-modal show">
          <SettingsMain onClose={() => setShowSettings(false)} />
        </div>
      )}
    </header>
  );
}

export default Header;
