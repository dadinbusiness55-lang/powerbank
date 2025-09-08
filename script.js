// Слайдер
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        slide.style.display = (i === slideIndex) ? "block" : "none";
    });
}
showSlide(slideIndex);

prev.addEventListener("click", () => showSlide(slideIndex - 1));
next.addEventListener("click", () => showSlide(slideIndex + 1));

// Таймер (24 години)
function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    const countdown = document.getElementById("countdown");

    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        countdown.innerHTML = `
            <div>${hours < 10 ? "0" + hours : hours}</div>
            <div>${minutes < 10 ? "0" + minutes : minutes}</div>
            <div>${seconds < 10 ? "0" + seconds : seconds}</div>
        `;

        if (--timer < 0) timer = duration;
    }, 1000);
}

window.onload = () => {
    showSlide(slideIndex);
    startCountdown(24 * 60 * 60); // 24 часа
};
