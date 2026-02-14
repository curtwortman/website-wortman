# Deployment Playbook - website-wortman

## Infrastructure
- **OS**: Ubuntu 24.04 LTS.
- **Server**: Nginx (Reverse Proxy) + Apache (PHP Handler).
- **SSL**: Certbot.

## Step-by-Step
1. **Provision**: Spin up VPS and point `wortman.ai` DNS.
2. **Setup Nginx**: Configure proxy pass to Apache.
3. **Deploy Auth**: Setup Keycloak via Docker Compose.
4. **Deploy Code**: Clone `website-wortman` to `/var/www/html`.
5. **Database**: Import initial schema to MariaDB.
6. **SSL**: Run `certbot --nginx`.

## CI/CD
- **GitHub Actions**: Automated push to production on merge to `main`.
