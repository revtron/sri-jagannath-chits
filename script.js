document.addEventListener('DOMContentLoaded', function() {
    // Header scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            el.textContent = current + '+';
            
            if (progress < 1) requestAnimationFrame(update);
        }
        
        requestAnimationFrame(update);
    }

    const heroStats = document.querySelector('.hero-stats');
    let countersAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach(stat => {
                    if (stat.getAttribute('data-target')) animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });

    if (heroStats) statsObserver.observe(heroStats);

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(function() {
                alert('Thank you for contacting us!');
                contactForm.reset();
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.disabled = false;
            }, 1500);
        });
    }

    // Scroll animations
    const elements = document.querySelectorAll('.service-card, .plan-card, .cert-display-card, .step-box, .value-card, .team-card');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
});