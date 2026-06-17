const header = document.querySelector(".site-header");
const ambient = document.querySelector(".ambient-light");

window.addEventListener("scroll", () => {
  if (window.scrollY > 24) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});

let x = 0;
let y = 0;

function breatheLight() {
  x += 0.003;
  y += 0.002;

  const moveX = Math.sin(x) * 10;
  const moveY = Math.cos(y) * 8;

  ambient.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;

  requestAnimationFrame(breatheLight);
}

breatheLight();
