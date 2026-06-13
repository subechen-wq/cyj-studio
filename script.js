const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");

let ripples = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function addRipple(x, y) {
  ripples.push({
    x: x,
    y: y,
    radius: 0,
    alpha: 0.55,
    speed: 2.3
  });

  if (ripples.length > 12) {
    ripples.shift();
  }
}

window.addEventListener("mousemove", function(e) {
  if (Math.random() > 0.9) {
    addRipple(e.clientX, e.clientY);
  }
});

window.addEventListener("click", function(e) {
  addRipple(e.clientX, e.clientY);
});

function animateRipples() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach(function(ripple, index) {
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255," + ripple.alpha + ")";
    ctx.lineWidth = 2;
    ctx.stroke();

    ripple.radius += ripple.speed;
    ripple.alpha -= 0.004;

    if (ripple.alpha <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(animateRipples);
}

animateRipples();

const glow = document.querySelector(".mouse-glow");
const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {

  const rect = hero.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  glow.style.left = `${x}px`;
  glow.style.top = `${y}px`;

  glow.style.opacity = "1";
});

hero.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});
