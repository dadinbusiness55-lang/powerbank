// Слайдер
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
// Автопрокрутка
setInterval(() => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateSlider();
}, 4000);

// Подсветка активного раздела
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav.tabs a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
