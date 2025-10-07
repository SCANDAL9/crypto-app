// src/ciphers_library/analisisFrecuencia.js
export function frequencyAnalysis(text) {
  const counts = {};
  let total = 0;

  for (const ch of text) {
    // Ignorar espacios, tabulaciones y saltos de línea
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      continue;
    }
    
    counts[ch] = (counts[ch] || 0) + 1;
    total++;
  }

  const frequencies = Object.entries(counts)
    .map(([ch, count]) => ({
      ch, count,
      percentage: ((counts[ch] / total) * 100).toFixed(2) + '%',  
    }))
    .sort((a, b) => b.count - a.count);

  return {
    total,
    frequencies,
  };
}

