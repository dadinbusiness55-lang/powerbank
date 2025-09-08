// ✅ Слайдер
let slideIndex = 0;
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const totalSlides = images.length;
const dots = document.querySelectorAll(".dot");

function updateSlider() {
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        slideIndex = index;
        updateSlider();
    });
});

// Автопрокрутка
setInterval(() => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateSlider();
}, 4000);

updateSlider();


// ✅ Lightbox (fullscreen просмотр с превью + стрелки)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const thumbs = document.querySelectorAll(".thumbnails img");

let currentImgIndex = 0;

// Открыть фото из слайдера
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        slideIndex = index; // синхронизация
        currentImgIndex = index;
        lightbox.style.display = "flex";
        updateLightbox();
    });
});

// Закрыть
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Клик вне фото — закрыть
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Следующее фото
nextBtn.addEventListener("click", () => {
    currentImgIndex = (currentImgIndex + 1) % totalSlides;
    slideIndex = currentImgIndex;
    updateLightbox();
    updateSlider();
});

// Предыдущее фото
prevBtn.addEventListener("click", () => {
    currentImgIndex = (currentImgIndex - 1 + totalSlides) % totalSlides;
    slideIndex = currentImgIndex;
    updateLightbox();
    updateSlider();
});

// Клик по превью
thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        currentImgIndex = index;
        slideIndex = index;
        updateLightbox();
        updateSlider();
    });
});

function updateLightbox() {
    lightboxImg.src = images[currentImgIndex].src;
    thumbs.forEach((thumb, i) => {
        thumb.classList.remove("active");
        if (i === currentImgIndex) {
            thumb.classList.add("active");
        }
    });
}

// Управление с клавиатуры
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") {
            nextBtn.click();
        } else if (e.key === "ArrowLeft") {
            prevBtn.click();
        } else if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    }
});


// ✅ Zoom с движением фото (на ПК)
const zoomContainer = document.querySelector(".zoom-container");
const zoomImg = document.getElementById("lightbox-img");

zoomContainer.addEventListener("mousemove", function(e) {
    const rect = zoomContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    zoomImg.style.transformOrigin = `${x}% ${y}%`;
    zoomImg.style.transform = "scale(2)";
});

zoomContainer.addEventListener("mouseleave", function() {
    zoomImg.style.transformOrigin = "center center";
    zoomImg.style.transform = "scale(1)";
});


// ✅ На мобилках вместо зума — тап для увеличения
function isMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

if (isMobile()) {
    zoomContainer.addEventListener("click", () => {
        if (zoomImg.style.transform === "scale(2)") {
            zoomImg.style.transform = "scale(1)";
        } else {
            zoomImg.style.transform = "scale(2)";
            zoomImg.style.transformOrigin = "center center";
        }
    });
}


// ✅ Свайпы на мобильных
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
        // свайп вправо → предыдущее фото
        currentImgIndex = (currentImgIndex - 1 + totalSlides) % totalSlides;
        slideIndex = currentImgIndex;
        updateLightbox();
        updateSlider();
    } else if (swipeDistance < -50) {
        // свайп влево → следующее фото
        currentImgIndex = (currentImgIndex + 1) % totalSlides;
        slideIndex = currentImgIndex;
        updateLightbox();
        updateSlider();
    }
}
