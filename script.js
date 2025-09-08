/* === СЛАЙДЕР === */
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(i) {
    if (i >= images.length) index = 0;
    else if (i < 0) index = images.length - 1;
    else index = i;

    slides.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

nextBtn.addEventListener("click", () => showSlide(index + 1));
prevBtn.addEventListener("click", () => showSlide(index - 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

// Автопрокрутка
setInterval(() => showSlide(index + 1), 5000);

showSlide(index);

/* === LIGHTBOX === */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const thumbnails = document.querySelectorAll(".thumbnails img");

let currentLightboxIndex = 0;

function openLightbox(i) {
    lightbox.style.display = "block";
    showLightboxImage(i);
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function showLightboxImage(i) {
    if (i >= images.length) currentLightboxIndex = 0;
    else if (i < 0) currentLightboxIndex = images.length - 1;
    else currentLightboxIndex = i;

    lightboxImg.src = images[currentLightboxIndex].src;

    thumbnails.forEach(thumb => thumb.classList.remove("active"));
    thumbnails[currentLightboxIndex].classList.add("active");
}

images.forEach((img, i) => img.addEventListener("click", () => openLightbox(i)));
thumbnails.forEach((thumb, i) => thumb.addEventListener("click", () => showLightboxImage(i)));
closeBtn.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showLightboxImage(currentLightboxIndex - 1));
lightboxNext.addEventListener("click", () => showLightboxImage(currentLightboxIndex + 1));

/* === ZOOM === */
const zoomContainer = document.querySelector(".zoom-container");

if (zoomContainer) {
    lightboxImg.addEventListener("mousemove", e => {
        const { left, top, width, height } = lightboxImg.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        lightboxImg.style.transformOrigin = `${x}% ${y}%`;
        lightboxImg.style.transform = "scale(1.5)";
    });

    lightboxImg.addEventListener("mouseleave", () => {
        lightboxImg.style.transform = "scale(1)";
    });

    // Тап на мобилке
    lightboxImg.addEventListener("click", () => {
        if (lightboxImg.style.transform === "scale(1.5)") {
            lightboxImg.style.transform = "scale(1)";
        } else {
            lightboxImg.style.transform = "scale(1.5)";
            lightboxImg.style.transformOrigin = "center center";
        }
    });
}

/* === SWIPE ДЛЯ МОБИЛЫ === */
let startX = 0;
slides.addEventListener("touchstart", e => startX = e.touches[0].clientX);
slides.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) showSlide(index + 1);
    if (endX - startX > 50) showSlide(index - 1);
});

/* === ТАЙМЕР АКЦИИ === */
function getNextMidnight() {
    let now = new Date();
    let tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    return tomorrow.getTime();
}

let countdownDate = getNextMidnight();

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

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

    // Последний час
    const lastHourMsg = document.getElementById("last-hour-msg");
    const secondsEl = document.getElementById("seconds");
    if (hours === 0) {
        lastHourMsg.textContent = "⏳ Поспіши, залишилось менше години!";
        lastHourMsg.style.display = "block";
        secondsEl.classList.add("blink");
    } else {
        lastHourMsg.style.display = "none";
        secondsEl.classList.remove("blink");
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
