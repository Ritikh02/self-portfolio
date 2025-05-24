// Portfolio Interactive Script - Modern Responsive Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initSmoothScrolling();
    initResponsiveFeatures();
    initParallaxEffects();
    initContactAnimations();
    initThemeEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for backdrop effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (mobile optimization)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (!isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        'Full Stack Developer',
        'React.js Enthusiast',
        'Problem Solver',
        'Tech Innovator',
        'Code Craftsman'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe individual skill categories and stat items
    document.querySelectorAll('.skill-category, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill bars
function initSkillBars() {
    // This will be triggered by scroll animations
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth;
            
            // Add percentage display
            const percentage = document.createElement('span');
            percentage.textContent = targetWidth;
            percentage.style.cssText = `
                position: absolute;
                right: 5px;
                top: -25px;
                font-size: 12px;
                color: var(--neon-blue);
                font-weight: bold;
            `;
            bar.style.position = 'relative';
            bar.appendChild(percentage);
            
            // Animate percentage counter
            animatePercentage(percentage, targetWidth);
        }, index * 200);
    });
}

function animatePercentage(element, target) {
    const targetNum = parseInt(target);
    let current = 0;
    const increment = targetNum / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
            current = targetNum;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 50);
}

// Animate counters in stats
function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (!numberElement) return;
    
    const target = numberElement.textContent;
    const targetNum = parseInt(target.replace(/\D/g, ''));
    
    if (isNaN(targetNum)) return;
    
    let current = 0;
    const increment = targetNum / 30;
    const suffix = target.replace(/\d/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
            current = targetNum;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + suffix;
    }, 50);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Responsive features and optimizations
function initResponsiveFeatures() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResponsiveChanges();
        }, 250);
    });
    
    function handleResponsiveChanges() {
        const isMobile = window.innerWidth <= 768;
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');
        
        // Reset mobile menu on desktop
        if (!isMobile && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navbar.style.transform = 'translateY(0)';
        }
        
        // Adjust animations for mobile
        adjustAnimationsForDevice();
    }
}

function adjustAnimationsForDevice() {
    const isMobile = window.innerWidth <= 768;
    const isLowPower = navigator.hardwareConcurrency <= 4;
    
    // Reduce animations on low-power devices
    if (isMobile || isLowPower) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        
        // Disable resource-intensive animations
        const bgAnimation = document.querySelector('.bg-animation');
        if (bgAnimation) {
            bgAnimation.style.opacity = '0.5';
        }
    }
}

// Parallax effects for enhanced visual experience
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only enable parallax on desktop for performance
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallaxUpdate);
    }
}

// Contact section animations
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-info-item');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Stagger animation for contact items
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('slide-in-left');
    });
    
    // Social links hover effects
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact form interactions (if needed in future)
    initContactForm();
}

function initContactForm() {
    // Placeholder for future contact form functionality
    const contactButtons = document.querySelectorAll('.btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Theme and visual effects
function initThemeEffects() {
    // Dynamic cursor effect for desktop
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
    
    // Keyboard navigation support
    initKeyboardNavigation();
    
    // Performance monitoring
    monitorPerformance();
}

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-inner"></div>';
    document.body.appendChild(cursor);
    
    // Cursor styles
    cursor.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        background: var(--neon-blue);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        });
    });
}

function initKeyboardNavigation() {
    // Focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--neon-blue)';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'H' to go to home
        if (e.key === 'h' || e.key === 'H') {
            if (!e.ctrlKey && !e.altKey) {
                document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
}

function monitorPerformance() {
    // Performance optimization based on device capabilities
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        // Reduce animations on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            
            // Disable background animations
            const bgAnimation = document.querySelector('.bg-animation');
            if (bgAnimation) {
                bgAnimation.style.display = 'none';
            }
        }
    }
    
    // Memory usage optimization
    let animationFrameId;
    const optimizeAnimations = () => {
        if (performance.memory && performance.memory.usedJSHeapSize > 50000000) {
            // Reduce animations if memory usage is high
            document.querySelectorAll('.floating-code .code-snippet').forEach(el => {
                el.style.animationDuration = '30s';
            });
        }
        
        animationFrameId = requestAnimationFrame(optimizeAnimations);
    };
    
    if (performance.memory) {
        optimizeAnimations();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
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
}

// Project interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading screen (optional enhancement)
function showLoadingComplete() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
}

// Initialize loading complete
window.addEventListener('load', showLoadingComplete);

// Additional CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .slide-in-left {
        animation: slideInLeft 0.6s ease-out forwards;
    }
    
    .custom-cursor {
        pointer-events: none !important;
    }
    
    .loaded .hero-text > * {
        transition: all 0.6s ease-out;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    @media (max-width: 480px) {
        .custom-cursor {
            display: none !important;
        }
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log(`
🚀 Ritikh Allampalli's Portfolio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with passion and modern web technologies
✨ Interactive animations loaded
🎯 Responsive design activated  
🔥 Performance optimized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);