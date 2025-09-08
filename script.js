let slideIndex = 0;
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const totalSlides = images.length;

document.querySelector(".next").addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

function updateSlider() {
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Автопрокрутка каждые 4 секунды
setInterval(() => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateSlider();
}, 4000);
