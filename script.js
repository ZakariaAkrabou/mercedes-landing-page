document.addEventListener('DOMContentLoaded', function() {
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
    let currentModelIndex = 0;
    let isTransitioning = false;

    // Category navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isTransitioning) return;
            
            const category = button.dataset.category;
            const currentActive = document.querySelector('.nav-btn.active');
            
            if (currentActive.dataset.category === category) return;
            
            isTransitioning = true;
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const currentSlide = document.querySelector('.slider-slide.active');
            const nextSlide = document.querySelector(`.slider-slide[data-category="${category}"]`);
            
            if (currentSlide) {
                currentSlide.style.transform = 'translateX(-100%)';
                currentSlide.style.opacity = '0';
                setTimeout(() => {
                    currentSlide.classList.remove('active');
                    currentSlide.style.transform = 'translateX(100%)';
                }, 300);
            }

            setTimeout(() => {
                nextSlide.classList.add('active');
                nextSlide.style.transform = 'translateX(0)';
                nextSlide.style.opacity = '1';
                isTransitioning = false;
                currentModelIndex = 0;
                updateDots();
            }, 300);
        });
    });

    // Model slider navigation
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        const activeCategory = document.querySelector('.nav-btn.active').dataset.category;
        const categorySlides = document.querySelectorAll(`.model-card[data-category="${activeCategory}"]`);
        
        if (currentModelIndex < Math.ceil(categorySlides.length / 3) - 1) {
            isTransitioning = true;
            currentModelIndex++;
            updateModelSlides(activeCategory);
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        if (currentModelIndex > 0) {
            isTransitioning = true;
            currentModelIndex--;
            const activeCategory = document.querySelector('.nav-btn.active').dataset.category;
            updateModelSlides(activeCategory);
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    });

    function updateModelSlides(category) {
        const cards = document.querySelectorAll(`.model-card[data-category="${category}"]`);
        const offset = currentModelIndex * -100;
        cards.forEach(card => {
            card.style.transform = `translateX(${offset}%)`;
        });
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentModelIndex);
        });
    }

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

    function updateProjectorSlider() {
        const offset = currentProjectorIndex * -100;
        projectorTrack.style.transform = `translateX(${offset}%)`;
        
   
        projectorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentProjectorIndex);
        });

        projectorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentProjectorIndex = index;
                updateProjectorSlider();
            });
        });
    }

   
});
