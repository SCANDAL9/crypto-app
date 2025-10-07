// // src/components/MainContent.jsx
import React from 'react';
import CipherPanel from './CipherPanel.jsx';
import '../styles/mainContent.css';
import '../styles/styles.css';

function MainContent({ selectedCipher }) {
  return (
    <main className="main-content">
        <div className="double-panel">
            <CipherPanel type="encrypt" method={selectedCipher} />
            <CipherPanel type="decrypt" method={selectedCipher} />
        </div>
    </main>
  );
}

export default MainContent;
