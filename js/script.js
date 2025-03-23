// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');

        // Toggle Burger Animation
        burger.classList.toggle('active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');

            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Typing effect - improved
    const typingElement = document.querySelector('.typing');
    const words = ['Web Developer', 'Designer', 'Freelancer', 'App Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        // Current text based on whether deleting or typing
        const text = currentWord.substring(0, charIndex);
        typingElement.textContent = text;

        // Speed based on whether deleting or typing
        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2; // Faster when deleting
            charIndex--;
        } else {
            charIndex++;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            isEnd = true;
            isDeleting = true;
            typeSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start the typing effect
    setTimeout(typeEffect, 1000);

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');

    let isScrolling = false; // Track if the user is scrolling

    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (window.scrollY > 50) { // Adjust the value (50) to control when the indicator disappears
            if (!isScrolling) {
                scrollIndicator.classList.add('hidden');
                isScrolling = true; // Set scrolling state to true
            }
        } else {
            if (isScrolling) {
                scrollIndicator.classList.remove('hidden');
                isScrolling = false; // Reset scrolling state when back at the top
            }
        }

        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Header shadow on scroll
        const header = document.querySelector('header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Animate skill bars on scroll
        const skillSection = document.querySelector('.skills');
        const skillBars = document.querySelectorAll('.skill-progress');

        if (isInViewport(skillSection)) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = width;
            });
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.about-content, .skills-content, .project-card, .contact-content, .section-header');

    function animateOnScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }

    // Initial check for elements in viewport
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
});