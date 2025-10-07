import { vigenereFuerzaBruta } from '../src/ciphers_library/brute_force/vigenereFuerzaBruta.js';

console.log('=== ANÁLISIS DEL TEXTO CIFRADO ===\n');
const textoCifrado = "PBVRQVICADSKAÑSDETSJPSIEDBGGMPSLRPWRÑPWYEDSDEÑDRDPCRCPQMNPWKUBZVSFNVRDMTIPWUEQVVCBOVNUEDIFQLONMVNUVRSEIKAZYEACEYEDSETFPHLBHGUÑESOMEHLBXVAEEPUÑELISEUEFWHUNMCLPQPMBRRNBPVIÑMTIBVVEÑICANSJAMTJOKMDODSELPWIUFOZMQMVNFOHASESRJWRSFQCOTWVMBJGRPWVSUEXINQRSJEUEMGGRBDGNNILAGSJIDSVSUEEINTGRUEETFGGMPORDFOGTSSTOSEQOÑTGRRYVLPWJIFWXOTGGRPQRRJSKETXRNBLZETGGNEMUOTXJATORVJHRSFHVNUEJIBCHASEHEUEUOTIEFFGYATGGMPIKTBWUEÑENIEEU";

console.log('Texto cifrado:', textoCifrado);
console.log('Longitud texto: ', textoCifrado.length);
console.log();

// Ejecutar el algoritmo de Kasiski para obtener los patrones encontrados
console.log('=== EJECUTANDO ANÁLISIS KASISKI ===');
const resultadoKasiski = vigenereFuerzaBruta(textoCifrado, "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ");

if (resultadoKasiski.exito) {
  // Extraer los patrones repetidos del análisis Kasiski
  const repeticionesKasiski = resultadoKasiski.pasos.paso1.repeticiones;
  
  console.log(`Tamaño óptimo encontrado por Kasiski: ${resultadoKasiski.pasos.paso1.tamanoOptimo}`);
  console.log(`MCD óptimo: ${resultadoKasiski.pasos.paso1.mcdOptimo}`);
  console.log();

  // Agrupar patrones por nombre para evitar duplicados
  const patronesAgrupados = new Map();
  
  repeticionesKasiski.forEach(rep => {
    if (!patronesAgrupados.has(rep.patron)) {
      patronesAgrupados.set(rep.patron, {
        patron: rep.patron,
        posiciones: [],
        distancias: []
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
  
  // Ordenar posiciones y calcular distancias para cada grupo
  const patronesFinales = [];
  for (const [_patron, grupo] of patronesAgrupados) {
    grupo.posiciones.sort((a, b) => a - b);
    
    // Calcular todas las distancias
    const distancias = [];
    for (let i = 1; i < grupo.posiciones.length; i++) {
      distancias.push(grupo.posiciones[i] - grupo.posiciones[i-1]);
    }
    
    patronesFinales.push({
      patron: grupo.patron,
      ocurrencias: grupo.posiciones.length,
      posiciones: grupo.posiciones,
      distancias: distancias
    });
  }
  
  // Ordenar por número de ocurrencias (mayor a menor)
  patronesFinales.sort((a, b) => b.ocurrencias - a.ocurrencias);
  
  console.log(`Patrones únicos repetidos encontrados: ${patronesFinales.length}`);
  console.log();

  console.log('=== PATRONES REPETIDOS ENCONTRADOS POR KASISKI (DETALLADO) ===');
  patronesFinales.forEach((rep) => {
    console.log(`Patrón "${rep.patron}": ${rep.ocurrencias} ocurrencias`);
    console.log(`  Posiciones: [${rep.posiciones.join(', ')}]`);
    
    // Mostrar todas las distancias
    for (let i = 1; i < rep.posiciones.length; i++) {
      const distancia = rep.posiciones[i] - rep.posiciones[i-1];
      console.log(`  Distancia ${rep.posiciones[i-1]} → ${rep.posiciones[i]}: ${distancia}`);
    }
    console.log();
  });

  // Calcular estadísticas de las distancias encontradas por Kasiski
  const todasLasDistancias = [];
  patronesFinales.forEach(rep => {
    todasLasDistancias.push(...rep.distancias);
  });

  // Funciones auxiliares
  const calcularMCD = (a, b) => b === 0 ? a : calcularMCD(b, a % b);
  const mcdDeArray = (arr) => arr.reduce(calcularMCD);

  console.log('=== ANÁLISIS ESTADÍSTICO ===');
  console.log(`Total de distancias analizadas: ${todasLasDistancias.length}`);
  console.log('Todas las distancias:', todasLasDistancias);
  console.log(`MCD de todas las distancias: ${mcdDeArray(todasLasDistancias)}`);

  console.log();
  console.log('=== RESUMEN FINAL ===');
  console.log(`• Clave encontrada: "${resultadoKasiski.claveEncontrada}"`);
  console.log(`• Texto descifrado: ${resultadoKasiski.textoDescifrado}`);
  
} else {
  console.log('❌ El algoritmo de Kasiski falló:');
  console.log(`Razón: ${resultadoKasiski.razon}`);
}

console.log('\n=== FIN DEL ANÁLISIS ===');
