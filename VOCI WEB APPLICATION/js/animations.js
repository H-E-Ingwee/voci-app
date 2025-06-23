// animations.js - Custom JavaScript for managing animations

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for triggering animations when elements come into view
    // Using Animate.css classes
    const animatedElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine animation class from data-attribute or default to fadeIn
                const animationClass = entry.target.dataset.animation || 'animate__fadeIn';
                entry.target.classList.add(animationClass);
                entry.target.style.opacity = '1'; // Make sure element becomes visible
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        // Elements that are not part of the hero section should initially be transparent
        // to allow the animation to fade them in. Hero elements are handled separately
        // to ensure immediate visibility on page load before their specific animations.
        if (!element.closest('.hero-section')) {
            element.style.opacity = '0';
        }
        observer.observe(element);
    });

    // Specific animation for hero section elements on page load
    // These elements should animate in immediately after page load, not on scroll
    const heroElements = document.querySelectorAll('.hero-section .animate__animated');
    heroElements.forEach(element => {
        element.style.opacity = '0'; // Ensure they are hidden initially
    });

    window.addEventListener('load', () => {
        // Trigger hero animations after a small delay to ensure CSS is applied
        setTimeout(() => {
            document.querySelector('.hero-section h1').classList.add('animate__fadeInDown');
            document.querySelector('.hero-section h1').style.opacity = '1';

            const heroLead = document.querySelector('.hero-section .lead');
            if (heroLead) {
                heroLead.classList.add('animate__fadeInUp', 'animate__delay-1s');
                heroLead.style.opacity = '1';
            }

            const heroButtons = document.querySelector('.hero-section .d-flex.gap-3');
            if (heroButtons) {
                heroButtons.classList.add('animate__fadeInUp', 'animate__delay-2s');
                heroButtons.style.opacity = '1';
            }

            const scrollDownIcon = document.querySelector('.scroll-down i');
            if (scrollDownIcon) {
                scrollDownIcon.classList.add('animate__bounce', 'animate__infinite');
            }

        }, 100); // Small delay
    });

    // Add animation for the back-to-top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        // The 'show' class will control its visibility via opacity in main.css
        // The animate.css classes will add a subtle entry/exit animation.
        backToTopButton.dataset.animation = 'animate__fadeInUp'; // Default entry animation
    }
});
