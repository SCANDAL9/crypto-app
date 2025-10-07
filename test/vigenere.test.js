// // test/vigenere.test.js
import { cifrarVigenere, descifrarVigenere } from "../src/ciphers_library/vigenere.js";
const AL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const pt = "ATTACKATDAWN";
const key = "LEMON";
const ct = cifrarVigenere(pt, key, AL);
if (ct !== "LXFOPVEFRNHR") throw new Error("Encrypt fallo: " + ct);
const dt = descifrarVigenere(ct, key, AL);
if (dt !== pt) throw new Error("Decrypt fallo: " + dt);
console.log("Vigenere tests OK");
