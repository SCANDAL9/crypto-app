import React from 'react';
import { useEffect } from 'react';
import CipherDashboard from './components/CipherDashboard.jsx';

function App() {
  useEffect(() => {
    document.title = 'Interfaz de Cifrado Modular';
  }, []);

  return (
    <div>
      <CipherDashboard />
    </div>
  );
}

export default App;
