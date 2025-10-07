import { descifrarVigenere } from "../vigenere.js";
import { frequencyAnalysis } from "../analisisFrecuencia.js";

// Función auxiliar: Calcular el máximo común divisor
function mcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Función auxiliar: Calcular el MCD de un array de números
function mcdArray(numeros) {
  if (numeros.length === 0) return 1;
  if (numeros.length === 1) return numeros[0];
  
  let resultado = numeros[0];
  for (let i = 1; i < numeros.length; i++) {
    resultado = mcd(resultado, numeros[i]);
    if (resultado === 1) break; // Si llega a 1, no hay sentido continuar
  }
  return resultado;
}

// PASO 1 y 2: Buscar repeticiones de tamaño óptimo y encontrar el MCD de todas 
// las separaciones para obtener longitud L de la clave
function buscarRepeticionesOptimas(ciphertext) {
  //const texto = ciphertext.replace(/[^A-Z]/g, ''); // Solo letras mayúsculas
  const texto = ciphertext;
  let mejorTamano = 3;
  let mejorMCD = 1;
  let mejoresRepeticiones = [];
  let mejorPuntuacion = 0;
  
  // Probar tamaños de 3 a 8 caracteres
  for (let tamano = 3; tamano <= 8; tamano++) {
    const repeticiones = buscarRepeticionesTamano(texto, tamano);
    
    if (repeticiones.length > 0) {
      const distancias = repeticiones.map(rep => rep.distancia);
      const mcdActual = mcdArray(distancias);
      
      // Calcular puntuación priorizando fuertemente MCDs más altos
      let puntuacion = 0;
      if (mcdActual > 1) {
        // Priorizar MCD muy alto: MCD^3 + bonus por repeticiones
        puntuacion = (mcdActual * mcdActual * mcdActual) + repeticiones.length;
      } else {
        // MCD=1 es poco valioso, solo contar repeticiones pero con penalización
        puntuacion = repeticiones.length * 0.1; // Penalizar fuertemente MCD=1
      }
      
      // Seleccionar el mejor basado en puntuación total
      if (puntuacion > mejorPuntuacion && repeticiones.length >= 2) {
        mejorPuntuacion = puntuacion;
        mejorMCD = mcdActual;
        mejorTamano = tamano;
        mejoresRepeticiones = repeticiones;
      }
    }
  }
  
  return {
    tamanoOptimo: mejorTamano,
    mcdOptimo: mejorMCD,
    repeticiones: mejoresRepeticiones
  };
}

// Función auxiliar: Buscar repeticiones de un tamaño específico
function buscarRepeticionesTamano(texto, longitud) {
  const repeticiones = [];
  const patronesVistos = new Map();
  
  // Buscar patrones de longitud específica
  for (let i = 0; i <= texto.length - longitud; i++) {
    const patron = texto.substring(i, i + longitud);
    
    if (patronesVistos.has(patron)) {
      // Ya vimos este patrón antes, calcular distancia
      const posicionAnterior = patronesVistos.get(patron);
      const distancia = i - posicionAnterior;
      
      repeticiones.push({
        patron,
        posicion1: posicionAnterior,
        posicion2: i,
        distancia
      });
    } else {
      // Primera vez que vemos este patrón
      patronesVistos.set(patron, i);
    }
  }
  
  return repeticiones;
}

// PASO 3: Dividir el criptograma en L subcriptogramas
function dividirEnSubcriptogramas(ciphertext, longitudClave) {
  //const texto = ciphertext.replace(/[^A-Z]/g, ''); // Solo letras mayúsculas
  const texto = ciphertext;
  const subcriptogramas = [];
  
  // Crear L subcriptogramas vacíos
  for (let i = 0; i < longitudClave; i++) {
    subcriptogramas.push('');
  }
  
  // Distribuir las letras en los subcriptogramas
  for (let i = 0; i < texto.length; i++) {
    const subcriptograma = i % longitudClave;
    subcriptogramas[subcriptograma] += texto[i];
  }
  
  return subcriptogramas;
}

// PASO 4: Para cada subcriptograma, calcular frecuencia de cada letra
function analizarFrecuencias(subcriptogramas) {
  return subcriptogramas.map((subcripto, index) => {
    const analisis = frequencyAnalysis(subcripto);
    return {
      subcriptograma: index,
      texto: subcripto,
      frecuencias: analisis.frequencies,
      total: analisis.total
    };
  });
}

// PASO 5 y 6: Aplicar la regla AEOS (A +4→ E +11→ O +4→ S)
function aplicarReglaAEOS(analisisFrecuencias, alphabetType) {
  const alphabet = Array.isArray(alphabetType) ? alphabetType : alphabetType.split('');
  const n = alphabet.length;
  
  // Índices de A, E, O, S en el alfabeto español (A=0, E=4, O=14, S=18)
  const indiceA = alphabet.indexOf('A');
  const indiceE = alphabet.indexOf('E');
  const indiceO = alphabet.indexOf('O');
  const indiceS = alphabet.indexOf('S');
  
  const resultados = [];
  
  for (const analisis of analisisFrecuencias) {
    if (analisis.frecuencias.length < 4) {
      resultados.push({
        subcriptograma: analisis.subcriptograma,
        posibleClave: 'X', // No hay suficientes datos
        confianza: 0
      });
      continue;
    }
    
    // Obtener las 4 letras más frecuentes
    const top4 = analisis.frecuencias.slice(0, 4);
    
    let mejorCandidato = null;
    let mejorPuntuacion = 0;
    
    // Probar cada letra del top 4 como posible 'A'
    for (let i = 0; i < top4.length; i++) {
      const candidatoA = top4[i].ch;
      const indiceCandiA = alphabet.indexOf(candidatoA);
      
      if (indiceCandiA === -1) continue;
      
      // Calcular desplazamiento: si candidatoA es realmente 'A', entonces
      // desplazamiento = (indiceCandiA - indiceA + n) % n
      const desplazamiento = (indiceCandiA - indiceA + n) % n;
      
      // Verificar si con este desplazamiento obtenemos E, O, S en posiciones esperadas
      const expectedE = alphabet[(indiceE + desplazamiento) % n];
      const expectedO = alphabet[(indiceO + desplazamiento) % n];
      const expectedS = alphabet[(indiceS + desplazamiento) % n];
      
      // Contar cuántas de estas letras esperadas están en el top 4
      let puntuacion = 0;
      const letrasEnTop4 = top4.map(f => f.ch);
      
      if (letrasEnTop4.includes(candidatoA)) puntuacion++;
      if (letrasEnTop4.includes(expectedE)) puntuacion++;
      if (letrasEnTop4.includes(expectedO)) puntuacion++;
      if (letrasEnTop4.includes(expectedS)) puntuacion++;
      
      if (puntuacion > mejorPuntuacion) {
        mejorPuntuacion = puntuacion;
        mejorCandidato = {
          letraClave: alphabet[desplazamiento],
          desplazamiento,
          candidatoA,
          expectedLetters: { E: expectedE, O: expectedO, S: expectedS }
        };
      }
    }
    
    resultados.push({
      subcriptograma: analisis.subcriptograma,
      posibleClave: mejorCandidato ? mejorCandidato.letraClave : 'X',
      confianza: mejorPuntuacion,
      detalles: mejorCandidato
    });
  }
  
  return resultados;
}

// PASO 7 y 8: Construir la clave completa y verificar
function construirClave(resultadosAEOS) {
  return resultadosAEOS.map(resultado => resultado.posibleClave).join('');
}

// Función para determinar la razón del fallo del método Kasiski
function determinarRazonFallo(ciphertext, analisisRepeticiones) {
  const longitudTexto = ciphertext.length;
  
  // Analizar las posibles causas del fallo
  if (longitudTexto < 100) {
    return `Texto muy corto (${longitudTexto} caracteres). Se recomiendan al menos 100 caracteres para Kasiski.`;
  }
  
  if (analisisRepeticiones.repeticiones.length === 0) {
    return "No se encontraron patrones repetidos de ningún tamaño. El texto podría no ser un cifrado Vigenère.";
  }
  
  if (analisisRepeticiones.repeticiones.length < 3) {
    return `Muy pocos patrones repetidos encontrados (${analisisRepeticiones.repeticiones.length}). La clave podría ser muy larga.`;
  }
  
  // Si hay repeticiones pero MCD = 1, las distancias no tienen divisor común
  const distancias = analisisRepeticiones.repeticiones.map(r => r.distancia);
  return `Se encontraron ${analisisRepeticiones.repeticiones.length} patrones repetidos, pero sus distancias (${distancias.slice(0, 5).join(', ')}...) no tienen un divisor común mayor que 1.`;
}

// Función principal del ataque de Kasiski
export function vigenereFuerzaBruta(ciphertext, alphabetType = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ") {
  if (typeof ciphertext !== "string") {
    throw new Error("El texto cifrado debe ser una cadena de caracteres");
  }
  
  const resultados = {
    textoOriginal: ciphertext,
    pasos: {},
    claveEncontrada: null,
    textoDescifrado: null,
    exito: false
  };
  
  try {
    // PASO 1: Buscar repeticiones con tamaño óptimo
    const analisisRepeticiones = buscarRepeticionesOptimas(ciphertext);
    resultados.pasos.paso1 = {
      repeticiones: analisisRepeticiones.repeticiones,
      tamanoOptimo: analisisRepeticiones.tamanoOptimo,
      mcdOptimo: analisisRepeticiones.mcdOptimo,
      descripcion: `Repeticiones encontradas con tamaño ${analisisRepeticiones.tamanoOptimo}`
    };
    
    // PASO 2: Usar el MCD óptimo encontrado
    const infoLongitud = {
      longitudClave: analisisRepeticiones.mcdOptimo,
      distancias: analisisRepeticiones.repeticiones.map(r => r.distancia),
      repeticiones: analisisRepeticiones.repeticiones
    };
    resultados.pasos.paso2 = {
      ...infoLongitud,
      descripcion: `Longitud probable de clave: ${infoLongitud.longitudClave}`
    };
    
    // Si Kasiski encontró una longitud válida (MCD > 1), usarla directamente
    if (infoLongitud.longitudClave > 1) {
      // Kasiski encontró una longitud válida
      
      const L = infoLongitud.longitudClave;
      
      // PASO 3: Dividir en subcriptogramas
      const subcriptogramas = dividirEnSubcriptogramas(ciphertext, L);
      
      // PASO 4: Analizar frecuencias
      const analisisFrecuencias = analizarFrecuencias(subcriptogramas);
      
      // PASO 5 y 6: Aplicar regla AEOS
      const resultadosAEOS = aplicarReglaAEOS(analisisFrecuencias, alphabetType);
      
      // PASO 7: Construir clave
      const claveCandidata = construirClave(resultadosAEOS);
      
      // Calcular confianza total
      const confianzaTotal = resultadosAEOS.reduce((sum, r) => sum + r.confianza, 0);
      
      // PASO 8: Verificar descifrando
      let textoDescifrado = "";
      try {
        textoDescifrado = descifrarVigenere(ciphertext, claveCandidata, alphabetType);
      } catch {
        textoDescifrado = "Error al descifrar";
      }
      
      // Almacenar los pasos del proceso
      resultados.pasos.paso3 = {
        subcriptogramas,
        descripcion: `División en ${L} subcriptogramas`
      };
      
      resultados.pasos.paso4 = {
        analisisFrecuencias,
        descripcion: "Análisis de frecuencias por subcriptograma"
      };
      
      resultados.pasos.paso5y6 = {
        resultadosAEOS,
        descripcion: "Aplicación de regla AEOS (A +4→ E +11→ O +4→ S)"
      };
      
      resultados.pasos.paso7y8 = {
        claveEncontrada: claveCandidata,
        textoDescifrado,
        descripcion: "Construcción de clave y verificación"
      };
      
      resultados.claveEncontrada = claveCandidata;
      resultados.textoDescifrado = textoDescifrado;
      resultados.exito = true;
      resultados.confianza = confianzaTotal;
      
    } else {
      // Kasiski falló - no se puede realizar el ataque
      console.log("❌ FALLO DEL MÉTODO KASISKI: MCD = 1");
      
      const razonFallo = determinarRazonFallo(ciphertext, analisisRepeticiones);
      
      resultados.exito = false;
      resultados.razon = `Ataque Kasiski fallido: ${razonFallo}`;
      resultados.sugerencias = [
        "El texto podría ser demasiado corto para el análisis Kasiski",
        "La clave podría ser muy larga en relación al texto",
        "Podría no ser un cifrado Vigenère",
        "Intente con un texto más largo"
      ];
      
      console.log(`Razón del fallo: ${razonFallo}`);
    }
    
  } catch (error) {
    resultados.error = error.message;
  }
  
  return resultados;
}
