// Modern Classic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20; // Add extra offset
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fix for section visibility on load
    window.addEventListener('load', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.position = 'relative';
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .cert-card, .stat-item, .soft-skill-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Typing effect for hero subtitle
    const typingText = document.querySelector('.typing-text');
    const textArray = [
        'Full-Stack Developer',
        'AI Enthusiast', 
        'Data Analytics Student',
        'Problem Solver',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;
    
    function typeText() {
        if (textIndex < textArray.length) {
            if (!isDeleting) {
                currentText = textArray[textIndex].substring(0, charIndex + 1);
                charIndex++;
                typingText.textContent = currentText;
                
                if (charIndex === textArray[textIndex].length) {
                    isDeleting = true;
                    setTimeout(typeText, 2000); // Pause before deleting
                    return;
                }
            } else {
                currentText = textArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
                typingText.textContent = currentText;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex++;
                    if (textIndex === textArray.length) {
                        textIndex = 0; // Loop back to start
                    }
                }
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect
    typeText();
    
    // Enhanced scroll animations with intersection observer
    const enhancedObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                if (entry.target.classList.contains('achievement-card')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animation = 'scaleIn 0.5s ease forwards';
                }
                
                // Counter animation for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, enhancedObserverOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.achievement-card, .project-card, .skill-item, .stat-number').forEach(el => {
        enhancedObserver.observe(el);
    });
    
    // Counter animation function
    function animateCounter(element) {
        const target = parseFloat(element.textContent);
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (target * easeOutCubic);
            
            if (element.textContent.includes('.')) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('.') ? '' : '+');
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Mohon lengkapi semua field!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Format email tidak valid!', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Show success message
                showNotification('Pesan berhasil dikirim! Saya akan segera menghubungi Anda.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Optional: Send email using mailto
                const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`);
                const body = encodeURIComponent(`
Nama: ${data.name}
Email: ${data.email}
Subjek: ${data.subject}

Pesan:
${data.message}

---
Dikirim dari Portfolio Website
                `);
                
                // You can uncomment this to open email client
                // window.open(`mailto:dharmavin7321@gmail.com?subject=${subject}&body=${body}`);
                
            }, 2000);
        });
    }
    
    // Enhanced parallax effect for hero section (fixed to prevent overlap)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const profileCard = document.querySelector('.profile-card');
        
        if (hero && profileCard) {
            // Only apply parallax to the profile card, not the entire hero section
            const rate = scrolled * -0.3; // Reduced intensity
            profileCard.style.transform = `translateY(${rate}px) rotate(5deg)`;
            
            // Add fade effect when scrolling
            const opacity = Math.max(1 - scrolled / (window.innerHeight * 0.8), 0.1);
            hero.style.opacity = opacity;
            
            // Disable parallax when hero is no longer visible
            if (scrolled > window.innerHeight) {
                hero.classList.add('parallax-disabled');
            } else {
                hero.classList.remove('parallax-disabled');
            }
        }
    });
    
    // Add CSS animations keyframes programmatically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .hero {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Dark mode toggle (optional feature)
    const createDarkModeToggle = () => {
        const toggle = document.createElement('button');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.className = 'dark-mode-toggle';
        toggle.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--secondary-color);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = toggle.querySelector('i');
            icon.className = document.body.classList.contains('dark-mode') 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
        });
        
        document.body.appendChild(toggle);
    };
    
    // Uncomment to enable dark mode toggle
    // createDarkModeToggle();
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for use in other scripts if needed
window.portfolioUtils = utils;
