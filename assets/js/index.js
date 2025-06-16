// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- BACK-TO-TOP BUTTON ---
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Show the button if user has scrolled down 200px
        if (window.scrollY > 200) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        // Smoothly scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.hero-menu');

    hamburger.addEventListener('click', () => {
        // Toggle 'active' class on both hamburger and menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.hero-menu a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the element after it has been revealed
                observer.unobserve(entry.target);

            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    });

    // Observe each element with the reveal class
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

});