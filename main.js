const poemArea = document.getElementById("poemArea");
const colorPicker = document.getElementById("colorPicker");
const fontSize = document.getElementById("fontSize");

colorPicker.addEventListener("input", () => {
  poemArea.style.color = colorPicker.value;
});

fontSize.addEventListener("input", () => {
  poemArea.style.fontSize = fontSize.value + "px";
});

function clearText() {
  poemArea.value = "";
}

function exportPoem() {
  const blob = new Blob([poemArea.value], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "proto_poem.txt";
  link.click();
}
