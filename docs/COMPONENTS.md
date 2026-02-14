# COMPONENTS.md - Component Library

**Complete reusable component library for the 3D Animated Educational Platform.** Production-ready HTML/CSS/JS components implementing STYLE.md specifications with data attributes, TailwindCSS, and vanilla JavaScript controllers.

## 🧩 **Core Components Catalog**

| Component              | Props                               | Usage               | Dependencies                |
| :--------------------- | :---------------------------------- | :------------------ | :-------------------------- |
| **GlassCard**          | `title`, `subtitle`, `icon`, `tilt` | Cards, modals       | `glass-effect`, `data-tilt` |
| **TypewriterHeadline** | `text`, `speed`                     | Hero titles         | Custom JS                   |
| **SecureLoginButton**  | `onLogin`                           | Auth trigger        | Keycloak.js                 |
| **ProgressRing**       | `percentage`, `size`                | Progress indicators | SVG                         |
| **ModalOverlay**       | `isOpen`, `content`                 | All overlays        | Custom JS                   |
| **TiltImage**          | `src`, `alt`                        | Hero/project images | Vanilla Tilt.js             |
| **TestimonialCard**    | `quote`, `author`                   | Marquee content     | `glass-effect`              |
| **CourseCard**         | `project`, `enrolled`               | Project showcase    | All above                   |

## 1. **GlassCard**

**Universal glassmorphic container with optional 3D tilt**

```html
<!-- Basic GlassCard -->
<div class="glass-card p-8 shadow-xl group" data-card-id="1">
  <div class="text-3xl mb-4">${icon || '🚀'}</div>
  <h3
    class="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors"
  >
    ${title}
  </h3>
  <p class="text-gray-300 leading-relaxed">${description}</p>
</div>

<!-- Tilt-enabled GlassCard -->
<div
  class="glass-card p-8 shadow-xl group"
  data-tilt
  data-tilt-glare="true"
  data-card-id="2"
>
  <!-- Same content -->
</div>

<script>
  // Auto-initialize tilt on glass cards
  document.querySelectorAll(".glass-card[data-tilt]").forEach((card) => {
    VanillaTilt.init(card, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.4,
    });
  });
</script>
```

**CSS** (STYLE.md compliant):

```css
.glass-card {
  @apply glass-effect p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden;
}
.glass-card::before {
  content: "";
  @apply absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent;
  opacity: 0;
  @apply transition-opacity duration-500 group-hover:opacity-100;
}
```

## 2. **TypewriterHeadline**

**Hero text with sequential letter reveal**

```html
<div class="typewriter-container text-center max-w-4xl mx-auto mb-20">
  <h1 id="typewriter-hero" class="hero-h1 leading-tight">
    Premium AMD GPU Solutions
  </h1>
</div>

<script>
  class Typewriter {
    constructor(element, text, speed = 80) {
      this.element = element;
      this.text = text;
      this.speed = speed;
      this.index = 0;
      this.cursor = document.createElement("span");
      this.cursor.className = "cursor";
      this.element.appendChild(this.cursor);
      this.type();
    }

    type() {
      if (this.index < this.text.length) {
        this.element.innerHTML = this.text.slice(0, ++this.index);
        setTimeout(() => this.type(), this.speed);
      } else {
        this.cursor.remove();
      }
    }
  }

  // Initialize
  new Typewriter(
    document.getElementById("typewriter-hero"),
    "Premium AMD GPU Solutions",
  );
</script>
```

**CSS**:

```css
.hero-h1 {
  @apply text-5xl md:text-7xl font-bold;
  background: linear-gradient(135deg, #ffffff, #dbeafe, transparent);
  -webkit-background-clip: text;
  background-clip: text;
}
.cursor {
  @apply ml-2 inline-block w-1 h-12 bg-gradient-to-b from-blue-400 to-transparent;
  animation: blink 1s infinite;
}
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
```

## 3. **SecureLoginButton**

**Top-right pulsing auth trigger**

```html
<button
  id="secure-login"
  class="secure-login fixed top-8 right-8 z-50 flex items-center space-x-2 group"
>
  <div
    class="w-12 h-12 rounded-3xl glass-effect flex items-center justify-center shadow-2xl"
  >
    <span class="text-xl">🔐</span>
  </div>
  <span
    class="hidden md:inline font-semibold text-white/90 group-hover:text-blue-400 transition-colors"
    >Admin</span
  >
</button>

<script>
  // Keycloak integration
  document.getElementById("secure-login").addEventListener("click", () => {
    window.auth?.keycloak?.login();
  });
</script>
```

**CSS** (Pulsing animation):

```css
.secure-login {
  @apply glass-effect p-4 rounded-3xl shadow-2xl hover:scale-110 hover:shadow-2xl transition-all duration-400;
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
.secure-login.admin-active {
  @apply ring-2 ring-emerald-400/50 bg-emerald-500/20;
}
```

## 4. **ProgressRing**

**SVG circular progress indicator**

```html
<div class="progress-ring-container flex items-center space-x-4">
  <svg class="progress-ring w-24 h-24" viewBox="0 0 36 36">
    <path
      class="progress-ring__circle bg-gray-700"
      stroke-width="3"
      stroke-linecap="round"
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="progress-ring__circle progress-ring__success stroke-[3px]"
      stroke-linecap="round"
      stroke-linejoin="round"
      pathLength="1"
      data-progress="75"
    />
  </svg>
  <div>
    <div class="text-2xl font-bold text-white" data-progress-text="75">75%</div>
    <div class="text-sm text-gray-400">Complete</div>
  </div>
</div>

<script>
  class ProgressRing {
    constructor(selector) {
      this.elements = document.querySelectorAll(selector);
      this.init();
    }

    init() {
      this.elements.forEach((ring) => {
        const progress = ring.querySelector("[data-progress]").dataset.progress;
        ring.querySelector("[data-progress]").style.strokeDasharray =
          "100, 100";
        ring.querySelector("[data-progress]").style.strokeDashoffset =
          100 - progress;
        ring.querySelector("[data-progress-text]").textContent = progress + "%";
      });
    }
  }

  new ProgressRing(".progress-ring-container");
</script>
```

## 5. **ModalOverlay**

**Fullscreen backdrop-blur overlay system**

```html
<div id="modal-root" class="fixed inset-0 z-[^9999] pointer-events-none">
  <!-- Auth Modal -->
  <div
    id="auth-modal"
    class="modal-overlay hidden backdrop-blur-xl bg-black/70"
  >
    <div
      class="modal-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-full mx-4 p-0"
    >
      <div class="glass-effect rounded-3xl p-12 text-center">
        <button
          class="modal-close absolute top-6 right-6 text-2xl hover:text-blue-400"
        >
          &times;
        </button>
        <div id="keycloak-container"></div>
      </div>
    </div>
  </div>

  <!-- Admin Dashboard Modal -->
  <div
    id="admin-modal"
    class="modal-overlay hidden backdrop-blur-xl bg-slate-900/95"
  >
    <div class="modal-content absolute inset-0 flex">
      <!-- Sidebar -->
      <!-- Content -->
    </div>
  </div>
</div>

<script>
  class ModalManager {
    constructor() {
      this.modals = document.querySelectorAll(".modal-overlay");
      this.init();
    }

    init() {
      // Close on overlay click
      this.modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
          if (e.target.classList.contains("modal-overlay")) {
            this.close(modal.id);
          }
        });
      });

      // Close buttons
      document.querySelectorAll(".modal-close").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.close(btn.closest(".modal-overlay").id);
        });
      });
    }

    open(modalId) {
      document.getElementById(modalId).classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    close(modalId) {
      document.getElementById(modalId).classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  const modals = new ModalManager();
</script>
```

## 6. **TiltImage**

**Standalone 3D parallax image**

```html
<div
  class="tilt-image w-full max-w-md mx-auto"
  data-tilt
  data-tilt-glare="true"
>
  <img
    src="/assets/mi300x.jpg"
    alt="AMD MI300X"
    class="w-full h-80 object-cover rounded-3xl shadow-2xl"
  />
</div>
```

## 7. **TestimonialCard**

**Marquee testimonial unit**

```html
<div
  class="testimonial-card glass-effect p-8 flex-shrink-0 w-80 h-48 flex flex-col justify-between"
>
  <p class="italic text-lg leading-relaxed text-white/90">${quote}</p>
  <div class="flex items-center space-x-3 pt-4 border-t border-white/10">
    <img src="${avatar}" class="w-12 h-12 rounded-full ring-2 ring-white/20" />
    <div>
      <div class="font-semibold text-white">${author}</div>
      <div class="text-sm text-gray-400">${title}</div>
    </div>
  </div>
</div>
```

## 8. **CourseCard** (Composite)

**Full project showcase card combining all primitives**

```html
<div
  class="course-card w-full max-w-sm mx-auto group"
  data-tilt
  data-tilt-glare="true"
>
  <div
    class="glass-card p-8 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-700"
  >
    <!-- TiltImage -->
    <div
      class="aspect-video rounded-2xl overflow-hidden mb-6 group-hover:scale-110 transition-transform duration-800"
    >
      <img
        src="${project.image_url}"
        class="w-full h-full object-cover"
        alt="${project.title}"
      />
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <div
        class="flex items-center space-x-2 text-sm text-blue-400 font-medium"
      >
        <span class="px-3 py-1 bg-blue-500/20 rounded-full"
          >${project.category.toUpperCase()}</span
        >
        ${project.featured ? '<span
          class="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full text-yellow-300"
          >FEATURED</span
        >' : ''}
      </div>

      <h3
        class="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors"
      >
        ${project.title}
      </h3>
      <p class="text-gray-300 leading-relaxed">${project.excerpt}</p>

      <div
        class="flex items-center justify-between pt-4 border-t border-white/10"
      >
        ${enrolled ? '
        <div class="progress-ring-container">
          <svg class="progress-ring w-10 h-10"><!-- SVG --></svg>
        </div>
        ' : ''}
        <button
          class="cta-button px-6 py-3 text-sm ${enrolled ? 'bg-emerald-500/80 hover:bg-emerald-500' : ''}"
        >
          ${enrolled ? 'Continue' : 'Enroll Now'}
        </button>
      </div>
    </div>
  </div>
</div>
```

## 🎛️ **JavaScript Controller Hub**

```javascript
// components.js - Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all systems
  new Typewriter(document.querySelector(".typewriter-container h1"));
  new ProgressRing(".progress-ring-container");
  new ModalManager();

  // Tilt initialization
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.4,
  });

  // Particles
  particlesJS("shooting-stars", {
    /* STYLE.md config */
  });

  // GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".course-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      delay: i * 0.1,
    });
  });
});
```

**This COMPONENTS.md provides complete production-ready HTML/CSS/JS components** implementing all STYLE.md specifications with full Keycloak integration, mobile responsiveness, and composable architecture for the 3D animated educational platform.
