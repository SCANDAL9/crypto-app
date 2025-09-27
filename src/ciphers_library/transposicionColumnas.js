// Genera el orden de las columnas a partir de la clave
function getColumnOrder(key) {
  const keyArray = key.split("").map((char, index) => ({ char, index }));

  keyArray.sort((a, b) => {
    if (a.char === b.char) return a.index - b.index; // mantiene orden estable en caso de repetidos
    return a.char.localeCompare(b.char);
  });

  return keyArray.map((obj) => obj.index);
}

export function cifrarTranspColumn(plaintext, key, alphabetType) {
  if (typeof plaintext !== "string") {
    throw new Error("El texto a cifrar debe ser una cadena de caracteres");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("La clave debe ser un string no vacío");
  }

  const nCols = key.length;
  const order = getColumnOrder(key);

  // Rellenamos con "X" si el texto no llena toda la matriz
  const nRows = Math.ceil(plaintext.length / nCols);
  const matrix = [];

  let idx = 0;
  for (let r = 0; r < nRows; r++) {
    const row = [];
    for (let c = 0; c < nCols; c++) {
      if (idx < plaintext.length) {
        const ch = plaintext[idx++];
        row.push(alphabetType.includes(ch) ? ch : "X");
      } else {
        row.push("X");
      }
    }
    matrix.push(row);
  }

  // Leer columnas según el orden
  let result = "";
  for (const col of order) {
    for (let r = 0; r < nRows; r++) {
      result += matrix[r][col];
    }
  }

  return result;
}

export function descifrarTranspColumn(ciphertext, key, alphabetType) {
  if (typeof ciphertext !== "string") {
    throw new Error("El texto cifrado debe ser una cadena de caracteres");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("La clave debe ser un string no vacío");
  }

  const nCols = key.length;
  const nRows = Math.ceil(ciphertext.length / nCols);
  const order = getColumnOrder(key);

  // Creamos una matriz vacía
  const matrix = [];
  for (let r = 0; r < nRows; r++) {
    const row = [];
    for (let c = 0; c < nCols; c++) {
      row.push(""); // inicializamos vacíos
    }
    matrix.push(row);
  }

  // Rellenamos las columnas según el orden
  let idx = 0;
  for (const col of order) {
    for (let r = 0; r < nRows; r++) {
      if (idx < ciphertext.length) {
        const ch = ciphertext[idx++];
        // Solo agregamos caracteres válidos según alphabetType
        matrix[r][col] = alphabetType.includes(ch) ? ch : "X";
      } else {
        matrix[r][col] = "X"; // relleno si sobra
      }
    }
  }

  // Leer por filas
  let result = "";
  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      result += matrix[r][c];
    }
  }

  return result; //.replace(/X+$/g, ""); // elimina el padding al final
}
