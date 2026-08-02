document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    // 5. Back to top button
    const backToTop = document.querySelector('.back-to-top');

    // 9. Parallax-like hero effect
    const heroContent = document.querySelector('.hero-content');

    // 8. Active nav link highlight
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar effect
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }

        // Hero parallax
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        // Active nav link
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
        });
    });

    // 3. Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Scroll animations & 7. Counter animation
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerText = Math.floor(progress * target) + '+';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = target + '+';
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stat number, trigger animation
                if (entry.target.classList.contains('stat-number')) {
                    if (!entry.target.dataset.animated) {
                        animateNumber(entry.target);
                        entry.target.dataset.animated = 'true';
                    }
                }
                // Optional: unobserve after showing
                // observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1
    });

    animateOnScrollElements.forEach(el => observer.observe(el));
    statNumbers.forEach(el => observer.observe(el)); // Some stats might not have animate-on-scroll

    // 6. Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically collect form data, e.g.:
        // const formData = new FormData(contactForm);
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    });
});
