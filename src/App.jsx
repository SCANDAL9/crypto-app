import React from 'react';
import { useEffect } from 'react';
import DoublePanel from './components/DoublePanel.jsx';

function App() {
  useEffect(() => {
    document.title = 'Interfaz de Cifrado Modular';
  }, []);

  return (
    <div>
      <h1> Cifrado Modular</h1>
      <DoublePanel />
    </div>
  );
}

export default App;
