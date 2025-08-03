// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeScrollToTop();
    initializePortfolioFilter();
    initializeProjectModal();
    initializeBlogFilter();
    initializeContactForm();
    initializeFAQ();
    initializeSkillBars();
    initializeNewsletterForm();
    initializeLoadMore();
    initializeSmoothScrolling();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Active navigation link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.project-card, .blog-card, .testimonial-card, .skill-category, .education-item, .fact-item, .timeline-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== SCROLL TO TOP =====
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PORTFOLIO FILTER =====
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== PROJECT MODAL =====
function initializeProjectModal() {
    const projectLinks = document.querySelectorAll('.project-link');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    
    // Project data
    const projectData = {
        project1: {
            title: 'E-commerce Platform',
            image: 'images/project1.jpg',
            description: 'A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
            duration: '3 months',
            role: 'Full Stack Developer',
            features: [
                'Responsive design for all devices',
                'Secure payment processing with Stripe',
                'Real-time inventory management',
                'Advanced search and filtering',
                'User reviews and ratings system',
                'Admin dashboard with analytics'
            ],
            liveLink: '#',
            githubLink: '#'
        },
        project2: {
            title: 'Fitness App Design',
            image: 'images/project2.jpg',
            description: 'Complete UI/UX design for a fitness tracking mobile application. Includes user research, wireframing, prototyping, and final design implementation.',
            technologies: ['Figma', 'Prototyping', 'User Research', 'Adobe Creative Suite'],
            duration: '2 months',
            role: 'UI/UX Designer',
            features: [
                'User-centered design approach',
                'Interactive prototypes',
                'Comprehensive design system',
                'Accessibility compliance',
                'Cross-platform compatibility',
                'Usability testing and iteration'
            ],
            liveLink: '#',
            githubLink: '#'
        },
        project3: {
            title: 'Restaurant Website',
            image: 'images/project3.jpg',
            description: 'Modern restaurant website with online ordering system. Features menu management, table reservations, and integrated payment processing.',
            technologies: ['Vue.js', 'Express', 'MySQL', 'PayPal', 'Socket.io'],
            duration: '2.5 months',
            role: 'Frontend Developer',
            features: [
                'Online menu with real-time updates',
                'Table reservation system',
                'Order tracking functionality',
                'Customer review system',
                'Staff management portal',
                'Analytics and reporting'
            ],
            liveLink: '#',
            githubLink: '#'
        },
        project4: {
            title: 'Task Management App',
            image: 'images/project4.jpg',
            description: 'Cross-platform mobile application for team collaboration and task management. Built with React Native for iOS and Android.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
            duration: '4 months',
            role: 'Mobile Developer',
            features: [
                'Real-time collaboration',
                'Push notifications',
                'Offline functionality',
                'File sharing and attachments',
                'Team chat integration',
                'Progress tracking and analytics'
            ],
            liveLink: '#',
            githubLink: '#'
        },
        project5: {
            title: 'Creative Portfolio',
            image: 'images/project5.jpg',
            description: 'Interactive portfolio website for a digital artist featuring 3D animations and immersive user experience.',
            technologies: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
            duration: '3 months',
            role: 'Frontend Developer',
            features: [
                '3D interactive elements',
                'Smooth animations and transitions',
                'Optimized performance',
                'SEO-friendly structure',
                'Content management system',
                'Social media integration'
            ],
            liveLink: '#',
            githubLink: '#'
        },
        project6: {
            title: 'Analytics Dashboard',
            image: 'images/project6.jpg',
            description: 'Data visualization dashboard for business analytics with interactive charts and real-time data updates.',
            technologies: ['Figma', 'Data Visualization', 'UX Research', 'Prototyping'],
            duration: '2 months',
            role: 'UX Designer',
            features: [
                'Interactive data visualizations',
                'Customizable dashboard layouts',
                'Real-time data updates',
                'Export and sharing capabilities',
                'Mobile-responsive design',
                'User role management'
            ],
            liveLink: '#',
            githubLink: '#'
        }
    };
    
    // Open modal
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && modal) {
                populateModal(project);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function populateModal(project) {
        document.getElementById('modal-project-image').src = project.image;
        document.getElementById('modal-project-title').textContent = project.title;
        document.getElementById('modal-project-description').textContent = project.description;
        document.getElementById('modal-project-duration').textContent = project.duration;
        document.getElementById('modal-project-role').textContent = project.role;
        document.getElementById('modal-live-link').href = project.liveLink;
        document.getElementById('modal-github-link').href = project.githubLink;
        
        // Populate technologies
        const techContainer = document.getElementById('modal-project-tech');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const techSpan = document.createElement('span');
            techSpan.className = 'tech-tag';
            techSpan.textContent = tech;
            techContainer.appendChild(techSpan);
        });
        
        // Populate features
        const featuresContainer = document.getElementById('modal-project-features');
        featuresContainer.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
    }
}

// ===== BLOG FILTER =====
function initializeBlogFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset loading state
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
                
                // Show success message
                if (formMessage) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                    formMessage.style.display = 'block';
                }
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                    }
                }, 5000);
            }, 2000);
        });
        
        // Form validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// ===== FAQ FUNCTIONALITY =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== NEWSLETTER FORM =====
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate subscription (replace with actual implementation)
            setTimeout(() => {
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.backgroundColor = '#10b981';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
}

// ===== LOAD MORE FUNCTIONALITY =====
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more content
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Load More Articles';
                this.disabled = false;
                
                // You can add logic here to actually load more content
                // For now, we'll just show a message
                const message = document.createElement('p');
                message.textContent = 'More articles loaded!';
                message.style.textAlign = 'center';
                message.style.color = 'var(--primary-color)';
                message.style.marginTop = '1rem';
                
                this.parentNode.insertBefore(message, this);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    message.remove();
                }, 3000);
            }, 1500);
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format date function
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events with throttling
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based functionality can be added here
}, 16)); // ~60fps

// Optimize resize events with debouncing
window.addEventListener('resize', debounce(function() {
    // Any resize-based functionality can be added here
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    const modal = document.querySelector('.project-modal.active');
    
    if (modal && e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You can add error reporting here
});

// ===== INITIALIZATION COMPLETE =====
console.log('Portfolio website JavaScript initialized successfully!');

