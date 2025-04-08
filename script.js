
const verses = [
  "Floating fire,\nspiraling code,\nrunes in the dark,\nsinging in pulses.\nThe ship of verse,\ntranscends time,\nmoves in silence.",
  "Sumerian light,\nshining names,\nsouls in cycles,\ntones from the deep.\nEternal flow,\nbetween tongues,\nbeyond the edge of form.",
  "Fluxus magic,\nverses watching,\nbetween worlds,\nsymbols ringing.\nWithin the rite,\ncode is bound,\nto the song’s core."
];

function generateVerse() {
  const verseBox = document.getElementById("verseBox");
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  verseBox.textContent = randomVerse;
}

function loadVersum() {
  fetch('versum.txt')
    .then(response => response.text())
    .then(text => {
      document.getElementById("versumBox").textContent = text;
    })
    .catch(error => {
      document.getElementById("versumBox").textContent = "Could not load versum.txt.";
    });
}

// Load a list of files from the "fluxus" folder (assumes static files named fluxus1.txt, fluxus2.txt, etc.)
function loadFluxusFile(filename) {
  fetch('fluxus/' + filename)
    .then(response => response.text())
    .then(text => {
      document.getElementById("fluxusBox").textContent = text;
    })
    .catch(error => {
      document.getElementById("fluxusBox").textContent = "Could not load file: " + filename;
    });
}

// STARFIELD
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

// THEME SWITCHER
function switchTheme(theme) {
  const root = document.documentElement;

  if (theme === 'sun') {
    root.style.setProperty('--bg-color', '#fff8e7');
    root.style.setProperty('--text-color', '#2c2c2c');
    root.style.setProperty('--accent-color', '#ff9900');
    root.style.setProperty('--box-bg', '#fffdf7');
    root.style.setProperty('--box-shadow', '0 0 10px #ffcc77aa');
  } else if (theme === 'dark') {
    root.style.setProperty('--bg-color', '#000');
    root.style.setProperty('--text-color', '#e6e6e6');
    root.style.setProperty('--accent-color', '#ffd700');
    root.style.setProperty('--box-bg', '#111');
    root.style.setProperty('--box-shadow', '0 0 12px #ffd70055');
  } else if (theme === 'temple') {
    root.style.setProperty('--bg-color', '#0e1a1a');
    root.style.setProperty('--text-color', '#d0ffd6');
    root.style.setProperty('--accent-color', '#a2ffcc');
    root.style.setProperty('--box-bg', '#112222');
    root.style.setProperty('--box-shadow', '0 0 12px #00ffaa55');
  }
}
