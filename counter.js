function countSyllables() {
  const text = poemArea.value;
  const lines = text.split('\n');
  const vowelGroups = /[aeiouyåäö]+/gi;

  let result = lines.map(line => {
    const syllables = (line.match(vowelGroups) || []).length;
    return `Line: "${line.trim()}" – ${syllables} syllable(s)`;
  });

  alert(result.join('\n'));
}
