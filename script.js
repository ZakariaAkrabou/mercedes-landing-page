document.addEventListener('DOMContentLoaded', function() {
    // Hero section buttons
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', () => {
            heroButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    const navButtons = document.querySelectorAll('.nav-btn');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let isTransitioning = false;

   
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
            }, 300);

            
            currentSlide = 0;
            updateDots();
        });
    });

    


    //slider but not working xd
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        const activeCategory = document.querySelector('.nav-btn.active').dataset.category;
        const categorySlides = document.querySelectorAll(`.slider-slide[data-category="${activeCategory}"]`);
        
        if (currentSlide < categorySlides.length - 1) {
            isTransitioning = true;
            currentSlide++;
            updateSlides(activeCategory);
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        if (currentSlide > 0) {
            isTransitioning = true;
            currentSlide--;
            const activeCategory = document.querySelector('.nav-btn.active').dataset.category;
            updateSlides(activeCategory);
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlide = index;
            const activeCategory = document.querySelector('.nav-btn.active').dataset.category;
            updateSlides(activeCategory);
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        });
    });

    function updateSlides(category) {
        const categorySlides = document.querySelectorAll(`.slider-slide[data-category="${category}"]`);
        categorySlides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.transform = 'translateX(0)';
                slide.classList.add('active');
                slide.style.opacity = '1';
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.classList.remove('active');
                slide.style.opacity = '0';
            }
        });
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
});
