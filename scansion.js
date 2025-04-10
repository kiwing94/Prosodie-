function analyzeMeter() {
  const text = poemArea.value;
  const lines = text.split('\n');
  const meterPattern = lines.map(line => {
    const syllables = line.match(/[aeiouyåäö]+/gi);
    const stressPattern = syllables ? syllables.map((syl, index) => {
      return (index % 2 === 0) ? '˘' : '´';  // Basic alternating stress (for test)
    }).join(' ') : '';

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
