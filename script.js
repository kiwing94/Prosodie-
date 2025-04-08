const verses = [
  "Flytande eld,\nvirvlande kod,\nrunor i mörkret,\nsjunger i pulser.\nDiktens skepp,\ntranscenderar tid,\nrör sig i tystnad.",
  "Sumeriskt ljus,\nstrålande namn,\nsjälar i kretslopp,\ntoner från djupet.\nEvig flöde,\nmellan språk,\nbortom formernas kant.",
  "Flödesmagi,\nverser som vakar,\nmellan världar,\nklingar symboler.\nInom ritual,\nbindas kod,\ntill sångens hjärta."
];

function generateVerse() {
  const verseBox = document.getElementById("verseBox");
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  verseBox.textContent = randomVerse;
}

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let stars = Array(200).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5,
  speed: Math.random() * 0.5 + 0.2
}));

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();
