import React from 'react';
import '../styles/header.css';

function Header({ searchTerm, setSearchTerm }) {
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
        <button className="settings-btn">⚙️</button>
      </div>
    </header>
  );
}

export default Header;
