# System Architecture - website-wortman

## Overview
A lightweight, high-performance frontend coupled with a robust open-source authentication and backend layer.

## Component Stack
- **Frontend**: Tailwind CSS + GSAP + Vanilla-tilt.js + Particles.js.
- **Backend**: PHP 8.3 + MariaDB.
- **Authentication**: Keycloak OSS (OIDC).
- **Web Server**: Nginx + Apache/PHP-FPM.

## Security Architecture
- **JWT Management**: Handled via Keycloak.js on the frontend.
- **CORS**: Strict allow-listing for production domains.
- **SSL**: Automated via Certbot/LetsEncrypt.

## Database Schema
- `users`: Profile data synced with Keycloak IDs.
- `content`: Dynamic storage for project details and patents.
