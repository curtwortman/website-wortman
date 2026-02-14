# Testing & QA Checklist - website-wortman

## 1. Visual Verification
- [ ] Colors match Style Guide HEX values.
- [ ] 3D Tilt activates on hover (Desktop only).
- [ ] Particles background is fluid (60fps).

## 2. Responsive Verification
- [ ] Breakpoint `md` (768px): Layout switches from stack to grid.
- [ ] Breakpoint `sm` (640px): Marquee items stack/adjust for width.

## 3. Performance
- [ ] Lighthouse Performance Score > 90.
- [ ] Image assets < 500kb each.

## 4. Security
- [ ] Secure sections redirect to Keycloak.
- [ ] API rejects requests without valid JWT.
