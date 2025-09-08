// Таймер с flip-анимацией
function createFlipCard(label) {
  return `
    <div class="flip-card" data-label="${label}">
      <div class="top">00</div>
      <div class="bottom">00</div>
      <span class="label">${label}</span>
    </div>
  `;
}

function updateFlipCard(card, newNumber) {
  const top = card.querySelector(".top");
  const bottom = card.querySelector(".bottom");
  const current = parseInt(top.textContent);

  if (newNumber !== current) {
    // Запуск анимации
    card.classList.remove("animate");
    void card.offsetWidth; // хак для перезапуска
    card.classList.add("animate");

    setTimeout(() => {
      top.textContent = newNumber.toString().padStart(2, "0");
      bottom.textContent = newNumber.toString().padStart(2, "0");
    }, 250);
  }
}

function startCountdown(duration) {
  let timer = duration;

  const countdown = document.getElementById("countdown");
  countdown.innerHTML = `
    ${createFlipCard("Години")}
    ${createFlipCard("Хвилини")}
    ${createFlipCard("Секунди")}
  `;

  const [hoursCard, minutesCard, secondsCard] =
    countdown.querySelectorAll(".flip-card");

  setInterval(() => {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer % 3600) / 60);
    let seconds = timer % 60;

    updateFlipCard(hoursCard, hours);
    updateFlipCard(minutesCard, minutes);
    updateFlipCard(secondsCard, seconds);

    if (--timer < 0) timer = duration;
  }, 1000);
}

window.onload = () => {
  startCountdown(24 * 60 * 60); // 24 часа
};
