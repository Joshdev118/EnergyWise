// slides should be a collection; sliderNav should be a single container element
const slides = Array.from(document.querySelectorAll('.hero .slide'));
const sliderNav = document.querySelector('.slider-nav');
const slider = document.querySelector('.hero .slider');
const prevBtn = document.querySelector('.arrow.prev');
const nextBtn = document.querySelector('.arrow.next');

let currentSlide = 0;
let slideCount = slides.length;
let interval = null;

// collect created dots so updateActiveDot can iterate them
const dots = [];
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');

    if (index === 0) dot.classList.add('active');

    // wire the dot to go to the corresponding slide
    dot.addEventListener('click', () => goToSlide(index));

    if (sliderNav) sliderNav.appendChild(dot);
    dots.push(dot);
});

function updateActiveDot() {
    // update the collected dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index){
    currentSlide = (index + slideCount) % slideCount;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    resetAnimations(slides[currentSlide]);
    updateActiveDot();
}

function resetAnimations(slide) {
    const content = slide.querySelector('.slide-content');
    if (content) {
        const clone = content.cloneNode(true);
        content.parentNode.replaceChild(clone, content);
    }

}

function startAutoSlide() {
    if (!interval){
        interval = setInterval(handleNextSlide, 5000);
    }
}

startAutoSlide();

function handleNextSlide() {
    goToSlide(currentSlide + 1);
}

function handlePrevSlide() {
    goToSlide(currentSlide - 1);
}

if (nextBtn) nextBtn.addEventListener('click', handleNextSlide);
if (prevBtn) prevBtn.addEventListener('click', handlePrevSlide);




const animatedElements = document.querySelectorAll('.animated-element');

// Ensure each animated element starts with the 'hidden' state so
// the transition runs when 'show' is added.
animatedElements.forEach(el => el.classList.add('hidden'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // add show (triggers animation)
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
        } else {
            // remove show and restore hidden so animation can run again
            entry.target.classList.remove('show');
            entry.target.classList.add('hidden');
        }
    });
}, { threshold: 0.25 }); // Trigger earlier when ~25% is visible

animatedElements.forEach(element => {
    observer.observe(element);
});