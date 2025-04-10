function highlightSyllables() {
  const text = poemArea.value;
  const vowelGroupRegex = /[aeiouyåäö]+[^ \n\t.,;!?]*/gi;
  let colorIndex = 0;

  const colored = text.replace(/([^\n]*)/g, line => {
    return line.replace(vowelGroupRegex, match => {
      const color = khromaColors[colorIndex % khromaColors.length];
      colorIndex++;
      return `<span style="color:${color}">${match}</span>`;
    });
  });

  const display = document.createElement("div");
  display.innerHTML = colored.replace(/\n/g, "<br>");
  display.style.whiteSpace = "pre-wrap";
  display.style.padding = "1rem";
  display.style.marginTop = "1.5rem";
  display.style.backgroundColor = "#1b1b1b";
  display.style.border = "1px solid #333";
  display.style.borderRadius = "10px";
  display.style.fontSize = poemArea.style.fontSize;
  display.style.fontFamily = "Georgia, serif";

  const existing = document.getElementById("syllableOutput");
  if (existing) existing.remove();

  display.id = "syllableOutput";
  document.body.appendChild(display);
}
