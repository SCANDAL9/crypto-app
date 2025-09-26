import React, {useState} from 'react';
import SettingsMain from '../components/SettingsMain';
import '../styles/header.css';
import '../styles/settings.css';

function Header({ searchTerm, setSearchTerm }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">🔒 CryptoLab</div>
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
        <button className="settings-btn"
          onClick={() => setShowSettings(true)}>⚙️
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
