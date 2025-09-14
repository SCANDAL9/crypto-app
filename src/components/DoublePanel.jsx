import React from 'react';
import CipherPanel from './CipherPanel.jsx';

function DoublePanel() {
    return (
        <div className="double-panel">
            <CipherPanel type="encrypt" />
            <CipherPanel type="decrypt" />
        </div>
    );
}

export default DoublePanel;