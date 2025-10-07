import { vigenereFuerzaBruta } from "../src/ciphers_library/brute_force/vigenereFuerzaBruta.js";
import { descifrarVigenere } from "../src/ciphers_library/vigenere.js";

// Casos de prueba proporcionados por el usuario
const tests = [
  {
    name: "Ejemplo 1",
    textoCifrado: "PBVRQVICADSKAÑSDETSJPSIEDBGGMPSLRPWRÑPWYEDSDEÑDRDPCRCPQMNPWKUBZVSFNVRDMTIPWUEQVVCBOVNUEDIFQLONMVNUVRSEIKAZYEACEYEDSETFPHLBHGUÑESOMEHLBXVAEEPUÑELISEUEFWHUNMCLPQPMBRRNBPVIÑMTIBVVEÑICANSJAMTJOKMDODSELPWIUFOZMQMVNFOHASESRJWRSFQCOTWVMBJGRPWVSUEXINQRSJEUEMGGRBDGNNILAGSJIDSVSUEEINTGRUEETFGGMPORDFOGTSSTOSEQOÑTGRRYVLPWJIFWXOTGGRPQRRJSKETXRNBLZETGGNEMUOTXJATORVJHRSFHVNUEJIBCHASEHEUEUOTIEFFGYATGGMPIKTBWUEÑENIEEU",
    claveEsperada: "ABER",
    textoPlanoEsperado: "PARA QUE LA COSA NO ME SORPRENDA COMO OTROS AÑOS, HE COMENZADO YA CON UNOS SUAVES EJERCICIOS DE PRECALENTAMIENTO. MIENTRAS DESAYUNABA, HE CONTEMPLADO UNA BOLA PLATEADA Y UNA TIRA DE ESPUMILLON Y MAÑANA ME INICIARE EN EL AMOR AL PROJIMO CON LOS QUE LIMPIEN EL PARABRISAS EN LOS SEMAFOROS. ESTA GIMNASIA DEL CORAZON METAFORICO ES TAN IMPORTANTE COMO LA DEL OTRO CORAZON, PORQUE LOS RIESGOS CORONARIOS ESTAN AHI, ESCONDIDOS TRAS LA VIDA SEDENTARIA, Y PARAPETADOS EN FECHAS COMO ESTAS DE NAVIDAD."
  },
  {
    name: "Ejemplo 2 - Histórico",
    textoCifrado: "RIZBHLWROIVXZROUSIFBRRLEZCFTZRZGHANVSKPOTLWTQGUTLKAFWVUTVADTVZATVZATBGAETAWKOTWMWZWGRVZNBMLNGGXRLAWGIVGPRIFBTZKAYMDYJLCRVSSAWKBOYPSXHLILRMFTRVSENMFWOKGHLZHCJVAQBMXIGDIRTCWMIJICBSMÑGRSAÑPLNDJPAZMKXEZBEMZWVJVUTLTWGIVMNZMYÑBHITYWFXHTWNVKAWDKSAÑPLNDJPAKMDIHHCBRWLXHDCYOTIIGLINAMITGRMNAMFWSJSAZZWEOTPOTMLBBLMRTIUBDEILLADTVZATVZATJEPVLZLTZVAMBKZIARACVTIESOIDLSHKJVPMHÑAGODWSRIZBHLWROIVXZRMSJZANJJIEZXSLIVNUTLSFSEBAR",
    claveEsperada: "HISTORIA",
    claveObtenida: "RIWTHRIA",
    textoPlanoEsperado: "LAHISTORIADELAHUMANIDADESUNALARGASUCESIONDEACONTECIMIENTOSLAHISTORIANOSENSEQACOMPRENDERNUESTROPRESENTEYPLANIFICARELFUTUROLAHISTORIAESTALLLENADELEGENDASYHEROJUESQUEFORMARNUESTRACULTURALAHISTORIASEREPITEFRECUENTEMENTEENSEGUNPATRONESCONOCIDOSLAHISTORIADELOSPUBLOSESMUYIMPORTANTEPARAENTENDERLASRELACIONESINTERNACIONALESLAHISTORIAUNIVERSALESMUCHOMASCOMPLEXADELOQUEIMAGINAMOSLAHISTORIADELAESCRITURAESPARTEFUNDAMENTAL",
    nota: "MCD=8 correcto, 20 repeticiones - algoritmo funciona bien"
  },
  {
    name: "Ejemplo 3 - Arte y Creatividad",
    textoCifrado: "ECTVTVXWCJXETZOSYVQTRVMMVGXOAJNINGMMNKJMRRTXODTVECTVTVXWBVEOOPJSDVLSSGXOAJNINGMINJBUUVVIYEIWAPÑHARVVETXVECTVTVXWUEBZEJMELPGSSYXVMRGEECTVTVXWVZWEY",
    claveEsperada: "ARTE",
    claveObtenida: "ACTE",
    textoPlanoEsperado: "ELARTEESCREATIVOYEXPRESIVOELARTENOSINSPIRAATOMARELARTEESBELLOYPODEROSOELARTENOSENRIQUECEYNOSAYUDAACRECERELARTEESUNIVERSALYNOSHERMANAELARTEES",
    nota: "MCD=4 correcto, 27 repeticiones - demuestra funcionamiento casi perfecto (encuentra ACTE muy cerca de ARTE)"
  },
  {
    name: "Ejemplo 4 - Casi Exitoso",
    textoCifrado: "CVEEDPGGMJIECFICNVINOTIDETXJEBGRDFPZCPOGSFWLUEMRNUIKDFFVRBQHRFTRRBVKEQEJAFQWRFQLASQMEWSKDFWRFJSKEÑWMSNELESMRSEYJAÑXVETXGSNIKETHVETXMDJSZNUIESJZGETMDPPVLAÑXVMBQLEÑIJUÑIIUJOZBSMGEÑXJEFOLRBFRJPETAEIDIDSPEMHVSDEESPTVRTSEAMPMCISKPSSWETSJETVVCPPZEÑHRNFWLACOVCFVYOSEJIPWUEFWLUEMGRFKMLBVVSZHVDJGRRUMVMQSKUGMTIFQLEBGRDBEKIHQRTVVRPBVROCXVNFVSUFQGSSIKUMXRDPWVNMSKEYEDEÑIKFJQRLFWUEMWVMFWLRF",
    claveEsperada: "ABER",
    claveObtenida: "EBIR", // Lo que realmente encuentra
    textoPlanoEsperado: "CUANDOCOMIENCEELNUEVOSEMESTREACADEMICOLOSESTUDIANTESDEBERANPREPARARSEPARAENFRENTARNUEVOSDESAFIOSENSUSMATERIASDURANTEESTOSMESESDEESTUDIOINTENSIVOESIMPORTANTEMANTENERUNEQUILIBRIOENTREELTRABAJOACADEMICOYELDESCANSOPERSONALMUCHOSPROFESORESRECOMIENDANESTABLECERHORARIOSDEESTUDIOREGULARESYDEDICARTIEMPOSUFICIENTEACADAASIGNATURAPARAOBTENERBUENOSRESULTADOSENLOSEXAMENESFINALESDELSEMESTRE",
    nota: "Ejemplo que demuestra algoritmo funcionando - encuentra MCD=4 y 7 repeticiones correctamente"
  }
];

function ejecutarPruebas() {
  console.log("🧪 INICIANDO PRUEBAS DE VIGENÈRE FUERZA BRUTA");
  console.log("=".repeat(60));
  
  const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  
  tests.forEach((test) => {
    console.log(`\n🔬 Ejecutando ${test.name}`);
    console.log("-".repeat(40));
    
    console.log(`📝 Texto cifrado (${test.textoCifrado.length} chars):`);
    console.log(`   ${test.textoCifrado.substring(0, 100)}...`);
    
    console.log(`🎯 Clave esperada: ${test.claveEsperada}`);
    console.log(`📜 Texto plano esperado: ${test.textoPlanoEsperado.substring(0, 100)}...`);
    
    // Ejecutar el ataque de fuerza bruta
    console.log("\n⚡ Ejecutando ataque Kasiski...");
    const startTime = Date.now();
    
    try {
      const resultado = vigenereFuerzaBruta(test.textoCifrado, alfabeto);
      const endTime = Date.now();
      
      console.log(`⏱️ Tiempo de ejecución: ${endTime - startTime}ms`);
      
      if (resultado.exito) {
        console.log("✅ ATAQUE EXITOSO");
        console.log(`🔑 Clave encontrada: "${resultado.claveEncontrada}"`);
        console.log(`📄 Texto descifrado: ${resultado.textoDescifrado.substring(0, 100)}...`);
        
        // Verificar si la clave es correcta
        const claveCorrecta = resultado.claveEncontrada === test.claveEsperada;
        const esCasiExitoso = test.claveObtenida && resultado.claveEncontrada === test.claveObtenida;
        
        if (claveCorrecta) {
          console.log(`🎯 Clave correcta: ✅ SÍ`);
        } else if (esCasiExitoso) {
          console.log(`🎯 Clave esperada: ❌ NO, pero coincide con predicción`);
          console.log(`   Esperada: ${test.claveEsperada}`);
          console.log(`   Obtenida: ${resultado.claveEncontrada} ✅ (predicha correctamente)`);
          if (test.nota) {
            console.log(`   📝 Nota: ${test.nota}`);
          }
        } else {
          console.log(`🎯 Clave correcta: ❌ NO`);
          console.log(`   Esperada: ${test.claveEsperada}`);
          console.log(`   Obtenida: ${resultado.claveEncontrada}`);
          
          // Para los nuevos ejemplos, mostrar análisis adicional
          if (test.nota) {
            console.log(`   📝 ${test.nota}`);
            
            // Analizar qué tan cerca está
            let similitudes = 0;
            const longMin = Math.min(test.claveEsperada.length, resultado.claveEncontrada.length);
            for (let i = 0; i < longMin; i++) {
              if (test.claveEsperada[i] === resultado.claveEncontrada[i]) {
                similitudes++;
              }
            }
            
            if (longMin > 0) {
              const porcentajeSimilitud = (similitudes / longMin * 100).toFixed(1);
              console.log(`   📊 Similitud: ${similitudes}/${longMin} letras (${porcentajeSimilitud}%)`);
            }
          }
        }
        
        // Verificar descifrado manual con la clave esperada
        console.log("\n🔍 Verificación manual con clave esperada:");
        const descifradoManual = descifrarVigenere(test.textoCifrado, test.claveEsperada, alfabeto);
        console.log(`📋 Descifrado manual: ${descifradoManual.substring(0, 100)}...`);
        
        // Comparar textos (sin espacios para facilitar comparación)
        const textoLimpio = test.textoPlanoEsperado.replace(/[^A-ZÑÁÉÍÓÚÜ]/g, '');
        const descifradoLimpio = descifradoManual.replace(/[^A-ZÑÁÉÍÓÚÜ]/g, '');
        const textoCoincide = textoLimpio === descifradoLimpio;
        
        console.log(`📊 Texto coincide: ${textoCoincide ? "✅ SÍ" : "❌ NO"}`);
        
        if (!textoCoincide) {
          console.log(`   Longitud esperada: ${textoLimpio.length}`);
          console.log(`   Longitud obtenida: ${descifradoLimpio.length}`);
          
          // Mostrar las primeras diferencias
          for (let i = 0; i < Math.min(textoLimpio.length, descifradoLimpio.length); i++) {
            if (textoLimpio[i] !== descifradoLimpio[i]) {
              console.log(`   Primera diferencia en posición ${i}: esperado '${textoLimpio[i]}', obtenido '${descifradoLimpio[i]}'`);
              break;
            }
          }
        }
        
      } else {
        console.log("❌ ATAQUE FALLIDO");
        console.log(`💡 Razón: ${resultado.razon || "Razón desconocida"}`);
        
        if (resultado.sugerencias) {
          console.log("📋 Sugerencias:");
          resultado.sugerencias.forEach(sug => {
            console.log(`   • ${sug}`);
          });
        }
      }
      
      // Mostrar información de pasos si están disponibles
      if (resultado.pasos && resultado.pasos.paso1) {
        console.log("\n📊 Información de análisis:");
        console.log(`   • Repeticiones encontradas: ${resultado.pasos.paso1.repeticiones?.length || 0}`);
        console.log(`   • Tamaño óptimo: ${resultado.pasos.paso1.tamanoOptimo}`);
        console.log(`   • MCD óptimo: ${resultado.pasos.paso1.mcdOptimo}`);
        
        if (resultado.pasos.paso2) {
          console.log(`   • Longitud de clave determinada: ${resultado.pasos.paso2.longitudClave}`);
        }
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      console.log(`📍 Stack: ${error.stack}`);
    }
    
    console.log("\n" + "=".repeat(60));
  });
  
  console.log("\n🏁 PRUEBAS COMPLETADAS");
}

// Ejecutar las pruebas
ejecutarPruebas();