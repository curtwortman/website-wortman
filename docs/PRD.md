# PRD.md - Product Requirements Document

**Comprehensive requirements for the 3D Animated Educational Platform replicating the exact YouTube demo aesthetics with enterprise-grade functionality for semiconductor/AI professionals.**

## 📋 **Product Vision \& Scope**

**Goal**: Build a premium showcase platform that combines Hollywood-level 3D animations with enterprise authentication for AI/semiconductor industry professionals. Pixel-perfect replication of the YouTube demo's dark cosmic theme featuring glassmorphism UI, 3D tilt effects, shooting star backgrounds, MacOS-style project cards, infinite testimonial scroll, and secure admin overlay.

**Primary Objectives**:

- Deliver identical visual experience to YouTube demo (99.7% fidelity per STYLE.md)
- Self-hosted enterprise authentication (Keycloak OSS)
- Professional showcase for AMD GPU/CPU pre-sales technical content
- Support for restricted technical resources (whitepapers, benchmarks, demos)

**Deployment Target**: Apache/Nginx VPS infrastructure optimized for AMD EPYC hosting

## 🎯 **Target Audience**

| Audience                  | Needs                                     | Key Features                                      |
| :------------------------ | :---------------------------------------- | :------------------------------------------------ |
| **Professional Peers**    | Technical credibility, cutting-edge demos | 3D GPU workload visualizations, benchmark results |
| **Partners/Stakeholders** | Enterprise reliability, secure access     | Keycloak SSO, admin dashboards, analytics         |
| **Enterprise Customers**  | Technical advisory, proof-of-concept      | Gated whitepapers, case studies, live demos       |

## 🚀 **Feature Priority Matrix**

| Feature                       | Visual Priority | Functional Priority | Status |
| :---------------------------- | :-------------- | :------------------ | :----- |
| **Hero 3D Tilt Card**         | ⭐⭐⭐⭐⭐      | ⭐⭐⭐              | P0     |
| **Shooting Stars Background** | ⭐⭐⭐⭐⭐      | ⭐                  | P0     |
| **Glassmorphism UI**          | ⭐⭐⭐⭐⭐      | ⭐⭐                | P0     |
| **Course/Project Cards**      | ⭐⭐⭐⭐        | ⭐⭐⭐              | P1     |
| **Infinite Testimonials**     | ⭐⭐⭐          | ⭐                  | P1     |
| **Secure Admin Overlay**      | ⭐⭐            | ⭐⭐⭐⭐⭐          | P0     |
| **Keycloak Authentication**   | -               | ⭐⭐⭐⭐⭐          | P0     |
| **Student Dashboard**         | ⭐⭐            | ⭐⭐⭐              | P2     |
| **Admin Analytics**           | ⭐              | ⭐⭐⭐⭐            | P1     |

## 🏗️ **MVP Definition**

**Phase 1 MVP (2 weeks)** - Visual Foundation:

```text
✅ Hero section with 3D tilt card + typewriter headline
✅ Shooting stars Particles.js background (60fps)
✅ 6 glassmorphic project cards (AMD Instinct demos)
✅ Secure admin access button with Keycloak overlay
✅ Fully responsive (mobile-first, disable tilt <768px)
```

**Phase 2 MVP (Week 3)** - Core Functionality:

```text
✅ Keycloak OSS authentication (admin/student roles)
✅ Project card click-through to gated content
✅ Infinite testimonial marquee (32s cycle)
✅ Basic admin dashboard (user/project management)
```

## 📊 **Success Metrics**

| Metric                | Target        | Measurement                    |
| :-------------------- | :------------ | :----------------------------- |
| **Performance**       | <2s LCP       | Lighthouse Performance 95+     |
| **Visual Fidelity**   | 99.7%         | Pixel-perfect STYLE.md match   |
| **Animation Quality** | 60fps stable  | Chrome DevTools FPS meter      |
| **Authentication**    | 99.9% uptime  | Keycloak health checks         |
| **Responsiveness**    | All devices   | BrowserStack 50+ device matrix |
| **SEO**               | PageSpeed 95+ | Google PageSpeed Insights      |

## 👥 **User Personas**

### **Primary: Technical Decision Maker (TDM)**

```yaml
Role: CTO/VP Engineering at AI/ML enterprises
Goals: Validate AMD GPU performance, access benchmarks
Pain Points: Generic marketing sites, slow load times
Key Journey: Hero → Project cards → Gated whitepapers
```

### **Secondary: Pre-Sales Engineer**

```yaml
Role: Solutions Architect (user's role)
Goals: Showcase to customers, admin content updates
Pain Points: Manual deployments, lack of analytics
Key Journey: Public site → Secure admin → Content mgmt
```

## 🔧 **Technical Requirements**

### **Frontend Stack** (100% Open Source)

```text
HTML5, TailwindCSS v3.4 (MIT)
GSAP 3.12 (MIT), Vanilla Tilt.js 1.7 (MIT)
Particles.js 2.0 (MIT), Inter font (OFL)
Keycloak.js adapter (MIT)
```

### **Backend Stack**

```text
PHP 8.3 (PHP License), MariaDB 11.x (GPLv2)
Keycloak 25.0 (Apache 2.0) - Docker container
AdminLTE 3.2 (MIT) - Admin dashboard
```

### **Infrastructure**

```text
Nginx 1.26 (static assets) + Apache/PHP-FPM 9000
Ubuntu 24.04 LTS VPS (AMD EPYC optimized)
HTTPS via Certbot, Redis 7.x caching
```

## 📈 **Functional Requirements**

### **P0 - Must Have**

1. **Hero Section**: 3D tilt card, typewriter headline, shooting stars
2. **Project Showcase**: 6 glassmorphic cards (ROCm, MI300X, EPYC demos)
3. **Secure Access**: Top-right Keycloak login overlay (no redirect)
4. **Responsive Design**: Perfect mobile experience, tilt disabled <768px

### **P1 - Should Have**

1. **Admin Dashboard**: User/project CRUD, analytics
2. **Testimonials**: Infinite horizontal scroll, hover pause
3. **Content Gating**: JWT-protected whitepapers/case studies
4. **SEO**: Meta tags, OpenGraph, schema markup

### **P2 - Nice to Have**

1. **Student Dashboard**: Enrollment tracking, progress rings
2. **Live Demos**: Embedded ROCm/MLPerf benchmarks
3. **Newsletter**: Technical updates signup (Mailchimp OSS)

## 🌐 **User Flows**

```text
1. VISITOR → HERO VIEW → PROJECT CARDS → WHITEPAPER GATE
   ↓
2. CLICK SECURE ACCESS → KEYCLOAK LOGIN → ADMIN DASHBOARD
   ↓
3. ADMIN → PROJECT CRUD → USER MANAGEMENT → ANALYTICS
```

## 📱 **Non-Functional Requirements**

| Category            | Requirement                               |
| :------------------ | :---------------------------------------- |
| **Performance**     | Lighthouse 95+, LCP <2s, TBT <200ms       |
| **Security**        | HTTPS, Keycloak OAuth2, JWT tokens, CORS  |
| **Browser Support** | Chrome 100+, Firefox 100+, Safari 15+     |
| **Accessibility**   | WCAG 2.1 AA, keyboard nav, screen reader  |
| **Mobile**          | Touch-friendly (48px taps), tilt disabled |
| **Scale**           | 1,000 concurrent users, CDN-ready         |

## 🛠 **Out of Scope**

```text
❌ Payment processing (Phase 3)
❌ Real-time chat/notifications
❌ Native mobile apps
❌ Multi-language support
❌ Video hosting (>100MB)
```

## 🎨 **Visual Design Requirements**

**Reference**: STYLE.md (99.7% validated)

```text
✅ Cosmic black #0a0a0f background
✅ Glassmorphism rgba(255,255,255,0.08) cards
✅ 25° 3D tilt max, 400ms speed
✅ 60 gold shooting stars, 32s testimonial cycle
✅ Inter font, gradient hero text
```

## 🔍 **Testing Requirements**

| Test Type             | Coverage                      |
| :-------------------- | :---------------------------- |
| **Visual Regression** | 100% components               |
| **Cross-browser**     | Chrome/Firefox/Safari         |
| **Device Matrix**     | 50+ BrowserStack devices      |
| **Performance**       | Lighthouse 95+ all categories |
| **Security**          | OWASP Top 10 compliance       |
| **Load**              | 1k concurrent users           |

## 🚀 **Release Criteria**

**MVP Launch**:

```markdown
✅ [ ] Hero + 3D effects operational (60fps)
✅ [ ] Keycloak auth working (admin/student)
✅ [ ] 6 project cards responsive
✅ [ ] Lighthouse Performance 95+
✅ [ ] Zero console errors
✅ [ ] Cross-browser validation
```

## 📋 **Risks \& Mitigations**

| Risk                         | Impact | Mitigation                                |
| :--------------------------- | :----- | :---------------------------------------- |
| Heavy animations slow mobile | High   | Lazy-load effects, reduced-motion support |
| Keycloak complexity          | Medium | Docker quickstart, OSS community          |
| Visual drift from demo       | High   | STYLE.md validation checklist             |
| VPS bandwidth limits         | Low    | CDN static assets, image optimization     |

---

**This PRD defines complete requirements for production deployment** of the 3D animated educational platform targeting semiconductor/AI professionals, achieving pixel-perfect YouTube demo replication while delivering enterprise-grade authentication and admin capabilities on self-hosted AMD VPS infrastructure.
