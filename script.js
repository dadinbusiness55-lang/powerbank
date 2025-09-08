// === Слайдер ===
const slides = document.querySelectorAll(".slides img");
let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});
document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

showSlide(index);

// === Таймер 24 години ===
function startCountdown(hours) {
    let endTime = new Date().getTime() + hours * 60 * 60 * 1000;

    function updateCountdown() {
        let now = new Date().getTime();
        let distance = endTime - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "⏰ Акцію завершено!";
            return;
        }

        let h = Math.floor((distance / (1000 * 60 * 60)) % 24);
        let m = Math.floor((distance / (1000 * 60)) % 60);
        let s = Math.floor((distance / 1000) % 60);

        document.getElementById("countdown").innerHTML = `
            <div>${h} год</div>
            <div>${m} хв</div>
            <div>${s} сек</div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown(24);
