// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =============================================
// MOBILE NAV TOGGLE
// =============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
            }
        });
    });
}

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// =============================================
// TESTIMONIAL CAROUSEL (Auto + Manual)
// =============================================
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

let currentIndex = 0;
let totalSlides = 0;
let slidesPerView = 1;
let autoSlideInterval = null;
const autoSlideDelay = 4000; // 4 seconds

function getSlidesPerView() {
    if (window.innerWidth >= 992) return 2;
    return 1;
}

function updateCarousel() {
    slidesPerView = getSlidesPerView();
    const cards = track.querySelectorAll('.testimonial-card');
    totalSlides = cards.length;

    // Ensure currentIndex is within bounds
    if (currentIndex > totalSlides - slidesPerView) {
        currentIndex = Math.max(0, totalSlides - slidesPerView);
    }

    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 24;
    const slideWidth = cardWidth + gap;
    const offset = currentIndex * slideWidth;

    track.style.transform = `translateX(-${offset}px)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    const totalDots = Math.ceil(totalSlides / slidesPerView);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function createDots() {
    const cards = track.querySelectorAll('.testimonial-card');
    totalSlides = cards.length;
    const totalDots = Math.ceil(totalSlides / getSlidesPerView());

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    const totalDots = Math.ceil(totalSlides / getSlidesPerView());
    if (index < 0) index = totalDots - 1;
    if (index >= totalDots) index = 0;
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    const totalDots = Math.ceil(totalSlides / getSlidesPerView());
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    const totalDots = Math.ceil(totalSlides / getSlidesPerView());
    goToSlide(currentIndex - 1);
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

function resetAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
}

// Initialize carousel
function initCarousel() {
    createDots();
    currentIndex = 0;
    updateCarousel();
    startAutoSlide();
}

// Handle resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            createDots();
            currentIndex = 0;
            updateCarousel();
            resetAutoSlide();
        } else {
            updateCarousel();
        }
    }, 200);
});

// Event listeners for buttons
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prevSlide(); resetAutoSlide(); }
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoSlide(); }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initCarousel);

// =============================================
// CONTACT FORM HANDLER
// =============================================
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        if (this.action.includes('YOUR_FORMSPREE_ID')) {
            e.preventDefault();
            const btn = this.querySelector('.btn');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.background = '#8FAD9A';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '#C97B63';
                this.reset();
            }, 2200);
        }
    });
}

// =============================================
// CONSOLE CHECK
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    // Check for placeholder links
    document.querySelectorAll('a[href*="XXXXXXXXXX"], a[href*="tiwa@email.com"]').forEach(link => {
        console.warn('⚠️ Placeholder detected: ' + link.href + ' (update before going live)');
    });

    console.log('✨ Tiwa Adedeji · Magazine Style Portfolio ready!');
});