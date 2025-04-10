function analyzeRhyme() {
  const text = poemArea.value;
  const lines = text.split('\n');
  const lastWords = lines.map(line => {
    const words = line.split(' ');
    return words[words.length - 1];  // Get the last word of the line
  });

  // A very simple rhyme detection (just compares last words)
  const rhymePattern = lastWords.map(word => {
    // This is a very simplified method of checking rhyme
    return word.match(/[aeiouyåäö]+$/gi).join('') || word;  // Simplified rhyme check
  });

  alert(rhymePattern.join(' '));
}
