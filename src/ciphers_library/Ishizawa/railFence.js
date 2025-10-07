export function cifrarRailFence(text, rails, alphabet) {
    //  Validaciones
    if (typeof text !== "string") {
        throw new Error("El parámetro 'text' debe ser un string.");
    }
    if (typeof rails !== "number" || !Number.isInteger(rails) || rails < 2) {
        throw new Error("El parámetro 'rails' debe ser un número entero mayor o igual a 2.");
    }
    if (typeof alphabet !== "string" || alphabet.length === 0) {
        throw new Error("El parámetro 'alphabet' debe ser un string no vacío.");
    }

    //  Solo consideramos caracteres del alfabeto
    let filteredText = "";
    for (let ch of text) {
        if (alphabet.includes(ch) || ch === " ") filteredText += ch;
    }

    //  Creamos un array con cada riel
    const railArray = Array.from({ length: rails }, () => []);

    //  Recorremos el texto en forma de zigzag
    let rail = 0;
    let direccion = 1; // 1 = bajando, -1 = subiendo

    for (let char of filteredText) {
        railArray[rail].push(char);

        if (rail === 0) direccion = 1;
        else if (rail === rails - 1) direccion = -1;

        rail += direccion;
    }

    //  Unimos todas las filas
    return railArray.map(r => r.join("")).join("");
}

export function descifrarRailFence(text, rails, alphabet) {
    //  Validaciones
    if (typeof text !== "string") {
        throw new Error("El parámetro 'text' debe ser un string.");
    }
    if (typeof rails !== "number" || !Number.isInteger(rails) || rails < 2) {
        throw new Error("El parámetro 'rails' debe ser un número entero mayor o igual a 2.");
    }
    if (typeof alphabet !== "string" || alphabet.length === 0) {
        throw new Error("El parámetro 'alphabet' debe ser un string no vacío.");
    }

    const len = text.length;

    //  Paso 1: crear el patrón de movimiento (zigzag)
    let railPattern = new Array(len);
    let rail = 0;
    let direccion = 1;

    for (let i = 0; i < len; i++) {
        railPattern[i] = rail;
        if (rail === 0) direccion = 1;
        else if (rail === rails - 1) direccion = -1;
        rail += direccion;
    }

    //  Paso 2: contar cuántos caracteres van en cada riel
    const railCount = new Array(rails).fill(0);
    for (let r of railPattern) railCount[r]++;

    //  Paso 3: llenar cada riel con su parte del texto cifrado
    const railStrings = [];
    let pos = 0;
    for (let r = 0; r < rails; r++) {
        railStrings[r] = text.slice(pos, pos + railCount[r]).split("");
        pos += railCount[r];
    }

    //  Paso 4: reconstruir el texto leyendo en zigzag
    let resultado = "";
    for (let r of railPattern) {
        resultado += railStrings[r].shift();
    }

    return resultado;
}


