// Слайдер
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[n].classList.add("active");
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

// ✅ Flip таймер
function createFlip(label) {
  return `
    <div class="flip-card" data-label="${label}">
      <div class="digit top">00</div>
      <div class="digit bottom">00</div>
    </div>
  `;
}

function updateFlip(card, newValue) {
  const top = card.querySelector(".top");
  const bottom = card.querySelector(".bottom");
  const current = parseInt(top.textContent);

  if (newValue !== current) {
    card.classList.remove("animate");
    void card.offsetWidth; // reset animation
    card.classList.add("animate");

    setTimeout(() => {
      top.textContent = newValue.toString().padStart(2, "0");
      bottom.textContent = newValue.toString().padStart(2, "0");
    }, 250);
  }
}

function startCountdown(duration) {
  let timer = duration;

  const countdown = document.getElementById("countdown");
  countdown.innerHTML = `
    ${createFlip("Години")}
    ${createFlip("Хвилини")}
    ${createFlip("Секунди")}
  `;

  const [hoursCard, minutesCard, secondsCard] =
    countdown.querySelectorAll(".flip-card");

  setInterval(() => {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer % 3600) / 60);
    let seconds = timer % 60;

    updateFlip(hoursCard, hours);
    updateFlip(minutesCard, minutes);
    updateFlip(secondsCard, seconds);

    if (--timer < 0) timer = duration;
  }, 1000);
}

window.onload = () => {
  startCountdown(24 * 60 * 60); // 24 часа
};
