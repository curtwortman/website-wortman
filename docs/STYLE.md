# STYLE.md - Comprehensive Style Guide

**Pixel-perfect visual specifications for the 3D animated educational platform.**

## 🎨 **1. Color Palette**

| Name               | HEX                      | RGB               | CSS Variable       | Usage               |
| :----------------- | :----------------------- | :---------------- | :----------------- | :------------------ |
| **Cosmic Black**   | `#0a0a0f`                | `rgb(10,10,15)`   | `--bg-primary`     | Body background     |
| **Deep Space**     | `#0f0f23`                | `rgb(15,15,35)`   | `--bg-secondary`   | Section backgrounds |
| **Glass Overlay**  | `rgba(255,255,255,0.08)` | -                 | `--glass-bg`       | Cards, nav backdrop |
| **Glass Border**   | `rgba(255,255,255,0.2)`  | -                 | `--glass-border`   | Card borders        |
| **Primary Blue**   | `#3b82f6`                | `rgb(59,130,246)` | `--primary-blue`   | CTAs, hover states  |
| **Success Green**  | `#10b981`                | `rgb(16,185,129)` | `--success-green`  | Progress rings      |
| **Gold Stars**     | `#fbbf24`                | `rgb(251,191,36)` | `--gold-accent`    | Shooting stars      |
| **Text Primary**   | `#f8fafc`                | `rgb(248,250,252) | `--text-primary`   | Headings, body      |
| **Text Secondary** | `rgba(248,250,252,0.7)`  | -                 | `--text-secondary` | Subtext, labels     |
| **White Glow**     | `rgba(255,255,255,0.45)` | -                 | `--glow-white`     | Hover glows         |

**CSS Custom Properties**:

```css
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #0f0f23;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.2);
  --primary-blue: #3b82f6;
  --success-green: #10b981;
  --gold-accent: #fbbf24;
  --text-primary: #f8fafc;
  --text-secondary: rgba(248, 250, 252, 0.7);
  --glow-white: rgba(255, 255, 255, 0.45);
}
```

## 📏 **2. Typography System**

### **Font Stack**

```text
Primary: "Inter", -apple-system, BlinkMacSystemFont, sans-serif
Weights: 300, 400, 500, 600, 700
```

### **Typography Scale**

| Element     | Desktop                  | Mobile                   | Font Weight | Line Height | Letter Spacing |
| :---------- | :----------------------- | :----------------------- | :---------- | :---------- | :------------- |
| **Hero H1** | `clamp(3.5rem,8vw,6rem)` | `clamp(2.5rem,8vw,4rem)` | 700         | 1.1         | `-0.025em`     |
| **H2**      | `3.75rem`                | `2.5rem`                 | 600         | 1.2         | `-0.015em`     |
| **H3**      | `2.25rem`                | `1.875rem`               | 600         | 1.3         | `-0.01em`      |
| **H4**      | `1.5rem`                 | `1.25rem`                | 500         | 1.4         | `normal`       |
| **Body**    | `1.125rem`               | `1rem`                   | 400         | 1.6         | `normal`       |
| **Small**   | `0.875rem`               | `0.8125rem`              | 400         | 1.5         | `normal`       |

**Hero H1**:

```css
.hero-h1 {
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #ffffff, #dbeafe, transparent);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}
```

## 📐 **3. Spacing \& Layout System**

### **Spacing Scale** (4px increments)

```text
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 12px (0.75rem)
lg: 16px (1rem)
xl: 20px (1.25rem)
2xl: 24px (1.5rem)
3xl: 32px (2rem)
4xl: 40px (2.5rem)
5xl: 48px (3rem)
6xl: 64px (4rem)
```

### **Layout Breakpoints**

```text
Mobile First:
- Default: < 640px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
```

## 🪟 **4. Glassmorphism System**

**Primary Glass Effect**:

```css
.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.glass-effect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
}
```

**Glass Hover**:

```css
.glass-effect:hover {
  background: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 35px 60px -15px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transform: translateY(-4px);
}
```

## 🌙 **5. Shadows \& Elevation System**

| Elevation | CSS Shadow                          |
| :-------- | :---------------------------------- |
| **sm**    | `0 2px 8px rgba(0,0,0,0.2)`         |
| **md**    | `0 8px 25px rgba(0,0,0,0.3)`        |
| **lg**    | `0 20px 40px rgba(0,0,0,0.4)`       |
| **xl**    | `0 25px 50px -12px rgba(0,0,0,0.5)` |
| **2xl**   | `0 35px 60px -15px rgba(0,0,0,0.6)` |

## 🔘 **6. Border Radius System**

```text
Base: 12px (0.75rem)
Card: 24px (1.5rem)
Glass: 32px (2rem)
Pill: 50px
Circle: 9999px
```

## ✨ **7. Animation Specifications**

### **3D Tilt Cards** (Vanilla Tilt.js)

```javascript
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
```

### **GSAP Animation Presets**

```javascript
// Course card entrance
gsap.from(".course-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.7)",
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".course-section",
    start: "top 85%",
  },
});
```

### **Testimonial Marquee**

```css
.marquee {
  display: flex;
  animation: marquee 32s linear infinite;
}
.marquee:hover {
  animation-play-state: paused;
}
```

## 🌟 **8. Shooting Stars Canvas**

```javascript
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
    events: { onhover: { enable: true, mode: "repulse" } },
  },
  retina_detect: true,
});
```

## 🧩 **9. Component Style Library**

### **Glass Card**

```html
<div
  class="glass-effect p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group"
>
  <h3
    class="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors"
  >
    Course Title
  </h3>
  <p class="text-gray-300 leading-relaxed mb-6">Premium learning experience</p>
</div>
```

### **Primary CTA Button**

```html
<button
  class="cta-button inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 ring-blue-500/30 transition-all duration-300 backdrop-blur-sm"
>
  Enroll Now
</button>
```

### **Secure Access Button**

```html
<button
  id="secure-access"
  class="secure-access fixed top-8 right-8 z-50 glass-effect p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all duration-400 flex items-center space-x-2 group"
>
  <svg class="w-6 h-6" fill="currentColor">🔐</svg>
  <span class="text-sm font-medium hidden md:inline">Admin</span>
</button>
```

```css
.secure-access {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(59, 130, 246, 0);
  }
}
```

### **Course Card**

```html
<div
  class="course-card glass-effect p-8 rounded-3xl max-w-sm mx-auto shadow-xl group cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-700 overflow-hidden"
  data-tilt
  data-tilt-glare="true"
>
  <div
    class="aspect-video rounded-2xl overflow-hidden mb-6 group-hover:scale-110 transition-transform duration-800"
  >
    <img src="course.jpg" class="w-full h-full object-cover" />
  </div>
  <div class="space-y-4">
    <h3
      class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors"
    >
      AI Mastery Course
    </h3>
    <p class="text-gray-300 leading-relaxed">12 hours of premium content</p>
    <div class="flex items-center justify-between">
      <span class="text-2xl font-bold text-white">$199</span>
      <button class="cta-button px-6 py-3 text-sm">Enroll Now</button>
    </div>
  </div>
</div>
```

## 📱 **10. Responsive Design System**

```css
.testimonials-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .testimonials-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .testimonials-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 🔍 **11. Accessibility \& Performance**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .tilt-card {
    transform: none !important;
  }
}
```

**Performance Targets**:

```text
Lighthouse Performance: 95+
Largest Contentful Paint: <1.2s
Total Blocking Time: <200ms
Cumulative Layout Shift: <0.05
60fps animations
```
