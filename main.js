// Main JavaScript for Abeevis Website

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            // Simple toggle for MVP
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--color-bg)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--color-border)';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Parallax Effect Logic
    const parallaxElements = document.querySelectorAll('.parallax-layer, .parallax-bg, .parallax-shape');

    // Only run on desktop/tablet for performance, disable on very small mobile if preferred
    // For now we run it but rely on CSS media queries to hide heavy elements if needed

    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed') || 0);

            // Calculate position relative to viewport
            const rect = el.parentElement.getBoundingClientRect();
            // We want the effect to be active when the parent section is visible
            // Standard parallax formula: offset = scroll * speed
            // Refined: offset based on parent center relative to screen center for localized effect

            const parentTop = rect.top + scrollY;
            const yPos = (scrollY - parentTop) * speed;

            el.style.transform = `translateY(${yPos}px)`;
        });

        requestAnimationFrame(updateParallax);
    }

    // Initialize Parallax
    if (parallaxElements.length > 0) {
        requestAnimationFrame(updateParallax);
    }

    // Curtain Footer Dynamic Height Adjustment
    const footer = document.querySelector('.site-footer');
    const main = document.querySelector('main');

    function adjustFooterReveal() {
        if (window.innerWidth > 768 && footer && main) {
            const footerHeight = footer.offsetHeight;
            main.style.marginBottom = `${footerHeight}px`;
            footer.style.height = `${footerHeight}px`; // Enforce consistency
        } else if (main) {
            main.style.marginBottom = '0px';
        }
    }

    window.addEventListener('resize', adjustFooterReveal);
    adjustFooterReveal(); // Initial run
});
