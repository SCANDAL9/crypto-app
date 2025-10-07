export const formatearPatrones = (patrones) => {
  if (!patrones || patrones.length === 0) return "   Ninguno encontrado";

  // Agrupar patrones por nombre para evitar duplicados
  const patronesAgrupados = new Map();
  
  patrones.forEach(rep => {
    if (!patronesAgrupados.has(rep.patron)) {
      patronesAgrupados.set(rep.patron, {
        patron: rep.patron,
        posiciones: [],
        distancias: [],
        mcd: rep.mcd
      });
    }
    
    const grupo = patronesAgrupados.get(rep.patron);
    
    // Agregar posiciones sin duplicar
    if (rep.posiciones) {
      rep.posiciones.forEach(pos => {
        if (!grupo.posiciones.includes(pos)) {
          grupo.posiciones.push(pos);
        }
      });
    } else if (rep.posicion1 !== undefined && rep.posicion2 !== undefined) {
      if (!grupo.posiciones.includes(rep.posicion1)) {
        grupo.posiciones.push(rep.posicion1);
      }
      if (!grupo.posiciones.includes(rep.posicion2)) {
        grupo.posiciones.push(rep.posicion2);
      }
    }
  });
  
  // Procesar cada grupo y calcular distancias
  const patronesFinales = [];
  let index = 1;
  
  for (const [_patron, grupo] of patronesAgrupados) {
    // Ordenar posiciones
    grupo.posiciones.sort((a, b) => a - b);
    
    // Calcular todas las distancias
    const distancias = [];
    for (let i = 1; i < grupo.posiciones.length; i++) {
      distancias.push(grupo.posiciones[i] - grupo.posiciones[i-1]);
    }
    
    // Calcular MCD de las distancias del patrón
    const calcularMCD = (a, b) => b === 0 ? a : calcularMCD(b, a % b);
    const mcdPatron = distancias.length > 1 ? 
      distancias.reduce(calcularMCD) : 
      (distancias.length === 1 ? distancias[0] : grupo.mcd || 'N/A');
    
    patronesFinales.push({
      index: index++,
      patron: grupo.patron,
      ocurrencias: grupo.posiciones.length,
      posiciones: grupo.posiciones,
      distancias: distancias,
      mcd: mcdPatron
    });
  }
  
  // Ordenar por número de ocurrencias (mayor a menor)
  patronesFinales.sort((a, b) => b.ocurrencias - a.ocurrencias);
  
  return patronesFinales
    .map((rep) => {
      return `   ${rep.index}. "${rep.patron}" (${rep.ocurrencias} ocurrencias)\n      → Posiciones: [${rep.posiciones.join(", ")}]\n      → Distancias: [${rep.distancias.join(", ")}]\n`;
    })
    .join("\n");
};

/**
 * Formatea los subcriptogramas generados en el análisis Kasiski
 * Muestra cada subcriptograma con su longitud y contenido (con preview si es muy largo)
 */
export const formatearSubcriptogramas = (subcriptogramas) => {
  if (!subcriptogramas || subcriptogramas.length === 0) return "   No disponibles";
  
  return subcriptogramas
    .map((subcripto, index) => {
      const longitud = subcripto.length;
      const preview = subcripto.length > 50 ? 
        `${subcripto.substring(0, 47)}...` : 
        subcripto;
      
      return `   Subcriptograma ${index + 1} (${longitud} chars):\n   "${preview}" \n`;
    })
    .join("\n");
};

/**
 * Formatea el resultado completo del análisis Kasiski
 * Genera tanto el resultado principal como los detalles técnicos
 */
export const formatearResultado = (result) => {
  if (!result) return { 
    resultadoPrincipal: "No se pudo descifrar el texto.",
    detalles: ""
  };

  const { exito, textoDescifrado, claveEncontrada, pasos, razon, error } = result;

  let resultadoPrincipal = "";
  let detalles = "";

  // Resultado principal
  if (exito) {
    resultadoPrincipal += `✅ DESCIFRADO EXITOSO\n\n`;
    resultadoPrincipal += `🔑 Clave encontrada: "${claveEncontrada}"\n`;
    resultadoPrincipal += `📜 Texto descifrado:\n"${textoDescifrado}"`;
  } else {
    resultadoPrincipal += `❌ DESCIFRADO FALLIDO\n\n`;
    resultadoPrincipal += `⚠️ Razón: ${razon || error || "Error desconocido"}`;
  }

  // Detalles del algoritmo con mejor formato y estructura
  detalles += `📊 ANÁLISIS KASISKI\n`;
  detalles += `${"=".repeat(50)}\n\n`;
  detalles += `📏 INFORMACIÓN GENERAL:\n`;

  if (exito) {
    // PASO 1: Búsqueda de patrones
    if (pasos?.paso1) {
      detalles += `🔍 PASO 1: BÚSQUEDA DE PATRONES\n`;
      detalles += `   • Patrones encontrados: ${pasos.paso1.repeticiones?.length || 0}\n`;
      detalles += `   • Tamaño óptimo: ${pasos.paso1.tamanoOptimo} caracteres\n`;
      detalles += `   • MCD óptimo: ${pasos.paso1.mcdOptimo}\n\n`;

      if (pasos.paso1.repeticiones && pasos.paso1.repeticiones.length > 0) {
        detalles += `🧩 PATRONES DETECTADOS:\n`;
        detalles += formatearPatrones(pasos.paso1.repeticiones);
        detalles += `\n`;
      }
    }

    // PASO 2: Longitud de clave
    if (pasos?.paso2) {
      detalles += `📐 PASO 2: LONGITUD DE CLAVE\n`;
      detalles += `   • Longitud determinada: ${pasos.paso2.longitudClave} caracteres\n`;
      detalles += `   • Método: Máximo Común Divisor de distancias\n\n`;
    }

    // PASO 3: Subcriptogramas
    if (pasos?.paso3) {
      detalles += `📈 PASO 3: SUBCRIPTOGRAMAS\n`;
      detalles += `   • Subcriptogramas creados: ${pasos.paso3.subcriptogramas?.length || 0}\n`;
      detalles += `   • Cada subcriptograma representa una posición de la clave\n\n`;
      
      // Mostrar los subcriptogramas si están disponibles
      if (pasos.paso3.subcriptogramas && pasos.paso3.subcriptogramas.length > 0) {
        detalles += `📝 SUBCRIPTOGRAMAS GENERADOS:\n`;
        detalles += formatearSubcriptogramas(pasos.paso3.subcriptogramas);
        detalles += `\n`;
      }
    }

    // PASOS 4-8: Análisis y construcción
    detalles += `🎯 PASOS 4-8: ANÁLISIS Y CONSTRUCCIÓN\n`;
    detalles += `   • Análisis de frecuencias completado por subcriptograma\n`;
    detalles += `   • Regla AEOS aplicada (A→E→O→S)\n`;
    detalles += `   • Clave construida exitosamente\n`;
    detalles += `   • Verificación del descifrado: ✅ EXITOSA\n\n`;

    // Resultado final
    detalles += `🏆 RESULTADO FINAL:\n`;
    detalles += `   • Clave: "${claveEncontrada}"\n`;
    detalles += `   • Longitud: ${claveEncontrada.length} caracteres\n`;
    detalles += `   • Método: Ataque Kasiski exitoso`;
  } else {
    // Caso de fallo
    detalles += `❌ FALLO EN EL ANÁLISIS:\n`;
    detalles += `   • Razón: ${razon || error || "Error desconocido"}\n`;
    detalles += `   • El texto podría ser demasiado corto\n`;
    detalles += `   • La clave podría ser muy larga\n`;
    detalles += `   • Podría no ser un cifrado Vigenère`;
  }

  return { resultadoPrincipal, detalles };
};