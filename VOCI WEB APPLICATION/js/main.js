// main.js - Global JavaScript for VOCI Web Application

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for all anchor links that point to a section ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight - 20; // Adjusted offset for fixed navbar and a little padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close the navbar toggler on small screens after clicking a link
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Add active class to navbar links based on scroll position
    const sections = document.querySelectorAll('section, header.hero-section'); // Include hero as a section
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const activateNavLink = () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + document.querySelector('.navbar').offsetHeight + 50; // Add some offset

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section ID or is the index.html link pointing to home
            if (link.getAttribute('href') === 'index.html' && currentSectionId === 'hero-section') {
                link.classList.add('active');
            } else if (link.getAttribute('href').includes(currentSectionId) && currentSectionId !== 'hero-section') {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    // Call on load to set initial active state
    activateNavLink();

    // Show/Hide Back to Top button on scroll
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show after scrolling 300px
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Handle preloader (initial state is handled in inline script in index.html)
    // This part is mainly for if the preloader logic was entirely external
    // const preloader = document.querySelector('.preloader');
    // if (preloader) {
    //     window.addEventListener('load', () => {
    //         preloader.classList.add('hidden'); // Fade out
    //         setTimeout(() => {
    //             preloader.style.display = 'none'; // Remove from DOM after fade
    //         }, 500); // Match CSS transition duration
    //     });
    // }

});
