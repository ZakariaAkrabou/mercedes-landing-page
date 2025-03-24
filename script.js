document.addEventListener('DOMContentLoaded', function () {
    // Hero section buttons
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', () => {
            heroButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Models Section Slider
    const navButtons = document.querySelectorAll('.nav-btn');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlideIndex = 0;
    let isTransitioning = false;

    // Function to show the current slide
    function showSlide(index) {
        if (isTransitioning) return;

        isTransitioning = true;

        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(100%)';
            slide.classList.remove('active');
        });

        // Show the current slide
        setTimeout(() => {
            slides[index].style.opacity = '1';
            slides[index].style.transform = 'translateX(0)';
            slides[index].classList.add('active');
            isTransitioning = false;
        }, 300);

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        }
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            showSlide(currentSlideIndex);
        }
    });

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
        });
    });

    // Category navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isTransitioning) return;

            const category = button.dataset.category;
            const currentActive = document.querySelector('.nav-btn.active');

            if (currentActive.dataset.category === category) return;

            isTransitioning = true;

            // Remove active class from all nav buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Hide the current slide
            const currentSlide = document.querySelector('.slider-slide.active');
            if (currentSlide) {
                currentSlide.style.opacity = '0';
                currentSlide.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    currentSlide.classList.remove('active');
                }, 300);
            }

            // Show the new slide for the selected category
            const nextSlide = document.querySelector(`.slider-slide[data-category="${category}"]`);
            setTimeout(() => {
                nextSlide.style.opacity = '1';
                nextSlide.style.transform = 'translateX(0)';
                nextSlide.classList.add('active');
                isTransitioning = false;
                currentSlideIndex = 0; // Reset slide index for the new category
                showSlide(currentSlideIndex); // Show the first slide of the new category
            }, 300);
        });
    });

    // Initialize the first slide
    showSlide(currentSlideIndex);

    // Projectors Section Slider
    const projectorTrack = document.querySelector('.projectors-track');
    const projectorCards = document.querySelectorAll('.projectors-card');
    const projectorPrevBtn = document.querySelector('.projectors-section .slider-nav.prev');
    const projectorNextBtn = document.querySelector('.projectors-section .slider-nav.next');
    let currentProjectorIndex = 0;
    const cardsToShow = 3;
    const totalSlides = Math.ceil(projectorCards.length / cardsToShow);

    function updateProjectorSlider() {
        const offset = currentProjectorIndex * -100;
        projectorTrack.style.transform = `translateX(${offset}%)`;
    }

    projectorPrevBtn.addEventListener('click', () => {
        if (currentProjectorIndex > 0) {
            currentProjectorIndex--;
            updateProjectorSlider();
        }
    });

    projectorNextBtn.addEventListener('click', () => {
        if (currentProjectorIndex < totalSlides - 1) {
            currentProjectorIndex++;
            updateProjectorSlider();
        }
    });

    updateProjectorSlider();

    const projectorDots = document.querySelectorAll('.projectors-dots .dot');

    function updateProjectorDots() {
        projectorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentProjectorIndex);
        });
    }

    projectorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProjectorIndex = index;
            updateProjectorSlider();
            updateProjectorDots();
        });
    });
});