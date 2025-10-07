
export function cifrarPermutacion(text, clave, alphabet) {
    if (typeof text !== "string") throw new Error("El parámetro 'text' debe ser un string.");
    if (typeof clave !== "string" || clave.length < 2)
        throw new Error("El parámetro 'clave' debe ser un string con al menos 2 caracteres.");
    if (typeof alphabet !== "string" || alphabet.length === 0)
        throw new Error("El parámetro 'alphabet' debe ser un string no vacío.");

    // Determinar el orden de las columnas según la clave
    const orden = [...clave].map((c, i) => ({ c, i }))
        .sort((a, b) => a.c.localeCompare(b.c))
        .map(obj => obj.i);

    const cols = clave.length;
    const rows = Math.ceil(text.length / cols);
    const matriz = [];

    // Rellenar matriz por filas
    let index = 0;
    for (let r = 0; r < rows; r++) {
        matriz[r] = [];
        for (let c = 0; c < cols; c++) {
            matriz[r][c] = text[index] || "X"; // Relleno con X
            index++;
        }
    }

    // Leer por columnas según el orden de la clave
    let resultado = "";
    for (let col of orden) {
        for (let r = 0; r < rows; r++) {
            resultado += matriz[r][col];
        }
    }

    return resultado;
}


export function descifrarPermutacion(text, clave, alphabet) {
    if (typeof text !== "string") throw new Error("El parámetro 'text' debe ser un string.");
    if (typeof clave !== "string" || clave.length < 2)
        throw new Error("El parámetro 'clave' debe ser un string con al menos 2 caracteres.");
    if (typeof alphabet !== "string" || alphabet.length === 0)
        throw new Error("El parámetro 'alphabet' debe ser un string no vacío.");

    const orden = [...clave].map((c, i) => ({ c, i }))
        .sort((a, b) => a.c.localeCompare(b.c))
        .map(obj => obj.i);

    const cols = clave.length;
    const rows = Math.ceil(text.length / cols);
    const matriz = Array.from({ length: rows }, () => Array(cols).fill(""));

    // Determinar cuántos caracteres por columna
    const base = Math.floor(text.length / cols);
    const extra = text.length % cols;
    const colLengths = Array(cols).fill(base).map((len, i) => len + (i < extra ? 1 : 0));

    // Rellenar columnas según el orden
    let pos = 0;
    for (let i = 0; i < cols; i++) {
        const col = orden[i];
        const len = colLengths[i];
        const fragmento = text.slice(pos, pos + len);
        for (let r = 0; r < rows; r++) {
            matriz[r][col] = fragmento[r] || "";
        }
        pos += len;
    }

    // Leer por filas
    return matriz.map(fila => fila.join("")).join("").replace(/X+$/, "");
}


