document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles.js (Shooting Stars)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('shooting-stars', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#fbbf24" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.6 },
                },
                size: { value: 2, random: true },
                move: {
                    enable: true,
                    speed: { min: 1, max: 4 },
                    direction: "right",
                    random: true,
                    straight: false,
                    out_mode: "out",
                },
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                },
            },
            retina_detect: true,
        });
    }

    // 2. Initialize Vanilla Tilt (3D Parallax)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.4,
            "glare-prerender": true,
            "mouse-event-element": document.body,
            gyroscope: false,
            transition: true,
        });

        // Mobile: Disable tilt on touch devices
        if ("ontouchstart" in window || navigator.maxTouchPoints) {
            document.querySelectorAll("[data-tilt]").forEach((el) => {
                if (el.vanillaTilt) el.vanillaTilt.destroy();
            });
        }
    }

    // 3. Typewriter Effect for Hero
    function typeWriter(element, text, speed = 80) {
        if (!element) return;
        element.innerHTML = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const heroTitle = document.getElementById("hero-typewriter");
    if (heroTitle) {
        typeWriter(heroTitle, "Solutions Architect. Patent Inventor.");
    }

    // 4. GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Entrance animation for hero elements
        const tl = gsap.timeline();
        tl.from(".hero-h1", {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power4.out",
            stagger: 0.2
        })
        .from(".tilt-card", {
            duration: 1.5,
            scale: 0.9,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=1");

        // Scroll animations for project cards
        gsap.from(".course-card", {
            scrollTrigger: {
                trigger: ".courses-grid",
                start: "top 85%",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
        });
    }

    // 5. Secure Access Toggle (Keycloak Placeholder)
    const secureBtn = document.getElementById('secure-access');
    const adminOverlay = document.getElementById('admin-overlay');
    
    if (secureBtn) {
        secureBtn.addEventListener('click', () => {
            if (adminOverlay) {
                adminOverlay.classList.toggle('hidden');
            } else {
                alert('Keycloak authentication integration pending server setup.');
            }
        });
    }
});
