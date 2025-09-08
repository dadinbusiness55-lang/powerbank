// Слайдер
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === n) slide.classList.add("active");
  });
}

function changeSlide(dir) {
  slideIndex += dir;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
}

prev.addEventListener("click", () => changeSlide(-1));
next.addEventListener("click", () => changeSlide(1));

showSlide(slideIndex);

// Таймер (24 години)
let countdown = 24 * 60 * 60; // 24 часа в секундах
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateTimer() {
  let h = Math.floor(countdown / 3600);
  let m = Math.floor((countdown % 3600) / 60);
  let s = countdown % 60;

  hoursEl.textContent = h.toString().padStart(2, "0");
  minutesEl.textContent = m.toString().padStart(2, "0");
  secondsEl.textContent = s.toString().padStart(2, "0");

  if (countdown > 0) countdown--;
}

setInterval(updateTimer, 1000);
updateTimer();
