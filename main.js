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

    // Initialize Floating Bees
    initFloatingBees();

    function initFloatingBees() {
        const container = document.getElementById('bees-container');
        if (!container) return;

        const beeCount = 8; // Number of bees
        const beeSVG = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Wings -->
                <path d="M5 8C5 8 0 4 2 3C4 2 8 6 8 10" fill="currentColor" opacity="0.6"/>
                <path d="M19 8C19 8 24 4 22 3C20 2 16 6 16 10" fill="currentColor" opacity="0.6"/>
                <!-- Body -->
                <ellipse cx="12" cy="12" rx="5" ry="8" fill="currentColor" />
                <!-- Stripes -->
                <path d="M8.5 10H15.5" stroke="var(--color-bg)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M8.5 13H15.5" stroke="var(--color-bg)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M9.5 16H14.5" stroke="var(--color-bg)" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Antennae -->
                <path d="M10 5L8 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M14 5L16 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `;

        for (let i = 0; i < beeCount; i++) {
            const bee = document.createElement('div');
            bee.className = 'bee';
            bee.innerHTML = beeSVG;

            // Random Positioning
            // Keep them somewhat distributed but random
            // Left: 5% to 95%
            // Top: 10% to 90%
            const left = 5 + Math.random() * 90;
            const top = 10 + Math.random() * 80;

            // Random scales for depth perception (0.6 to 1.2)
            const scale = 0.6 + Math.random() * 0.6;

            // Random animation props
            const duration = 4 + Math.random() * 4; // 4s to 8s
            const delay = Math.random() * 5; // 0s to 5s
            // Random rotation start
            const rotation = Math.random() * 360;

            bee.style.left = `${left}%`;
            bee.style.top = `${top}%`;
            bee.style.transform = `scale(${scale})`;

            // Apply animation to SVG
            const svg = bee.querySelector('svg');
            if (svg) {
                if (i >= beeCount - 2) {
                    // Explorer Bee: Special animation defined in CSS
                    bee.classList.add('bee-explorer');
                    svg.style.animation = 'none'; // Clear inline style if any, let CSS class win
                } else {
                    // Standard Bee: Random float
                    const newDuration = 10 + Math.random() * 10;
                    svg.style.animationDuration = `${newDuration}s`;
                    svg.style.animationDelay = `-${Math.random() * 20}s`;
                }
            }

            container.appendChild(bee);
        }
    }
});


