function analyzeMeter() {
  const text = poemArea.value;
  const lines = text.split('\n');
  const meterPattern = lines.map(line => {
    const syllables = line.match(/[aeiouyåäö]+/gi); // Matchar vokalgrupper för att identifiera stavelser
    const stressPattern = syllables ? syllables.map((syl, index) => {
      // Enkel heuristik: Om ordet är kort, kan vi anta att det är unstressed
      return (index % 2 === 0) ? '˘' : '´';  // Basic alternating stress (för test)
    }).join(' ') : '';

    // Identifiera versfoten
    let meterType = 'Unknown';
    if (stressPattern.match(/˘´/g)) {
      meterType = 'Iambic (˘´)';
    } else if (stressPattern.match(/´˘/g)) {
      meterType = 'Trochaic (´˘)';
    } else if (stressPattern.match(/´˘˘/g)) {
      meterType = 'Dactylic (´˘˘)';
    } else if (stressPattern.match(/˘˘´/g)) {
      meterType = 'Anapestic (˘˘´)';
    }

    return `${line.trim()} -> ${meterType}: ${stressPattern}`;
  });

  console.log(meterPattern);
  alert(meterPattern.join('\n'));
}
