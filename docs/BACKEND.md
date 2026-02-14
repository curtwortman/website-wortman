# Backend API Specification - website-wortman

## Endpoints

### Authentication
- `GET /api/auth/session`: Validate current OIDC session.
- `POST /api/auth/logout`: Terminate session.

### Projects/Patents
- `GET /api/projects`: List all public projects.
- `GET /api/projects/:id`: Detailed view.

### Admin
- `POST /api/admin/update-content`: Restricted to `admin` role in Keycloak.

## Response Format
```json
{
  "status": "success",
  "data": {},
  "timestamp": "2026-02-14T..."
}
```

## Error Codes
- `401`: Unauthorized (Missing/Expired JWT).
- `403`: Forbidden (Insufficient Keycloak Roles).
- `429`: Too Many Requests (Rate limiting active).
