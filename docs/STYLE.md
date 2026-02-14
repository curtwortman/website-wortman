# Visual Style Guide - website-wortman

## Theme: Dark Cosmic / Glassmorphism

### Color Palette (Exact Demo Match)
| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| **Cosmic Black** | `#0a0a0f` | `rgb(10,10,15)` | Body background |
| **Glass Overlay** | `rgba(255,255,255,0.08)` | - | Cards, nav backdrop |
| **Glass Border** | `rgba(255,255,255,0.2)` | - | Card borders |
| **Primary Blue** | `#3b82f6` | `rgb(59,130,246)` | CTAs, accents |
| **Success Green** | `#10b981` | `rgb(16,185,129)` | Progress rings |
| **Gold Accent** | `#fbbf24` | `rgb(251,191,36)` | Stars, highlights |
| **Text Light** | `#f8fafc` | `rgb(248,250,252)` | Primary text |

### Typography System
- **Primary Font**: "Inter" (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hero H1**: `font-size: clamp(3rem, 8vw, 5rem); font-weight: 700; letter-spacing: -0.02em`
- **Body**: 1.125rem / 400

### Glassmorphism Effects
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### Spacing & Sizing
- **Spacing Scale**: 4px base (4, 8, 12, 16, 20, 24, 32, 40, 48, 64px)
- **Card Radius**: 24px (1.5rem)
- **Glass Border Radius**: 32px (2rem)
