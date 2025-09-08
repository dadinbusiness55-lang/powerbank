// Слайдер
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function showSlide(n) {
  slideIndex = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.style.display = i === slideIndex ? "block" : "none");
}
prev.addEventListener("click", () => showSlide(slideIndex - 1));
next.addEventListener("click", () => showSlide(slideIndex + 1));
showSlide(0);

// Flipdown таймер
document.addEventListener("DOMContentLoaded", () => {
  let end = new Date().getTime() + (24 * 60 * 60 * 1000);
  new FlipDown(Math.floor(end / 1000)).start();
});
