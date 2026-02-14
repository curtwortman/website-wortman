# Component Library - website-wortman

## Reusable Components

### 1. GlassCard
- **Props**: `title`, `description`, `icon`.
- **Style**: `.glass-effect` with optional `data-tilt`.

### 2. TypewriterHeadline
- **Props**: `text`.
- **Logic**: GSAP or CSS animation for sequential letter reveal.

### 3. SecureLoginButton
- **Props**: `onClick`.
- **Visual**: Glassmorphic lock icon (`🔐`).

### 4. ProgressRing
- **Props**: `percentage`.
- **Visual**: Success Green (`#10b981`) SVG stroke.

### 5. ModalOverlay
- **Props**: `isOpen`, `content`.
- **Style**: High z-index (50) with backdrop-blur.
