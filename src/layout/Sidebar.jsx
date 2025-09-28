import React, { useState } from 'react';
import { ToggleOpenIcon, ToggleCloseIcon } from '../assets/icons.jsx';
import "../styles/sidebar.css";

function Sidebar({ ciphers, selectedCipher, setSelectedCipher }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCipherSelect = (cipherId) => {
    setSelectedCipher(cipherId);
  };

  const handleToggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='sidebar-container'>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Header con toggle */}
        <div className="sidebar-header">
          <div className="toggle-container">
            <button
              className='sidebar-toggle'
              onClick={handleToggleSidebar}
              aria-label={isOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
            >
              {isOpen ? 
                <ToggleOpenIcon width={20} height={20} className="toggle-icon toggle-open"/> :
                <ToggleCloseIcon width={20} height={20} className="toggle-icon toggle-close"/>
              }
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="sidebar-content">
          {isOpen && (
            <>
              <h4 className="section-title">Algoritmos</h4>
              <div className="cipher-list">
                {ciphers.map((cipher) => {
                  const isSelected = selectedCipher === cipher.id;
                  return (
                    <button
                      key={cipher.id}
                      className={`cipher-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCipherSelect(cipher.id)}
                      aria-pressed={isSelected}
                      data-tooltip={cipher.name}
                    >
                      <div className="cipher-content">
                        <span className="cipher-name">{cipher.name}</span>
                        <small className="cipher-type">{cipher.type}</small>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
