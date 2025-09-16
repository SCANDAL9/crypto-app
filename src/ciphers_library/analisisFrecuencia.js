export function frequencyAnalysis(text) {
  const counts = {};
  let total = 0;

  for (const ch of text) {
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

const paa = "hello world, word paths";
const result = frequencyAnalysis(paa);

console.log(result.frequencies);
