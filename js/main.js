document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            "glare-prerender": true,
        });
    }

    // Initialize Particles for Cosmic Background
    if (typeof particlesJS !== 'undefined') {
        particlesJS('shooting-stars', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 2, random: true },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "bottom-right",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                events: { onhover: { enable: true, mode: "repulse" } }
            },
            retina_detect: true
        });
    }

    // Secure Access Overlay Toggle
    const secureBtn = document.getElementById('secure-access');
    secureBtn.addEventListener('click', () => {
        alert('Keycloak authentication integration pending setup.');
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.from(".hero h1", {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power4.out",
            stagger: 0.2
        });
        
        gsap.from(".tilt-card", {
            duration: 2,
            scale: 0.9,
            opacity: 0,
            delay: 0.5,
            ease: "elastic.out(1, 0.75)"
        });
    }
});
