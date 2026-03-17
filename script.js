/* ================================
   PORTFOLIO - INTERACTIVE SCRIPTS
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initProjectFilters();
    initProjectModal();
    initContactForm();
});

function rafThrottle(callback) {
    let isRunning = false;

    return (...args) => {
        if (isRunning) return;
        isRunning = true;
        requestAnimationFrame(() => {
            callback(...args);
            isRunning = false;
        });
    };
}

function getAccentPalette() {
    const rootStyles = getComputedStyle(document.documentElement);

    return {
        primary: rootStyles.getPropertyValue('--accent-primary').trim(),
        secondary: rootStyles.getPropertyValue('--accent-secondary').trim(),
        tertiary: rootStyles.getPropertyValue('--accent-tertiary').trim(),
        primaryRgb: rootStyles.getPropertyValue('--accent-primary-rgb').trim() || '34, 211, 238',
        secondaryRgb: rootStyles.getPropertyValue('--accent-secondary-rgb').trim() || '14, 165, 233',
        tertiaryRgb: rootStyles.getPropertyValue('--accent-tertiary-rgb').trim() || '163, 230, 53'
    };
}

/* ===== CUSTOM CURSOR ===== */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower - slower follow
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

/* ===== NAVIGATION ===== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;
    const handleNavbarScroll = rafThrottle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const handleActiveLinkScroll = rafThrottle(() => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    window.addEventListener('scroll', handleActiveLinkScroll, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===== TYPING EFFECT ===== */
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'Full-Stack Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Clean Code Advocate',
        'Tech Innovator'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a delay
    setTimeout(type, 1000);
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    // Add reveal class to animatable elements
    const animatableElements = document.querySelectorAll(
        '.section-title, .about-content, .project-card, .skills-category, .timeline-item, .contact-content'
    );

    animatableElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.skill-item, .timeline-item');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    animatableElements.forEach(el => observer.observe(el));
}

/* ===== SKILL BARS ANIMATION ===== */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => observer.observe(item));
}

/* ===== COUNTER ANIMATION ===== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

/* ===== CONTACT FORM ===== */
/* ===== CONTACT FORM ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Initialize EmailJS with your Public Key
    emailjs.init('H7vLF1h12CqZ2qYN-');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;

        // Get form data
        const formData = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_email: 'Dealcag07@gmail.com' // Tu email de destino
        };

        // Validate form data
        if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.from_email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" dur="1s" values="32;0" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        submitBtn.disabled = true;

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_qfrrsxq',    // Service ID from EmailJS
                'template_m7dwjts',   // Template ID from EmailJS
                formData
            );

            console.log('Email enviado exitosamente:', response);

            // Show success state
            submitBtn.innerHTML = `
                <span>¡Mensaje Enviado!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Show success notification
            showNotification('¡Tu mensaje ha sido enviado con éxito! Te responderé pronto.', 'success');

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            console.error('Error al enviar el email:', error);

            // Show error state
            submitBtn.innerHTML = `
                <span>Error al Enviar</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

            // Show error notification with details
            const errorMessage = error.text || 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contacta directamente a Dealcag07@gmail.com';
            showNotification(errorMessage, 'error');

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });

    // Form field animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

/* ===== NOTIFICATION SYSTEM ===== */
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    
    // Set icon based on type
    let icon;
    if (type === 'success') {
        icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>`;
    } else if (type === 'error') {
        icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>`;
    } else {
        icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>`;
    }

    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close" aria-label="Cerrar notificación">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/* ===== PROJECT FILTERS ===== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ===== PROJECT MODAL ===== */
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const overlay = modal?.querySelector('.modal-overlay');
    const projectCards = document.querySelectorAll('.project-card');

    if (!modal) return;

    // Project data
    const projectsData = {
        "1": {
            label: "Proyecto Destacado",
            title: "QUANTUM SYSTEM - Barbería Elite",
            description: "Sistema integral de gestión empresarial diseñado específicamente para barberías y salones de belleza. Incluye autenticación segura mediante SMS/WhatsApp, sincronización en tiempo real con Supabase, notificaciones push automáticas, y un diseño responsive completamente optimizado para dispositivos móviles. El sistema permite gestionar citas, clientes, servicios, inventario y análisis de rendimiento en una sola plataforma.",
            features: [
                "Autenticación segura vía SMS y WhatsApp",
                "Sincronización en tiempo real con todos los dispositivos",
                "Dashboard analítico con métricas de rendimiento",
                "Gestión completa de citas y recordatorios automáticos",
                "Sistema de inventario y control de productos",
                "Notificaciones push personalizables",
                "Diseño responsive optimizado para móvil (100%)",
                "Gestión de clientes con historial completo"
            ],
            tech: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite", "React Query", "Zustand"],
            stats: [
                { label: "Tiempo de Desarrollo", value: "3 meses" },
                { label: "Usuarios Activos", value: "50+" },
                { label: "Rendimiento", value: "95/100" },
                { label: "Uptime", value: "99.9%" }
            ],
            challenges: "El principal desafío fue implementar la sincronización en tiempo real manteniendo un rendimiento óptimo en dispositivos móviles con conexiones lentas. Se solucionó mediante optimistic updates, caché inteligente y sincronización diferida de datos no críticos.",
            liveUrl: "https://github.com/Deibyd07",
            codeUrl: "https://github.com/Deibyd07"
        },
        "2": {
            label: "Full-Stack",
            title: "Real-Time Notification System",
            description: "Sistema robusto de notificaciones en tiempo real que integra WhatsApp Business API con tecnologías modernas de sincronización. Permite enviar notificaciones instantáneas a usuarios, gestionar plantillas de mensajes, programar envíos y monitorear el estado de las notificaciones en tiempo real.",
            features: [
                "Integración completa con WhatsApp Business API",
                "Notificaciones push en tiempo real",
                "Panel de administración intuitivo",
                "Sistema de plantillas personalizables",
                "Programación de mensajes automáticos",
                "Analytics y reportes detallados",
                "Cola de mensajes con reintentos automáticos"
            ],
            tech: ["React", "Node.js", "PostgreSQL", "WhatsApp API", "Redis", "Socket.io"],
            stats: [
                { label: "Tiempo de Desarrollo", value: "2 meses" },
                { label: "Mensajes/Día", value: "10K+" },
                { label: "Tasa de Entrega", value: "98%" },
                { label: "Latencia Media", value: "<100ms" }
            ],
            challenges: "Gestionar grandes volúmenes de mensajes sin perder ninguno fue crucial. Se implementó un sistema de colas con Redis y reintentos exponenciales para garantizar la entrega.",
            liveUrl: "https://github.com/Deibyd07",
            codeUrl: "https://github.com/Deibyd07"
        },
        "3": {
            label: "Full-Stack Application",
            title: "EventHub - Gestión de Eventos",
            description: "Aplicación web full-stack empresarial desarrollada para la gestión completa del ciclo de vida de eventos, desde la creación y promoción hasta la venta de entradas, validación de acceso y análisis de resultados. La plataforma integra un sistema robusto de comercio electrónico, autenticación multi-rol con seguridad a nivel de base de datos (RLS), analíticas en tiempo real con dashboards interactivos, y un sistema de entradas digitales con códigos QR para validación instantánea de asistentes.",
            features: [
                "Sistema completo de comercio electrónico para venta de entradas",
                "Autenticación multi-rol con Row Level Security (RLS) en base de datos",
                "Generación y validación de entradas digitales con códigos QR",
                "Dashboard analítico en tiempo real con métricas de eventos",
                "Gestión completa del ciclo de vida de eventos",
                "Sistema de validación de asistentes con escaneo QR",
                "Validación de formularios con Yup y React Hook Form",
                "Interfaz responsive optimizada con Tailwind CSS"
            ],
            tech: ["React 18.3", "TypeScript 5.5", "Vite 5.4", "Tailwind CSS 3.4", "React Router 7.9", "Zustand 5.0", "Supabase", "PostgreSQL", "React Hook Form", "Yup", "html5-qrcode", "react-qr-code", "Lucide React"],
            stats: [
                { label: "Tiempo de Desarrollo", value: "2 meses" },
                { label: "Roles de Usuario", value: "3 niveles" },
                { label: "Funciones Core", value: "15+" },
                { label: "Stack", value: "Full-Stack" }
            ],
            challenges: "El principal desafío fue implementar un sistema de seguridad robusto con autenticación multi-rol y Row Level Security en PostgreSQL, garantizando que cada usuario solo acceda a los datos autorizados. Se solucionó mediante políticas RLS granulares en Supabase y validación tanto en frontend como backend. Además, optimizar el escaneo de códigos QR para funcionar en tiempo real sin latencia fue crítico para la experiencia del usuario.",
            liveUrl: "https://gestion-de-eventos-omega.vercel.app/",
            codeUrl: "https://github.com/Deibyd07/Gestion-de-Eventos"
        },
        "4": {
            label: "En Desarrollo",
            title: "Portfolio Interactivo",
            description: "Portafolio personal de última generación con animaciones 3D avanzadas, efectos interactivos y un sistema de temas claro/oscuro. Incluye cursor personalizado, partículas animadas, y transiciones fluidas que crean una experiencia de usuario memorable y profesional.",
            features: [
                "Animaciones 3D y efectos visuales avanzados",
                "Sistema de temas (claro/oscuro) con transiciones suaves",
                "Cursor personalizado e interactivo",
                "Partículas animadas en background",
                "Scroll animations con Intersection Observer",
                "Diseño completamente responsive",
                "Optimizado para rendimiento"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Canvas API"],
            stats: [
                { label: "Tiempo de Desarrollo", value: "1 mes" },
                { label: "Animaciones", value: "15+" },
                { label: "Tamaño Total", value: "<500KB" },
                { label: "Compatibilidad", value: "95%" }
            ],
            challenges: "Mantener 60 FPS en todas las animaciones mientras se ejecutan múltiples efectos simultáneamente. Se optimizó usando transform y opacity, GPU acceleration y requestAnimationFrame.",
            liveUrl: "https://github.com/Deibyd07",
            codeUrl: "https://github.com/Deibyd07"
        }
    };

    // Open modal on card click
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Evitar abrir modal si se hace clic en un enlace
            if (e.target.closest('a')) return;
            
            const projectId = card.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                populateModal(project, projectId);
                openModal();
            }
        });
        
        // Agregar cursor pointer
        card.style.cursor = 'pointer';
    });

    // Close modal
    modalClose?.addEventListener('click', closeModal);
    
    // Cerrar modal solo si se hace clic fuera del contenido
    modal?.addEventListener('click', (e) => {
        if (e.target === modal || e.target === overlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Scroll al inicio del modal
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            setTimeout(() => modalBody.scrollTop = 0, 10);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function populateModal(project, projectId) {
        // Update basic info
        document.getElementById('modalLabel').textContent = project.label;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Update links
        document.getElementById('modalCodeLink').href = project.codeUrl;
        
        // Update CTA button
        const ctaLink = document.getElementById('modalCtaLink');
        if (ctaLink) {
            ctaLink.href = project.liveUrl;
        }

        // Update features
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = project.features
            .map(feature => `<li>${feature}</li>`)
            .join('');

        // Update tech stack
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = project.tech
            .map(tech => `
                <span class="modal-tech-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    ${tech}
                </span>
            `).join('');

        // Update stats
        const statsGrid = document.getElementById('modalStatsGrid');
        statsGrid.innerHTML = project.stats
            .map(stat => `
                <div class="modal-stat-item">
                    <div class="modal-stat-label">${stat.label}</div>
                    <div class="modal-stat-value">${stat.value}</div>
                </div>
            `).join('');

        // Update challenges
        document.getElementById('modalChallenges').textContent = project.challenges;

        // Update image with real project images
        const modalImage = document.getElementById('modalImage');
        const imageMap = {
            "1": "./images/project1-preview.jpg",
            "2": "./images/project2-preview.jpg",
            "3": "./images/eventhub-preview.jpg",
            "4": "./images/project4-preview.jpg"
        };
        
        modalImage.innerHTML = `
            <img src="${imageMap[projectId]}" alt="${project.title}" class="modal-project-img" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="modal-img-placeholder" style="display: none;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
            </div>
        `;
    }
}

/* ===== PARALLAX EFFECT FOR ORBS ===== */
document.addEventListener('mousemove', rafThrottle((e) => {
    const orbs = document.querySelectorAll('.orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}), { passive: true });

/* ===== NAVBAR HIDE ON SCROLL DOWN ===== */
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', rafThrottle(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
}), { passive: true });

/* ===== PRELOADER (Optional) ===== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/* ===== EASTER EGG - Konami Code ===== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

/* ===== PARTICLE SYSTEM ===== */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId = null;
    let resizeTimer = null;
    let width = 0;
    let height = 0;

    // Set canvas size
    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.35 + 0.45;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const palette = getAccentPalette();
            const colors = [
                `rgba(${palette.primaryRgb},`,
                `rgba(${palette.secondaryRgb},`,
                `rgba(${palette.tertiaryRgb},`
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // Move towards mouse slightly
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= (dx / distance) * force * 0.5;
                this.y -= (dy / distance) * force * 0.5;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();
        }
    }

    function resetParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
            resetParticles();
        }, 120);
    }

    // Draw connections between close particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const palette = getAccentPalette();
                    ctx.strokeStyle = `rgba(${palette.primaryRgb}, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    resizeCanvas();
    resetParticles();
    window.addEventListener('resize', handleResize);
    window.addEventListener('accentThemeChanged', resetParticles);

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    animate();
}

// Initialize particles after DOM load
document.addEventListener('DOMContentLoaded', initParticles);

/* ===== GLOW EFFECT TRACKING ===== */
function initGlowEffect() {
    const glowElements = document.querySelectorAll('.project-card, .skills-category, .timeline-content, .contact-form');

    glowElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

document.addEventListener('DOMContentLoaded', initGlowEffect);

/* ===== MAGNETIC BUTTONS ===== */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .social-link, .project-link');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initMagneticButtons);

/* ===== INTERACTIVE 3D CUBE (PROFESSIONAL SMOOTH ROTATION) ===== */
function initInteractiveCube() {
    const cube = document.querySelector('.cube');
    const container = document.querySelector('.hero-3d-container');
    if (!cube || !container) return;

    let targetRotateX = -15;
    let targetRotateY = -15;
    let currentRotateX = -15;
    let currentRotateY = -15;

    // Momentum variables
    let velocityX = 0;
    let velocityY = 0;
    let lastRotateX = -15;
    let lastRotateY = -15;

    // Interaction states
    let isHovering = false;
    let isDragging = false;

    // Smoothness factor
    const smoothFactor = 0.05;
    const friction = 0.95; // Impulse decay

    // --- MOUSE TRACKING (HOVER) ---
    container.addEventListener('mouseenter', () => { isHovering = true; });

    container.addEventListener('mouseleave', () => {
        if (!isDragging) isHovering = false;
    });

    // --- MOUSE MOVEMENT LOGIC ---
    container.addEventListener('mousemove', (e) => {
        if (!isHovering && !isDragging) return;

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        targetRotateY = x * 140; // Reduced sensitivity
        targetRotateX = -y * 140;
    });

    // --- DRAG LOGIC (OPTIONAL BUT NICE) ---
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        // If mouse is outside, stop hovering too
        if (!container.matches(':hover')) isHovering = false;
    });

    // --- ANIMATION LOOP ---
    function animate() {
        if (isHovering || isDragging) {
            // INTERACTIVE: Follow mouse
            currentRotateX += (targetRotateX - currentRotateX) * smoothFactor;
            currentRotateY += (targetRotateY - currentRotateY) * smoothFactor;

            // Calculate velocity for momentum release (instantaneous speed)
            velocityX = currentRotateX - lastRotateX;
            velocityY = currentRotateY - lastRotateY;
        } else {
            // INERTIA: Apply last known velocity
            currentRotateX += velocityX;
            currentRotateY += velocityY;

            // Apply friction
            velocityX *= friction;
            velocityY *= friction;

            // Maintain minimum spin in the LAST DIRECTION (Idle State)
            if (Math.abs(velocityY) < 0.2) {
                velocityY = 0.2 * (velocityY >= 0 ? 1 : -1);
            }

            // Also maintain minimum spin for X-axis (Vertical rotations)
            if (Math.abs(velocityX) < 0.2) {
                // If moving slow, keep moving in that direction instead of stopping
                // But if it's basically stopped (0), default to a tiny tilt drift or let it be 0
                // User wants it to "continue in direction", so we treat X same as Y
                velocityX = 0.2 * (velocityX >= 0 ? 1 : -1);
            }
        }

        // Update previous frame tracking
        lastRotateX = currentRotateX;
        lastRotateY = currentRotateY;

        // Apply transform
        cube.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

        requestAnimationFrame(animate);
    }

    animate();

    console.log('%c🎲 Scoped Interactive Cube initialized!', 'color: #0ea5e9; font-size: 12px;');
}

document.addEventListener('DOMContentLoaded', initInteractiveCube);

/* ===== TILT EFFECT FOR CARDS (SMOOTH) ===== */
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        let isHovering = false;
        let transitionTimeout = null;

        card.addEventListener('mouseenter', () => {
            isHovering = true;
            
            // Clear any pending transition removal
            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
                transitionTimeout = null;
            }
            
            // Gentle smooth transition for entering - no bounce
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate normalized position (-1 to 1)
            const normalizedX = (x - centerX) / centerX;
            const normalizedY = (y - centerY) / centerY;

            // Subtle rotation angles - gentle tilt
            const rotateX = normalizedY * -8;
            const rotateY = normalizedX * 8;
            const translateZ = 10;

            // Smooth transition for mouse following
            card.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale3d(1.01, 1.01, 1.01)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            
            // Clear any pending timeout
            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
            }
            
            // Smooth transition for return - no bounce
            card.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
            
            // Keep transition for future interactions
            transitionTimeout = setTimeout(() => {
                transitionTimeout = null;
            }, 700);
        });
    });
}

document.addEventListener('DOMContentLoaded', initTiltEffect);

/* ===== SMOOTH TEXT REVEAL ===== */
function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-title, .section-title');

    textElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';

        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.03}s`;
            span.classList.add('char-reveal');
            el.appendChild(span);
        });
    });
}

/* ===== CURSOR TRAIL EFFECT ===== */
function initCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;

    let trailX = 0, trailY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';

        requestAnimationFrame(animateTrail);
    }

    // Show trail on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            trail.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            trail.style.opacity = '0';
        });
    });

    animateTrail();
}

document.addEventListener('DOMContentLoaded', initCursorTrail);

/* ===== SMOOTH SCROLL PROGRESS ===== */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-gradient);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Scroll progress bar disabled per user request
// document.addEventListener('DOMContentLoaded', initScrollProgress);

/* ===== INTERSECTION ANIMATIONS ===== */
function initIntersectionAnimations() {
    const animatedElements = document.querySelectorAll('.stat, .skill-item, .timeline-item');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initIntersectionAnimations);

console.log('%c🚀 Portfolio cargado exitosamente!', 'color: #22d3ee; font-size: 16px; font-weight: bold;');
console.log('%c💡 Tip: Prueba el código Konami (↑↑↓↓←→←→BA) para un Easter Egg!', 'color: #0ea5e9; font-size: 12px;');

/* ================================
   NEW FEATURES - IMPROVEMENTS
   ================================ */

/* ===== PRELOADER ===== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 2000); // Wait for progress bar animation
    });

    // Fallback: hide preloader after 4 seconds max
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 4000);
}

initPreloader();

/* ===== THEME TOGGLE ===== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add animation class
        themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 400);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

document.addEventListener('DOMContentLoaded', initThemeToggle);

function applyAccentToDynamicGradients() {
    const rootStyles = getComputedStyle(document.documentElement);
    const accentPrimary = rootStyles.getPropertyValue('--accent-primary').trim();
    const accentSecondary = rootStyles.getPropertyValue('--accent-secondary').trim();
    const accentTertiary = rootStyles.getPropertyValue('--accent-tertiary').trim();

    const waveStops = document.querySelectorAll('#waveGradient stop');
    if (waveStops.length >= 5) {
        waveStops[0].style.stopColor = accentPrimary;
        waveStops[1].style.stopColor = accentSecondary;
        waveStops[2].style.stopColor = accentTertiary;
        waveStops[3].style.stopColor = accentSecondary;
        waveStops[4].style.stopColor = accentPrimary;
    }

    const lineStops = document.querySelectorAll('#lineGradient stop');
    if (lineStops.length >= 3) {
        lineStops[0].style.stopColor = accentPrimary;
        lineStops[1].style.stopColor = accentSecondary;
        lineStops[2].style.stopColor = accentTertiary;
    }
}

function initAccentTheme() {
    const accentPicker = document.getElementById('themeAccentPicker');
    if (!accentPicker) return;

    const accentOptions = accentPicker.querySelectorAll('.accent-option');
    const savedAccent = localStorage.getItem('accentTheme') || 'cyan';

    function setActiveAccent(accent) {
        document.documentElement.setAttribute('data-accent', accent);
        localStorage.setItem('accentTheme', accent);

        accentOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.accent === accent);
        });

        applyAccentToDynamicGradients();
        window.dispatchEvent(new CustomEvent('accentThemeChanged', { detail: { accent } }));
    }

    setActiveAccent(savedAccent);

    accentOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedAccent = option.dataset.accent;
            setActiveAccent(selectedAccent);
        });
    });
}

document.addEventListener('DOMContentLoaded', initAccentTheme);

/* ===== SPOTLIGHT EFFECT ===== */
function initSpotlightEffect() {
    const imageWrapper = document.querySelector('.image-wrapper');
    if (!imageWrapper) return;

    imageWrapper.addEventListener('mousemove', (e) => {
        const rect = imageWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        imageWrapper.style.setProperty('--spotlight-x', `${x}px`);
        imageWrapper.style.setProperty('--spotlight-y', `${y}px`);
    });
}

document.addEventListener('DOMContentLoaded', initSpotlightEffect);

/* ===== ANIMATED TOOLTIPS ===== */
function initAnimatedTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');

    // Experience data for each skill
    const skillExperience = {
        'JavaScript': '3+ años',
        'React': '2+ años',
        'TypeScript': '2+ años',
        'HTML5': '3+ años',
        'CSS3': '3+ años',
        'Vue.js': '1+ año',
        'Node.js': '2+ años',
        'Java': '2+ años',
        'Python': '2+ año',
        'MySQL': '2+ años',
        'PostgreSQL': '2+ año',
        'GraphQL': '1+ año',
        'Git': '3+ años',
        'Docker': '1+ año',
        'AWS': '1+ año',
        'Figma': '2+ años',
        'Linux': '2+ años',
        'Jest': '1+ año'
    };

    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name')?.textContent;
        if (!skillName) return;

        const experience = skillExperience[skillName] || '1+ año';

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `<span class="tooltip-years">${experience}</span> de experiencia`;
        item.appendChild(tooltip);
    });
}

document.addEventListener('DOMContentLoaded', initAnimatedTooltips);

/* ===== TESTIMONIALS CAROUSEL ===== */
function initTestimonialsCarousel() {
    const container = document.getElementById('testimonialsContainer');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (!container || !dots.length) return;

    let currentIndex = 0;
    const totalSlides = dots.length;
    let autoplayInterval;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentIndex = index;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoplay();
    }, { passive: true });

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();
}

document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);

/* ===== SECTION TRANSITIONS ===== */
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.classList.add('section-transition');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initSectionTransitions);

/* ===== LAZY LOADING ===== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        images.forEach(img => {
            img.classList.add('lazy-image');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
        });
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

/* ===== ENHANCED TEXT REVEAL ===== */
function initEnhancedTextReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chars = entry.target.querySelectorAll('.char-reveal');
                chars.forEach((char, i) => {
                    setTimeout(() => {
                        char.style.opacity = '1';
                        char.style.transform = 'translateY(0)';
                    }, i * 30);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        if (!title.querySelector('.char-reveal')) {
            const text = title.textContent;
            title.innerHTML = '';

            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.className = 'char-reveal';
                span.style.animationDelay = `${i * 0.03}s`;
                title.appendChild(span);
            });
        }
        observer.observe(title);
    });
}

// Note: Text reveal disabled by default to preserve section title styling
// Uncomment to enable: document.addEventListener('DOMContentLoaded', initEnhancedTextReveal);

/* ===== SOUND EFFECTS (Optional) ===== */
// Sounds are disabled by default for a better user experience
// Users can enable them if they prefer
let soundEnabled = false;

function initSoundEffects() {
    // Create audio context only when user interacts
    let audioContext = null;

    function createHoverSound() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    const buttons = document.querySelectorAll('.btn, .social-link, .project-link');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (soundEnabled) {
                createHoverSound();
            }
        });
    });
}

// Sound toggle functionality (optional)
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
}

document.addEventListener('DOMContentLoaded', initSoundEffects);

console.log('%c✨ Todas las mejoras cargadas!', 'color: #a3e635; font-size: 14px;');

/* ================================
   IMMERSIVE EXPERIENCE - NEW EFFECTS
   ================================ */

/* ===== AURORA BOREALIS CANVAS ===== */
function initAurora() {
    const canvas = document.getElementById('auroraCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId = null;
    let resizeTimer = null;
    let mouseX = 0.5, mouseY = 0.5;
    let time = 0;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
        }, 120);
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / width;
        mouseY = e.clientY / height;
    });

    function buildWaves() {
        const palette = getAccentPalette();
        return [
            { y: 0.3, amplitude: 80, frequency: 0.003, speed: 0.0008, color1: `rgba(${palette.primaryRgb},`, color2: `rgba(${palette.secondaryRgb},`, width: 300 },
            { y: 0.4, amplitude: 60, frequency: 0.004, speed: 0.0012, color1: `rgba(${palette.secondaryRgb},`, color2: `rgba(${palette.tertiaryRgb},`, width: 250 },
            { y: 0.5, amplitude: 70, frequency: 0.0025, speed: 0.001, color1: `rgba(${palette.tertiaryRgb},`, color2: `rgba(${palette.primaryRgb},`, width: 200 },
        ];
    }

    let waves = buildWaves();
    window.addEventListener('accentThemeChanged', () => {
        waves = buildWaves();
    });

    function drawAurora() {
        ctx.clearRect(0, 0, width, height);
        time++;

        waves.forEach((wave, index) => {
            const mouseInfluence = (mouseX - 0.5) * 50;
            const mouseYInfluence = (mouseY - 0.5) * 30;

            for (let x = 0; x < width; x += 3) {
                const normalizedX = x / width;
                const baseY = height * wave.y + mouseYInfluence;
                const y = baseY +
                    Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                    Math.sin(x * wave.frequency * 1.5 + time * wave.speed * 0.7) * (wave.amplitude * 0.5) +
                    mouseInfluence * Math.sin(normalizedX * Math.PI);

                // Create vertical gradient band for aurora effect
                const gradient = ctx.createLinearGradient(x, y - wave.width / 2, x, y + wave.width / 2);
                const intensity = 0.03 + Math.sin(x * 0.005 + time * 0.002) * 0.02;
                
                gradient.addColorStop(0, wave.color1 + '0)');
                gradient.addColorStop(0.3, wave.color1 + intensity + ')');
                gradient.addColorStop(0.5, wave.color2 + (intensity * 1.5) + ')');
                gradient.addColorStop(0.7, wave.color1 + intensity + ')');
                gradient.addColorStop(1, wave.color1 + '0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, y - wave.width / 2, 3, wave.width);
            }
        });

        animationId = requestAnimationFrame(drawAurora);
    }

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    drawAurora();
    console.log('%c🌌 Aurora Borealis initialized!', 'color: #0ea5e9; font-size: 12px;');
}

document.addEventListener('DOMContentLoaded', initAurora);

/* ===== CINEMATIC SECTION REVEAL ===== */
function initCinematicReveal() {
    const sections = document.querySelectorAll('.about, .projects, .skills, .contact');
    
    sections.forEach(section => {
        section.classList.add('cinematic-reveal');
        section.classList.add('section-glow');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initCinematicReveal);

/* ===== CLICK RIPPLE EFFECT ===== */
function initClickRipple() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
}

document.addEventListener('DOMContentLoaded', initClickRipple);

/* ===== FOOTER STARFIELD ===== */
function initFooterStars() {
    const container = document.getElementById('footerStars');
    if (!container) return;

    const starCount = 40;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
        star.style.setProperty('--delay', (Math.random() * 5) + 's');
        star.style.setProperty('--brightness', (0.3 + Math.random() * 0.7).toString());
        
        if (Math.random() > 0.7) {
            star.style.width = '3px';
            star.style.height = '3px';
        }
        
        container.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', initFooterStars);

/* ===== HOLOGRAPHIC CARD MOUSE TRACKING ===== */
function initHolographicCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--holo-x', x + '%');
            card.style.setProperty('--holo-y', y + '%');
            
            // Rotate the border gradient angle based on mouse position
            const angle = Math.atan2(y - 50, x - 50) * (180 / Math.PI);
            card.style.setProperty('--border-angle', angle + 'deg');
        });
    });
}

document.addEventListener('DOMContentLoaded', initHolographicCards);

/* ===== ENHANCED CURSOR TRAIL (ALWAYS VISIBLE, SUBTLE) ===== */
function initEnhancedCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;

    let trailX = 0, trailY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.08;
        trailY += (mouseY - trailY) * 0.08;

        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        trail.style.opacity = '0.4';
        trail.style.transform = 'translate(-50%, -50%)';

        requestAnimationFrame(animateTrail);
    }

    // Only on desktop
    if (window.matchMedia('(hover: hover)').matches) {
        animateTrail();
    }
}

document.addEventListener('DOMContentLoaded', initEnhancedCursorTrail);

/* ===== PARALLAX DEPTH FOR SECTIONS ===== */
function initParallaxDepth() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionMiddle = rect.top + rect.height / 2;
            const viewportMiddle = window.innerHeight / 2;
            const distance = (sectionMiddle - viewportMiddle) / window.innerHeight;
            
            // Subtle parallax on section title
            const title = section.querySelector('.section-title');
            if (title && Math.abs(distance) < 1) {
                title.style.transform = `translateY(${distance * -10}px)`;
            }
        });
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initParallaxDepth);

/* ===== WAVE DIVIDER ANIMATION ===== */
function initWaveDividers() {
    const waveDividers = document.querySelectorAll('.wave-divider');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const paths = entry.target.querySelectorAll('.wave-path');
            if (entry.isIntersecting) {
                paths.forEach((path, i) => {
                    path.style.strokeDasharray = path.getTotalLength();
                    path.style.strokeDashoffset = path.getTotalLength();
                    path.style.transition = `stroke-dashoffset ${1.5 + i * 0.5}s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`;
                    
                    requestAnimationFrame(() => {
                        path.style.strokeDashoffset = '0';
                    });
                });
            }
        });
    }, { threshold: 0.3 });

    waveDividers.forEach(divider => observer.observe(divider));
}

document.addEventListener('DOMContentLoaded', initWaveDividers);

console.log('%c🚀 IMMERSIVE EXPERIENCE LOADED!', 'color: #a3e635; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #a3e635;');
