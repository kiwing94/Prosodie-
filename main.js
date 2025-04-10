// Get references to the text area and control elements
const poemArea = document.getElementById("poemArea");
const colorPicker = document.getElementById("colorPicker");
const fontSize = document.getElementById("fontSize");

// Change text color based on user input
colorPicker.addEventListener("input", () => {
  poemArea.style.color = colorPicker.value;
});

// Change font size based on user input
fontSize.addEventListener("input", () => {
  poemArea.style.fontSize = fontSize.value + "px";
});

// Function to clear the poem text area
function clearText() {
  poemArea.value = "";
}

// Function to export poem to a .txt file
function exportPoem() {
  const blob = new Blob([poemArea.value], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "proto_poem.txt";
  link.click();
}

// Function to analyze the poem
function analyzePoem() {
  // Get poem text
  const text = poemArea.value;

  // Split poem into lines
  const lines = text.split('\n');

  // Analyze meter (scansion)
  analyzeMeter(lines);

  // Analyze syllables
  countSyllables(lines);

  // Analyze rhyme pattern
  analyzeRhyme(lines);
}

// Function to count syllables in each line
function countSyllables(lines) {
  const vowelGroups = /[aeiouyåäö]+/gi;

  let syllableCount = lines.map(line => {
    const syllables = (line.match(vowelGroups) || []).length;
    return `Line: "${line.trim()}" – ${syllables} syllable(s)`;
  });

  alert(syllableCount.join('\n'));
}

// Function to analyze meter (scansion)
function analyzeMeter(lines) {
  const meterPattern = lines.map(line => {
    const syllables = line.match(/[aeiouyåäö]+/gi); // Match syllables
    const stressPattern = syllables ? syllables.map((syl, index) => {
      return (index % 2 === 0) ? '˘' : '´';  // Alternate basic stress
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

  alert(meterPattern.join('\n'));
}

// Function to analyze rhyme pattern (simplified)
function analyzeRhyme(lines) {
  const lastWords = lines.map(line => {
    const words = line.split(' ');
    return words[words.length - 1].toLowerCase();  // Get the last word of each line
  });

  let rhymePattern = '';
  lastWords.forEach((word, index) => {
    rhymePattern += word.match(/[aeiouyåäö]+$/gi) ? 'A' : 'B';  // Basic rhyme check
    if (index < lastWords.length - 1) rhymePattern += '-';
  });

  alert("Rhyme Pattern: " + rhymePattern);
}
