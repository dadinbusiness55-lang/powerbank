/* Слайдер */
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function showSlide(index) {
  slides.forEach((img, i) => {
    img.style.display = (i === index) ? "block" : "none";
  });
}
showSlide(slideIndex);

prev.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});
next.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});

/* Таймер с flip-анимацией */
function startCountdown(duration) {
  let timer = duration, hours, minutes, seconds;

  function updateDisplay(id, value) {
    const el = document.getElementById(id);
    if (el.textContent !== value) {
      el.textContent = value;
      el.classList.add("animate");
      setTimeout(() => el.classList.remove("animate"), 700);
    }
  }

  setInterval(() => {
    hours = String(parseInt(timer / 3600, 10)).padStart(2, "0");
    minutes = String(parseInt((timer % 3600) / 60, 10)).padStart(2, "0");
    seconds = String(timer % 60).padStart(2, "0");

    updateDisplay("hours", hours);
    updateDisplay("minutes", minutes);
    updateDisplay("seconds", seconds);

    if (--timer < 0) {
      timer = 0;
    }
  }, 1000);
}

// 24 часа = 86400 секунд
startCountdown(86400);
