import { caesarEncrypt, caesarDecrypt } from "../src/ciphers/caesar.js";

// Función simple de "assert"
function assertEquals(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ ${testName} funciona correctamente.`);
    } else {
        console.error(`❌ ${testName} falló. Esperado: "${expected}", pero obtuve: "${actual}"`);
    }
}

// Test 1: cifrado y descifrado (roundtrip)
const t1 = "HELLOWORLD";
const c1 = caesarEncrypt(t1, 5, { normalize: "uppercase" });
const d1 = caesarDecrypt(c1, 5, { normalize: "uppercase" });
assertEquals(d1, t1, "Caesar roundtrip");

// Test 2: shift 26 debe dar identidad
const t2 = "ABCXYZ";
const c2 = caesarEncrypt(t2, 26, { normalize: "uppercase" });
assertEquals(c2, t2, "Caesar shift 26 identidad");
