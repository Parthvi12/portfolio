// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for background effect
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksMenu = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Typewriter effect
const typewriterTexts = document.querySelectorAll('.typewriter-text');
let currentTextIndex = 0;

function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, element, index + 1), 50); 
    } else {
        setTimeout(() => {
            eraseText(element);
        }, 1500); 
    }
}

function eraseText(element) {
    const text = element.textContent;
    if (text.length > 0) {
        element.textContent = text.slice(0, -1);
        setTimeout(() => eraseText(element), 30); 
    } else {
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        setTimeout(() => {
            typeWriter(typewriterTexts[currentTextIndex].getAttribute('data-text'), typewriterTexts[currentTextIndex]);
        }, 300); 
    }
}

// Initialize typewriter
if (typewriterTexts.length > 0) {
    typewriterTexts.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
        element.textContent = '';
    });
    typeWriter(typewriterTexts[0].getAttribute('data-text'), typewriterTexts[0]);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .scale-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-animation');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Intersection Observer for scroll animations
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            entry.target.classList.add('visible');
            observerScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all major elements
document.querySelectorAll('.timeline-item, .project-card, .education-item, .skills li, section h2, .hero-content > *').forEach(el => {
    observerScroll.observe(el);
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
    });
});

// Resume download handling
document.querySelector('.secondary-btn').addEventListener('click', async (e) => {
    const button = e.currentTarget;
    button.classList.add('loading');
    
    try {
        // Simulate download delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Add your actual resume download logic here
    } catch (error) {
        console.error('Download failed:', error);
    } finally {
        button.classList.remove('loading');
    }
});

// Smooth scroll for contact button
document.querySelector('.primary-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Parallax effect for background elements
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * 0.005);
    const moveY = (e.clientY * 0.005);

    document.querySelectorAll('.bg-circle, .shape, .decorative-img').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

document.querySelectorAll('.social-link').forEach((link, index) => {
    link.style.setProperty('--i', index);
}); 

// Mouse Trail Effect
function createMouseTrail() {
    const trails = [];
    const trailCount = 5;

    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            delay: i * 2
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrails() {
        trails.forEach((trail, index) => {
            const speed = 0.2;
            trail.x += (mouseX - trail.x) * speed;
            trail.y += (mouseY - trail.y) * speed;
            
            trail.element.style.transform = `translate(${trail.x - 10}px, ${trail.y - 10}px) scale(${1 - index * 0.15})`;
            trail.element.style.opacity = 1 - (index * 0.15);
        });
        requestAnimationFrame(updateTrails);
    }

    updateTrails();
}

// Button Hover Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / button.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / button.clientHeight) * 100;
        button.style.setProperty('--x', `${x}%`);
        button.style.setProperty('--y', `${y}%`);
    });
});

// Enhanced Navbar Functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const themeToggle = document.querySelector('.theme-toggle');

    // Smooth Scroll Handler with Hide/Show Navbar
    let lastScroll = 0;
    let scrollTimer;

    function handleScroll() {
        const currentScroll = window.scrollY;
        
        // Show/hide navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;

        // Clear previous timer
        clearTimeout(scrollTimer);
        
        // Set new timer
        scrollTimer = setTimeout(() => {
            navbar.classList.remove('hidden');
        }, 150);
    }

    window.addEventListener('scroll', handleScroll);

    // Enhanced Mobile Menu Toggle with Smooth Animations
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate menu icon with smooth transitions
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        if (mobileMenu.classList.contains('active')) {
            menuIcon.style.background = 'transparent';
            menuIcon.style.transform = 'rotate(180deg)';
            menuIcon.style.setProperty('--before-transform', 'rotate(45deg) translate(0, 0)');
            menuIcon.style.setProperty('--after-transform', 'rotate(-45deg) translate(0, 0)');
        } else {
            menuIcon.style.background = 'var(--text-primary)';
            menuIcon.style.transform = 'rotate(0)';
            menuIcon.style.setProperty('--before-transform', 'translateY(-8px)');
            menuIcon.style.setProperty('--after-transform', 'translateY(8px)');
        }

        // Animate mobile menu links
        const links = document.querySelectorAll('.mobile-link');
        links.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Smooth Nav Indicator Animation
    function updateNavIndicator(link, instant = false) {
        const rect = link.getBoundingClientRect();
        const navRect = link.closest('.nav-menu').getBoundingClientRect();
        
        if (instant) {
            navIndicator.style.transition = 'none';
        }
        
        requestAnimationFrame(() => {
            navIndicator.style.width = `${rect.width}px`;
            navIndicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
            
            if (instant) {
                requestAnimationFrame(() => {
                    navIndicator.style.transition = '';
                });
            }
        });
    }

    // Initialize nav indicator with smooth animation
    const activeLink = document.querySelector('.nav-link.active') || navLinks[0];
    updateNavIndicator(activeLink, true);

    // Enhanced nav link interactions
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            updateNavIndicator(link);
            link.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });

        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateNavIndicator(link);
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });

    // Reset nav indicator with smooth animation
    document.querySelector('.nav-menu').addEventListener('mouseleave', () => {
        const activeLink = document.querySelector('.nav-link.active') || navLinks[0];
        updateNavIndicator(activeLink);
    });

    // Enhanced Theme Toggle Animation
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        const icon = themeToggle.querySelector('i');
        icon.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.transform = '';
        }, 200);
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Initialize theme with smooth transition
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createMouseTrail();
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Form validation and submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        
        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate an API call
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
            
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
        }
    });

    // Form validation function
    function validateForm(data) {
        const { name, email, subject, message } = data;
        let isValid = true;
        
        // Reset previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Name validation
        if (name.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (subject.trim().length < 3) {
            showError('subject', 'Subject must be at least 3 characters long');
            isValid = false;
        }
        
        // Message validation
        if (message.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }

    // Show error message under input
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        input.parentNode.appendChild(errorDiv);
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '10px',
            backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Trigger animation
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 2000);
        });
    }

    // Add floating label effect
    document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentNode.classList.remove('focused');
            if (input.value) {
                input.parentNode.classList.add('has-value');
            } else {
                input.parentNode.classList.remove('has-value');
            }
        });
        
        // Check initial value
        if (input.value) {
            input.parentNode.classList.add('has-value');
        }
    });
});
