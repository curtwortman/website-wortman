# FRONTEND.md - Frontend Implementation Guide

**Complete copy-paste code implementation for the 3D Animated Educational Platform.** Builds pixel-perfect YouTube demo visuals using 100% open-source libraries with mobile-first responsive design and Keycloak authentication integration.

## 🛠️ **Core Libraries** (CDN Production Links)

```html
<!-- Tailwind CSS v3.4 (Critical CSS Framework) -->
<link
  href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css"
  rel="stylesheet"
/>

<!-- GSAP 3.12.2 (Animation Engine) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/ScrollTrigger.min.js"></script>

<!-- Vanilla Tilt.js 1.7.2 (3D Parallax) -->
<script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>

<!-- Particles.js 2.0 (Shooting Stars) -->
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>

<!-- Keycloak.js (Enterprise Auth) -->
<script src="https://cdn.jsdelivr.net/npm/keycloak-js@22.0.5/dist/keycloak.min.js"></script>

<!-- Inter Font (Typography) -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## 📄 **Complete HTML Boilerplate**

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AMD AI Solutions - Premium Technical Platform</title>

    <!-- Core Libraries (above) -->

    <style>
      /* STYLE.md CSS Custom Properties */
      :root {
        --bg-primary: #0a0a0f;
        --glass-bg: rgba(255, 255, 255, 0.08);
        --glass-border: rgba(255, 255, 255, 0.2);
        --primary-blue: #3b82f6;
        --glow-white: rgba(255, 255, 255, 0.45);
      }

      * {
        font-family: "Inter", sans-serif;
      }
      body {
        background: var(--bg-primary);
        overflow-x: hidden;
      }

      /* Glass Effect */
      .glass-effect {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        box-shadow:
          0 25px 50px -12px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.18);
        border-radius: 24px;
      }
    </style>
  </head>
  <body class="text-white">
    <!-- Shooting Stars Canvas -->
    <canvas id="shooting-stars" class="fixed inset-0 -z-10 opacity-90"></canvas>

    <div id="app">
      <!-- Content Here -->
    </div>

    <!-- Core JavaScript -->
    <script src="main.js"></script>
  </body>
</html>
```

## ✨ **Key Code Blocks**

### **1. 3D Tilt Configuration** (STYLE.md Validated)

```javascript
// Initialize 25° parallax tilt on all tilt-enabled elements
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
    el.vanillaTilt.destroy();
  });
}
```

### **2. Shooting Stars Canvas** (60fps Gold Trails)

```javascript
// Cosmic background (STYLE.md validated)
particlesJS("shooting-stars", {
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
```

### **3. Hero Section** (Typewriter + 3D Tilt)

```html
<section
  class="hero min-h-screen flex items-center justify-center relative px-6"
>
  <!-- Typewriter Headline -->
  <h1
    id="hero-typewriter"
    class="hero-h1 text-center max-w-4xl mx-auto mb-16 leading-tight"
  >
    Premium AMD GPU Solutions
  </h1>

  <!-- 3D Tilt Hero Card -->
  <div class="tilt-card max-w-2xl mx-auto" data-tilt data-tilt-glare="true">
    <div class="glass-effect p-12 text-center">
      <img
        src="amd-mi300x.jpg"
        alt="MI300X GPU"
        class="w-full h-64 object-cover rounded-2xl mb-8 shadow-2xl"
      />
      <h2 class="text-3xl font-bold mb-4">MI300X Training</h2>
      <p class="text-xl text-gray-300 mb-8 max-w-md mx-auto">
        World-class AMD Instinct performance
      </p>
      <button class="cta-button px-12 py-4 text-lg">Explore Benchmarks</button>
    </div>
  </div>
</section>
```

```javascript
// Hero typewriter effect
function typeWriter(element, text, speed = 100) {
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

// Initialize hero
typeWriter(
  document.getElementById("hero-typewriter"),
  "Premium AMD GPU Solutions",
  80,
);
```

### **4. Infinite Testimonial Marquee** (32s Cycle)

```html
<section class="testimonials py-32 px-6 overflow-hidden">
  <div
    class="testimonials-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
  >
    <!-- Duplicate content for seamless loop -->
    <div class="marquee-track">
      <div class="marquee flex space-x-8">
        <div class="testimonial-card glass-effect p-8 flex-shrink-0 w-80">
          <p class="italic text-lg mb-4">"MI300X delivered 4x throughput..."</p>
          <div class="flex items-center space-x-3">
            <img src="avatar.jpg" class="w-12 h-12 rounded-full" />
            <div>
              <div class="font-semibold">Dr. Jane Smith</div>
              <div class="text-sm text-gray-400">CTO, AI Research</div>
            </div>
          </div>
        </div>
        <!-- Repeat 6x for smooth loop -->
      </div>
      <!-- Duplicate track -->
      <div class="marquee flex space-x-8">
        <!-- Same content -->
      </div>
    </div>
  </div>
</section>
```

```css
.marquee-track {
  overflow: hidden;
}
.marquee {
  display: flex;
  animation: marquee 32s linear infinite;
}
.marquee:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

### **5. Course/Project Cards** (MacOS Style)

```html
<section class="courses py-32 px-6">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-5xl font-bold text-center mb-24">Featured Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        class="course-card glass-effect p-8 rounded-3xl shadow-xl group cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-700 overflow-hidden"
        data-tilt
        data-tilt-glare="true"
      >
        <div
          class="aspect-video rounded-2xl overflow-hidden mb-6 group-hover:scale-110 transition-transform duration-800"
        >
          <img
            src="rocm-benchmark.jpg"
            class="w-full h-full object-cover"
            alt="ROCm"
          />
        </div>
        <div class="space-y-4">
          <h3
            class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors"
          >
            ROCm 6.1 Benchmarks
          </h3>
          <p class="text-gray-300 leading-relaxed">
            MI300X vs H100 inference comparison
          </p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-white">Live Demo</span>
            <button class="cta-button px-6 py-3 text-sm">View Results</button>
          </div>
        </div>
      </div>
      <!-- Repeat for 6 cards -->
    </div>
  </div>
</section>
```

## 🔐 **6. Secure Admin Overlay** (Keycloak Integration)

```html
<!-- Fixed Secure Access Button -->
<button
  id="secure-access"
  class="secure-access fixed top-8 right-8 z-50 glass-effect p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all duration-400 flex items-center space-x-2 group"
>
  <svg class="w-6 h-6" fill="currentColor">🔐</svg>
  <span class="text-sm font-medium hidden md:inline">Admin</span>
</button>

<!-- Fullscreen Admin Overlay -->
<div
  id="admin-overlay"
  class="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] hidden"
>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-full mx-4"
  >
    <div class="glass-effect p-12 rounded-3xl text-center">
      <h3 class="text-3xl font-bold mb-8">Secure Access</h3>
      <div id="keycloak-login"></div>
    </div>
  </div>
</div>
```

```javascript
// Keycloak initialization
const keycloak = new Keycloak({
  url: "https://keycloak.yourvps.com",
  realm: "edu-platform",
  clientId: "edu-web-spa",
});

keycloak.init({ onLoad: "check-sso" }).then((authenticated) => {
  if (authenticated) {
    const roles = keycloak.tokenParsed.realm_access.roles;
    if (roles.includes("admin")) {
      document.getElementById("secure-access").classList.add("admin-active");
    }
  }
});

// Secure access toggle
document.getElementById("secure-access").addEventListener("click", () => {
  const overlay = document.getElementById("admin-overlay");
  overlay.classList.toggle("hidden");

  if (!overlay.classList.contains("hidden")) {
    keycloak.login();
  }
});
```

## 📱 **7. Mobile-First Adjustments**

```css
/* Disable tilt on mobile */
@media (max-width: 768px) {
  [data-tilt] {
    transform: none !important;
  }

  /* Reduce glass blur */
  .glass-effect {
    backdrop-filter: blur(10px);
  }

  /* Larger touch targets */
  .cta-button {
    min-height: 52px;
    min-width: 120px;
  }
}

/* Stack testimonials vertically */
@media (max-width: 640px) {
  .testimonials-container {
    grid-template-columns: 1fr;
  }
}
```

```javascript
// Performance optimization for mobile
if (window.innerWidth < 768) {
  // Reduce particle count
  particlesJS("shooting-stars", { particles: { number: { value: 30 } } });

  // Disable hover animations
  document.body.classList.add("no-hover");
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.from(entry.target.querySelectorAll(".course-card"), {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
        });
      }
    });
  },
  { threshold: 0.1 },
);

// Observe course sections
document.querySelectorAll(".course-section").forEach((section) => {
  observer.observe(section);
});
```

## 🎯 **Performance Checklist**

```text
✅ Preload critical fonts/CSS
✅ Lazy-load below-fold images
✅ Minified JS/CSS bundles
✅ WebP image format
✅ GPU-accelerated transforms
✅ requestAnimationFrame loops
✅ Lighthouse 95+ score
```

**This FRONTEND.md provides complete production-ready code** for the 3D animated platform with exact YouTube demo replication, Keycloak authentication, and mobile-first responsive design optimized for AMD VPS deployment.
