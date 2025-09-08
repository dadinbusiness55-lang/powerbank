// === Получаем дату следующей полуночи ===
function getNextMidnight() {
  let now = new Date();
  let tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

let countdownDate = getNextMidnight();

// === Обновление таймера ===
function updateCountdown() {
  let now = new Date().getTime();
  let distance = countdownDate - now;

  if (distance < 0) {
    countdownDate = getNextMidnight();
    distance = countdownDate - now;
  }

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  flipDigit("hours", hours);
  flipDigit("minutes", minutes);
  flipDigit("seconds", seconds);

  const lastHourMsg = document.getElementById("last-hour-msg");
  if (hours === 0) {
    lastHourMsg.textContent = "⏳ Поспіши, залишилось менше години!";
    lastHourMsg.style.display = "block";
  } else {
    lastHourMsg.style.display = "none";
  }
}

// === Анимация перелистывания ===
function flipDigit(id, newNumber) {
  const digit = document.getElementById(id);
  const currentNumber = parseInt(digit.textContent, 10);

  if (newNumber !== currentNumber) {
    digit.classList.add("flip");
    setTimeout(() => {
      digit.textContent = newNumber.toString().padStart(2, "0");
      digit.classList.remove("flip");
    }, 300);
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
