# Frontend Implementation Guide - website-wortman

## Core Libraries
- **GSAP**: Entrance animations and ScrollTrigger.
- **Vanilla-tilt**: 3D hover effects.
- **Particles.js**: Cosmic background.

## Key Code Blocks

### 3D Tilt Config
```javascript
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.4
});
```

### Shooting Stars Canvas
```javascript
particlesJS("shooting-stars", {
  particles: {
    number: { value: 60 },
    color: { value: "#fbbf24" },
    move: { speed: 2, direction: "right" }
  }
});
```

### Infinite Marquee
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee { animation: marquee 35s linear infinite; }
```

## Mobile-First Adjustments
- Disable `data-tilt` on devices with touch capabilities.
- Reduce backdrop-filter blur on low-power mobile devices.
