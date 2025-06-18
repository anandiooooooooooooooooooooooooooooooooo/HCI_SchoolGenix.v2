document.addEventListener('DOMContentLoaded', function () {
    // =========================================================================
    // 1. IMPROVED HAMBURGER MENU
    // =========================================================================
    const hamburger = document.querySelector('.hamburger-menu');
    const heroMenu = document.querySelector('.hero-menu');
    const menuLinks = document.querySelectorAll('.hero-menu a');

    // Make sure all elements were found before adding event listeners
    if (hamburger && heroMenu && menuLinks.length > 0) {
        function openMenu() {
            hamburger.classList.add('active');
            heroMenu.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            heroMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }

        hamburger.addEventListener('click', () => {
            const isOpened = hamburger.classList.contains('active');
            if (isOpened) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && heroMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        heroMenu.addEventListener('click', (e) => {
            if (e.target === heroMenu) {
                closeMenu();
            }
        });
    }

    // =========================================================================
    // 2. REVEAL ON SCROLL ANIMATION
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // =========================================================================
    // 3. BACK TO TOP BUTTON
    // =========================================================================
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});