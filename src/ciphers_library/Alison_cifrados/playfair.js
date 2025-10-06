//  Genera la matriz 5x5 a partir de la clave
function generarMatrizPlayfair(clave, alphabetType = "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  const seen = new Set();
  const key = (clave + alphabetType).toUpperCase().replace(/J/g, "I");
  const matrix = [];

  for (const ch of key) {
    if (!seen.has(ch) && /[A-Z]/.test(ch)) {
      seen.add(ch);
      matrix.push(ch);
    }
  }

  // Matriz de 5x5
  const grid = [];
  for (let i = 0; i < 5; i++) grid.push(matrix.slice(i * 5, i * 5 + 5));

  return grid;
}

//  Busca la posición (fila, columna) de una letra en la matriz
function buscarPos(matriz, letra) {
  for (let fila = 0; fila < 5; fila++) {
    for (let col = 0; col < 5; col++) {
      if (matriz[fila][col] === letra) return [fila, col];
    }
  }
  return null;
}

// Prepara el texto (reemplaza J por I, añade X si hay pares iguales)
function prepararTexto(texto) {
  let limpio = texto.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let pares = "";

  for (let i = 0; i < limpio.length; i++) {
    const a = limpio[i];
    const b = limpio[i + 1];

    if (a === b) {
      pares += a + "X";
    } else {
      pares += a;
      if (b) pares += b;
      i++;
    }
  }
  if (pares.length % 2 !== 0) pares += "X";
  return pares;
}

// Función principal de cifrado Playfair
export function cifrarPlayfair(plaintext, clave) {
  if (typeof plaintext !== "string") throw new Error("El texto debe ser una cadena");
  if (typeof clave !== "string" || clave.length === 0) throw new Error("Clave inválida");

  const matriz = generarMatrizPlayfair(clave);
  const texto = prepararTexto(plaintext);
  let resultado = "";

  for (let i = 0; i < texto.length; i += 2) {
    const [a, b] = [texto[i], texto[i + 1]];
    const [filaA, colA] = buscarPos(matriz, a);
    const [filaB, colB] = buscarPos(matriz, b);

    if (filaA === filaB) {
      resultado += matriz[filaA][(colA + 1) % 5] + matriz[filaB][(colB + 1) % 5];
    } else if (colA === colB) {
      resultado += matriz[(filaA + 1) % 5][colA] + matriz[(filaB + 1) % 5][colB];
    } else {
      resultado += matriz[filaA][colB] + matriz[filaB][colA];
    }
  }
  return resultado;
}

//  Descifrado Playfair (inverso)
export function descifrarPlayfair(ciphertext, clave) {
  if (typeof ciphertext !== "string") throw new Error("El texto debe ser una cadena");
  if (typeof clave !== "string" || clave.length === 0) throw new Error("Clave inválida");

  const matriz = generarMatrizPlayfair(clave);
  const texto = ciphertext.toUpperCase().replace(/J/g, "I");
  let resultado = "";

  for (let i = 0; i < texto.length; i += 2) {
    const [a, b] = [texto[i], texto[i + 1]];
    const [filaA, colA] = buscarPos(matriz, a);
    const [filaB, colB] = buscarPos(matriz, b);

    if (filaA === filaB) {
      resultado += matriz[filaA][(colA + 4) % 5] + matriz[filaB][(colB + 4) % 5];
    } else if (colA === colB) {
      resultado += matriz[(filaA + 4) % 5][colA] + matriz[(filaB + 4) % 5][colB];
    } else {
      resultado += matriz[filaA][colB] + matriz[filaB][colA];
    }
  }
  return resultado;
}
