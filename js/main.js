document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Active Link Switching ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- 4. Simple Typewriter Effect ---
    // A subtle effect that re-types the title slightly when page loads
    const titleElement = document.getElementById('typewriter');
    const text = titleElement.innerText;
    titleElement.innerText = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            titleElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start delay
    setTimeout(typeWriter, 500);

    // --- 5. Scroll Reveal Animation (Intersection Observer) ---
    // Add css classes in JS so non-JS users still see content
    const revealElements = document.querySelectorAll('.section-header, .about-text, .about-image-container, .project-card, .contact-container');
    
    // Add initial styles dynamically so we don't pollute CSS for non-JS
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // --- 6. Form Submission (Added UX while Formspree processes) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const btn = contactForm.querySelector('button');
            
            // Loading state while redirecting to Formspree
            btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
        });
    }

    // --- 7. Live Terminal Animation (Simulating ML training cycles) ---
    const liveTrainEl = document.getElementById('terminal-live-train');
    if (liveTrainEl) {
        let epoch = 1;
        let progress = 0;
        let loss = 0.85;
        let accuracy = 0.52;

        function updateTerminalTraining() {
            if (progress < 100) {
                progress += 10;
                loss -= 0.07;
                accuracy += 0.045;
                if (loss < 0.05) loss = 0.03 + Math.random() * 0.02;
                if (accuracy > 0.98) accuracy = 0.98 + Math.random() * 0.01;
                
                const barLength = 15;
                const filledLength = Math.round((progress / 100) * barLength);
                const bar = '='.repeat(filledLength) + '>'.repeat(progress < 100 ? 1 : 0) + ' '.repeat(barLength - filledLength);
                
                liveTrainEl.innerHTML = `Epoch ${epoch}/5 [${bar}] - loss: ${loss.toFixed(4)} - acc: ${accuracy.toFixed(4)}`;
                setTimeout(updateTerminalTraining, 300);
            } else {
                // Done with one epoch
                const line = document.createElement('div');
                line.className = 'terminal-line success-msg';
                line.innerText = `[SUCCESS] Epoch ${epoch} finished. Model checkpoint saved.`;
                liveTrainEl.parentNode.insertBefore(line, liveTrainEl);
                
                // Reset for next epoch or loop back
                if (epoch < 5) {
                    epoch++;
                    progress = 0;
                    setTimeout(updateTerminalTraining, 1000);
                } else {
                    // All epochs done, reset terminal layout and repeat after a delay
                    setTimeout(() => {
                        // Clear injected epoch successes
                        const successes = liveTrainEl.parentNode.querySelectorAll('.success-msg');
                        successes.forEach(s => {
                            if (s.innerText.includes('checkpoint saved')) s.remove();
                        });
                        epoch = 1;
                        progress = 0;
                        loss = 0.85;
                        accuracy = 0.52;
                        updateTerminalTraining();
                    }, 5000);
                }
            }
        }
        setTimeout(updateTerminalTraining, 1500);
    }
});
