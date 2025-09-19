import React, { useState } from "react";
import CipherPanel from "./CipherPanel.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";

const ciphers = [
  {
  id: "cesar",
  name: "César",
  description: "Cifrado de sustitución monoalfabética que desplaza las letras un número fijo de posiciones en el alfabeto.",
  type: "Sustitución Monoalfabética"
  },
   // Sustitución Monoalfabética
  {
    id: "sustitucion-simple",
    name: "Sustitución Simple",
    description: "Reemplaza cada carácter del texto claro por otro carácter fijo del alfabeto.",
    type: "Sustitución Monoalfabética"
  },
  {
    id: "atbash",
    name: "Atbash",
    description: "Cada letra se sustituye por su opuesta en el alfabeto (A ↔ Z, B ↔ Y...).",
    type: "Sustitución Monoalfabética"
  },

  // Sustitución Polialfabética
  {
    id: "vigenere",
    name: "Vigenère",
    description: "Cifrado polialfabético que usa una palabra clave para variar los desplazamientos.",
    type: "Sustitución Polialfabética"
  },
  {
    id: "autokey",
    name: "Autokey",
    description: "Extiende la clave con parte del texto claro para crear un cifrado polialfabético dinámico.",
    type: "Sustitución Polialfabética"
  },

  // Sustitución Poligráfica
  {
    id: "playfair",
    name: "Playfair",
    description: "Cifra pares de letras (dígrafos) usando una matriz de 5x5.",
    type: "Sustitución Poligráfica"
  },
  {
    id: "hill",
    name: "Hill",
    description: "Cifra bloques de texto mediante álgebra matricial sobre el alfabeto.",
    type: "Sustitución Poligráfica"
  },

  // Cifrado basado en operaciones lógicas
  {
    id: "xor",
    name: "XOR Simple",
    description: "Aplica la operación lógica XOR con una clave binaria; reversible aplicando XOR nuevamente.",
    type: "Sustitución Basada en Operaciones Lógicas"
  },

  // Transposición Simple
  {
    id: "rail-fence",
    name: "Rail Fence",
    description: "Transposición en forma de zig-zag sobre varias filas (rieles).",
    type: "Transposición Simple"
  },
  {
    id: "permutacion",
    name: "Permutación",
    description: "Reordena los caracteres siguiendo un patrón fijo de posiciones.",
    type: "Transposición Simple"
  },

  // Transposición por Columnas
  {
    id: "transposicion-columnas",
    name: "Transposición de Columnas",
    description: "Organiza el texto en una cuadrícula y lo lee por columnas según una clave.",
    type: "Transposición por Columnas"
  }

  // ...otros cifrados
];

function CipherDashboard() {
  const [selectedCipher, setSelectedCipher] = useState("cesar");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCiphers = ciphers.filter((cipher) =>
    cipher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cipher.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SettingsProvider>
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
    </SettingsProvider>

  );
}

export default CipherDashboard;
