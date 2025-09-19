import React, { useState } from 'react';
import '../styles/sidebar.css';

function Sidebar({ ciphers, selectedCipher, setSelectedCipher }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCipherSelect = (cipherId) => {
    setSelectedCipher(cipherId);
  };

  return (
    <div className='sidebar-container'>
      <button
        className='sidebar-toggle'
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Algoritmos de Cifrado</h2>
          <p>Selecciona un cifrado para comenzar</p>
        </div>

        <div className="cipher-list">
          {ciphers.map((cipher) => {
            const isSelected = selectedCipher === cipher.id;
            return (
              <button
                key={cipher.id}
                className={`cipher-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCipherSelect(cipher.id)}
                aria-pressed={isSelected}
              >
                <div className="cipher-content">
                  <div className="cipher-info">
                    <strong className="cipher-name">{cipher.name}</strong>
                    <small className="cipher-description">
                      {cipher.type}
                    </small>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
