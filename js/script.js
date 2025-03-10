// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu functionality
    const mobileMenu = document.getElementById("mobile-menu")
    const navMenu = document.querySelector(".nav-menu")

    if (mobileMenu) {
        mobileMenu.addEventListener("click", (e) => {
            e.stopPropagation() // Prevent this click from being caught by the document click listener
            mobileMenu.classList.toggle("active")
            navMenu.classList.toggle("active")
        })
    }

    // Close mobile menu when a nav item is clicked
    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", () => {
            if (mobileMenu.classList.contains("active")) {
                mobileMenu.classList.remove("active")
                navMenu.classList.remove("active")
            }
        })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove("active")
            navMenu.classList.remove("active")
        }
    })

    // Prevent clicks inside the menu from closing it
    navMenu.addEventListener("click", (e) => {
        e.stopPropagation()
    })

    // Typing animation for the title
    const titleElement = document.querySelector(".title-animation")
    const titleText = titleElement.textContent
    titleElement.textContent = ""

    let i = 0
    function typeWriter() {
        if (i < titleText.length) {
            titleElement.textContent += titleText.charAt(i)
            i++
            setTimeout(typeWriter, 100)
        }
    }

    // Start the typing animation after a short delay
    setTimeout(typeWriter, 500)

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })

    // Navbar background change on scroll
    const navbar = document.querySelector(".navbar")

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.style.background = "rgba(15, 23, 42, 0.95)"
        } else {
            navbar.style.background = "rgba(15, 23, 42, 0.8)"
        }
    })

    // Parallax effect for header
    const header = document.querySelector(".header")

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        header.style.backgroundPositionY = scrollPosition * 0.5 + "px"
    })

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".glass-card, .project-card, .section-title")

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top
            const screenPosition = window.innerHeight / 1.3

            if (elementPosition < screenPosition) {
                element.style.opacity = "1"
                element.style.transform = "translateY(0)"
            }
        })
    }

    // Set initial state for animated elements
    document.querySelectorAll(".glass-card, .project-card, .section-title").forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "all 0.6s ease"
    })

    // Run animation check on scroll
    window.addEventListener("scroll", animateOnScroll)

    // Run once on page load
    animateOnScroll()

    // Check if the device is not mobile
    const isNotMobile = window.matchMedia("(min-width: 768px)").matches;

    if (isNotMobile) {
        // Mouse indicator functionality
        const mouseIndicator = document.querySelector(".mouse-indicator")
        let mouseX = 0,
            mouseY = 0
        let indicatorX = 0,
            indicatorY = 0

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        })

        function animateMouseIndicator() {
            const dx = mouseX - indicatorX
            const dy = mouseY - indicatorY

            indicatorX += dx * 0.2
            indicatorY += dy * 0.2

            mouseIndicator.style.left = `${indicatorX}px`
            mouseIndicator.style.top = `${indicatorY}px`

            requestAnimationFrame(animateMouseIndicator)
        }

        animateMouseIndicator()

        // Scale up indicator when hovering over interactive elements
        const interactiveElements = document.querySelectorAll(
            "a, button, .menu-toggle, .project-card, .glass-card, .social-link, .social-icon"
        )

        interactiveElements.forEach((elem) => {
            elem.addEventListener("mouseenter", () => {
                mouseIndicator.style.transform = "scale(1.5)"
                mouseIndicator.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
            })

            elem.addEventListener("mouseleave", () => {
                mouseIndicator.style.transform = "scale(1)"
                mouseIndicator.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
            })
        })

        // Scroll indicator functionality
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const aboutSection = document.getElementById('about');

        if (scrollIndicator && aboutSection) {
            scrollIndicator.addEventListener('click', () => {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            });

            // Smooth transition for scroll indicator
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.transform = 'translate(-50%, 20px)';
                } else {
                    // Scrolling up
                    if (scrollTop < 100) {
                        scrollIndicator.style.opacity = '1';
                        scrollIndicator.style.transform = 'translate(-50%, 0)';
                    }
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });
        }
    } else {
        // Remove mouse indicator and scroll indicator for mobile
        const mouseIndicator = document.querySelector(".mouse-indicator");
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (mouseIndicator) {
            mouseIndicator.remove();
        }
        if (scrollIndicator) {
            scrollIndicator.remove();
        }
    }
})
