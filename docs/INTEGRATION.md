# System Integration Guide - website-wortman

## Keycloak.js Integration
1. Initialize Keycloak instance in `main.js`.
2. Check `auth` status on load.
3. Attach Bearer token to all `/api/` requests.

## Environment Variables
- `KEYCLOAK_URL`: Auth server endpoint.
- `KEYCLOAK_REALM`: 'Wortman'.
- `DB_HOST`: MariaDB endpoint.

## Loading States
- Implement glassmorphic skeleton screens for project cards during API fetch.
