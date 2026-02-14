# DEPLOY.md - Deployment Playbook

**Complete step-by-step production deployment guide for the 3D Animated Educational Platform on Ubuntu 24.04 VPS with Nginx reverse proxy, Apache/PHP-FPM, Keycloak Docker, and automated SSL.**

## 🖥️ **Infrastructure Requirements**

| Component   | Specification        | Purpose                |
| :---------- | :------------------- | :--------------------- |
| **OS**      | Ubuntu 24.04 LTS     | Production stability   |
| **CPU**     | AMD EPYC (16+ cores) | Animation rendering    |
| **RAM**     | 32GB+                | Keycloak + PHP workers |
| **Storage** | 500GB NVMe SSD       | Assets + MariaDB       |
| **Network** | 1Gbps unmetered      | CDN-ready              |
| **Domain**  | `edu.yourdomain.com` | Production DNS         |

## 🚀 **Step-by-Step Deployment**

### **Phase 1: Server Provisioning**

```bash
# 1. Update system

sudo apt update && sudo apt upgrade -y

# 2. Install base packages

sudo apt install -y software-properties-common curl wget git ufw

# 3. Create deployment user

sudo adduser --disabled-password --gecos "" deployer
sudo usermod -aG sudo deployer
sudo usermod -aG www-data deployer
```

### **Phase 2: Web Server Stack (Nginx + Apache/PHP-FPM)**

```bash
# 4. Install Nginx 1.26

sudo apt install -y nginx

# 5. Install Apache 2.4 + PHP 8.3

sudo apt install -y apache2 php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml php8.3-curl php8.3-jwt

# 6. Configure Apache for port 8080 (behind Nginx proxy)

sudo tee /etc/apache2/ports.conf <<EOF
Listen 8080
<IfModule ssl_module>
    Listen 8443 https
</IfModule>
EOF

# 7. Enable Apache modules

sudo a2enmod rewrite proxy_http proxy_ssl headers
sudo a2enmod php8.3-fpm
sudo systemctl restart apache2
```

### **Phase 3: Nginx Reverse Proxy Configuration**

```bash
# 8. Create Nginx site config

sudo tee /etc/nginx/sites-available/edu <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name edu.yourdomain.com;

    # Static assets (max performance)

    root /var/www/edu/public;
    index index.html;

    # Security headers

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Static files + SPA routing

    location / {
        try_files \$uri \$uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy to Apache/PHP-FPM

    location ~ ^/api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$server_name;
        proxy_redirect off;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Keycloak proxy

    location /keycloak/ {
        proxy_pass http://127.0.0.1:8080/keycloak/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cookie_path / "/; Secure; HttpOnly; SameSite=Strict";
    }
}
EOF

# 9. Enable site

sudo ln -s /etc/nginx/sites-available/edu /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

### **Phase 4: Database Setup**

```bash
# 10. Install MariaDB 11.x

sudo apt install -y mariadb-server
sudo mysql_secure_installation

# 11. Create database and user

sudo mysql -u root <<EOF
CREATE DATABASE edu_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'edu_user'@'localhost' IDENTIFIED BY 'SecurePass123!';
GRANT ALL PRIVILEGES ON edu_platform.* TO 'edu_user'@'localhost';
FLUSH PRIVILEGES;
EOF

# 12. Import schema (from ARCHITECTURE.md)

mysql -u edu_user -p edu_platform < schema.sql
```

### **Phase 5: Deploy Keycloak (Docker)**

```bash
# 13. Install Docker + Compose

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker deployer
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 14. Create Keycloak docker-compose

sudo mkdir -p /opt/edu/keycloak
sudo tee /opt/edu/keycloak/docker-compose.yml <<EOF
version: '3.8'
services:
  keycloak:
    image: quay.io/keycloak/keycloak:25.0
    container_name: keycloak_edu
    restart: unless-stopped
    environment:
      KC_DB: mariadb
      KC_DB_URL: jdbc:mariadb://mariadb:3306/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: KeycloakSecure123!
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: AdminSecure456!
    ports:
      - "8080:8080"
    depends_on:
      - mariadb
    command: start-dev

  mariadb:
    image: mariadb:11
    container_name: keycloak_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: KeycloakRoot789!
      MYSQL_DATABASE: keycloak
      MYSQL_USER: keycloak
      MYSQL_PASSWORD: KeycloakSecure123!
    volumes:
      - keycloak_data:/var/lib/mysql

volumes:
  keycloak_data:
EOF

cd /opt/edu/keycloak && sudo docker-compose up -d
```

### **Phase 6: Application Deployment**

```bash
# 15. Setup application directory

sudo mkdir -p /var/www/edu
sudo chown deployer:www-data /var/www/edu
sudo chmod 775 /var/www/edu

# 16. Clone repository (or upload)

su - deployer
cd /var/www/edu
git clone https://github.com/yourorg/edu-platform.git .
composer install --no-dev --optimize-autoloader

# 17. Setup PHP environment

sudo tee /var/www/edu/.env <<EOF
APP_ENV=production
DB_HOST=localhost
DB_NAME=edu_platform
DB_USER=edu_user
DB_PASS=SecurePass123!
REDIS_HOST=127.0.0.1
KEYCLOAK_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----...
EOF

sudo chown -R www-data:www-data /var/www/edu/storage /var/www/edu/bootstrap/cache
```

### **Phase 7: SSL Certificate**

```bash
# 18. Install and configure Certbot

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d edu.yourdomain.com --non-interactive --agree-tos -m admin@yourdomain.com

# 19. Verify HTTPS

curl -I https://edu.yourdomain.com
```

### **Phase 8: Firewall \& Security**

```bash
# 20. Configure UFW

sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 8080/tcp  # Apache (internal only)
sudo ufw --force enable

# 21. Fail2ban protection

sudo apt install -y fail2ban
sudo systemctl enable fail2ban
```

## 🔄 **CI/CD Pipeline** (GitHub Actions)

### **`.github/workflows/deploy.yml`**

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deployer
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/edu
            git pull origin main
            composer install --no-dev --optimize-autoloader
            sudo chown -R www-data:www-data storage bootstrap/cache
            sudo systemctl reload apache2 nginx
```

## 🧪 **Post-Deployment Verification**

```bash
# Health checks

curl -I https://edu.yourdomain.com
curl -I https://edu.yourdomain.com/api/v1/auth/session

# Keycloak admin console

curl -I https://edu.yourdomain.com/keycloak/

# Performance test

sudo apt install -y apache2-utils
ab -n 1000 -c 50 https://edu.yourdomain.com/

# SSL test

sudo apt install -y nmap
nmap --script ssl-enum-ciphers -p 443 edu.yourdomain.com
```

## 📋 **Production Checklist**

```text
✅ [ ] Nginx + Apache/PHP-FPM running (systemctl status)
✅ [ ] Keycloak accessible (https://edu.yourdomain.com/keycloak)
✅ [ ] SSL certificate valid (curl -I https://edu.yourdomain.com)
✅ [ ] Database populated (mysql -u edu_user edu_platform -e "SELECT COUNT(*) FROM projects")
✅ [ ] PHP APIs responding (/api/v1/projects)
✅ [ ] 3D animations 60fps (Chrome DevTools)
✅ [ ] Lighthouse score 95+
✅ [ ] UFW active (sudo ufw status)
✅ [ ] Fail2ban running (sudo fail2ban-client status)
✅ [ ] CI/CD pipeline green (GitHub Actions)
```

## 🛠️ **Maintenance Commands**

```bash
# Zero-downtime updates

cd /var/www/edu && git pull && composer install --no-dev && sudo systemctl reload apache2 nginx

# Log monitoring

sudo tail -f /var/log/nginx/error.log /var/log/apache2/error.log

# Keycloak backup

docker exec keycloak_edu /opt/keycloak/bin/kc.sh export --realm edu-platform --file keycloak-backup.json

# Database backup

mysqldump -u edu_user -p edu_platform > backup_$(date +%Y%m%d).sql
```

## 🚨 **Rollback Procedures**

```bash
# Emergency rollback

cd /var/www/edu && git checkout HEAD~1
sudo systemctl restart apache2 nginx

# Keycloak recovery

cd /opt/edu/keycloak && docker-compose down && docker-compose up -d
```

**This DEPLOY.md provides complete production deployment playbook** for Ubuntu 24.04 VPS with Nginx reverse proxy → Apache/PHP-FPM → Keycloak Docker stack, SSL automation, CI/CD pipeline, and zero-downtime updates optimized for the 3D animated semiconductor/AI professional platform.
