function startCountdown(duration) {
  let timer = duration, hours, minutes, seconds;
  const flip = document.getElementById("flip-countdown");

  function update() {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    flip.innerHTML = `
      <div class="flip-unit">${hours.toString().padStart(2, '0')}<span class="flip-label">Год</span></div>
      <div class="flip-unit">${minutes.toString().padStart(2, '0')}<span class="flip-label">Хв</span></div>
      <div class="flip-unit">${seconds.toString().padStart(2, '0')}<span class="flip-label">Сек</span></div>
    `;

    if (--timer < 0) {
      timer = 0;
    }
  }

  update();
  setInterval(update, 1000);
}

// 24 часа = 86400 секунд
startCountdown(24 * 60 * 60);
