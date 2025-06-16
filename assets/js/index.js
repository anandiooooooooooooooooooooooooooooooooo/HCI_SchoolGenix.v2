document.addEventListener('DOMContentLoaded', function () {
    // =========================================================================
    // 1. HAMBURGER MENU TOGGLE
    // =========================================================================
    // Select the hamburger button and the menu from the DOM.
    const hamburger = document.querySelector('.hamburger-menu');
    const heroMenu = document.querySelector('.hero-menu');

    // Add a click event listener to the hamburger button.
    hamburger.addEventListener('click', () => {
        // When clicked, toggle the 'active' class on both the button and the menu.
        // This triggers the CSS animations for the 'X' and slides the menu in/out.
        hamburger.classList.toggle('active');
        heroMenu.classList.toggle('active');
    });

    // =========================================================================
    // 2. CLOSE MENU ON LINK CLICK
    // =========================================================================
    // Select all the links within the hero menu.
    const menuLinks = document.querySelectorAll('.hero-menu a');

    // Add a click event listener to each menu link.
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // When a link is clicked, remove the 'active' class to close the menu.
            // This is great for user experience on single-page sites.
            hamburger.classList.remove('active');
            heroMenu.classList.remove('active');
        });
    });

    // =========================================================================
    // 3. REVEAL ON SCROLL ANIMATION
    // =========================================================================
    // This is the logic for the .reveal-on-scroll animation you already had in your HTML.
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing the element once it's visible.
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // =========================================================================
    // 4. BACK TO TOP BUTTON
    // =========================================================================
    // Select the "Back to Top" button.
    const backToTopButton = document.getElementById('backToTop');

    // Show or hide the button based on scroll position.
    window.addEventListener('scroll', () => {
        // If the user has scrolled down more than 300 pixels, show the button.
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            // Otherwise, hide it.
            backToTopButton.classList.remove('show');
        }
    });

    // Add a click event listener to scroll to the top of the page.
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For a smooth scrolling animation
        });
    });
});