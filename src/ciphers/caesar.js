
export function caesarEncrypt(plaintext, shift, options = {}) {
  const alphabet = (options.alphabet || "ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
  const n = alphabet.length;
  const map = new Map(alphabet.map((c,i)=>[c,i]));
  const normalize = options.normalize === 'uppercase' 
      ? s => s.toUpperCase() 
      : options.normalize ==='lowercase'
        ? s => s.toLowerCase()
        : s => s;

  const text = normalize(plaintext);
  let out = "";

  for (const ch of text) {
    if (!map.has(ch)) {
      out += (options.preserveCase ? ch : ch); // mantener no-alfabeto
      continue;
    }
    const i = map.get(ch);
    const j = ((i + shift) % n + n) % n;
    out += alphabet[j];
  }
  return out;
}

export function caesarDecrypt(ciphertext, shift, options = {}) {
  return caesarEncrypt(ciphertext, -shift, options);
}

