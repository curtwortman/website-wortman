# ARCHITECTURE.md - System Architecture Document

**Production-grade architecture for the 3D Animated Educational Platform replicating YouTube demo visuals with enterprise authentication for semiconductor/AI professionals on Apache/Nginx VPS infrastructure.**

## 🏗️ **Overview**

**A high-performance, self-hosted platform combining Hollywood-grade 3D animations with enterprise-grade authentication and admin capabilities.** Lightweight frontend delivers 60fps animations while Keycloak OSS provides production SSO. PHP 8.3 backend serves dynamic content through REST APIs.

```text
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Browser       │    │   Nginx (80/443) │    │ Apache/PHP-FPM  │
│   SPA Client    │◄──►│ Static Assets    │◄──►│  REST APIs      │
│ • GSAP 60fps    │    │ • Tailwind/CSS   │    │ • PHP 8.3       │
│ • Tilt.js 3D    │    │ • JS Bundles     │    │ • JWT Verify    │
│ • Particles.js  │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │                         │
                              ▼                         ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │    Keycloak      │    │   MariaDB 11.x  │
                       │   Container      │    │                 │
                       │ • OIDC/OAuth2    │    │ • users         │
                       │ • Admin/Student  │    │ • projects      │
                       │   Roles          │    │ • enrollments   │
                       └──────────────────┘    └─────────────────┘
```

## 🛠️ **Component Stack**

### **Frontend** (60fps Animation Layer)

```text
HTML5 + TailwindCSS v3.4 (MIT)
├── GSAP 3.12.2 (MIT)           # ScrollTrigger, MacOS animations
├── Vanilla Tilt.js 1.7.2 (MIT) # 3D mouse parallax (25° max)
├── Particles.js 2.0 (MIT)      # 60 gold shooting stars
├── Keycloak.js (MIT)           # Frontend OIDC adapter
└── Inter Font (OFL)            # Typography system
```

### **Backend** (API \& Content Layer)

```text
PHP 8.3.11 (PHP License) + Composer
├── firebase/php-jwt ^6.0       # Token verification
├── PDO/MariaDB Driver          # Database abstraction
├── AdminLTE 3.2 (MIT)          # Admin dashboard UI
└── Monolog (MIT)               # Structured logging
```

### **Authentication** (Enterprise SSO)

```text
Keycloak 25.0 (Apache 2.0)
├── Docker containerized
├── OIDC/OAuth2 flows
├── Admin/Student roles
├── Realm: "edu-platform"
└── Client: "edu-web-spa"
```

### **Infrastructure** (AMD-Optimized VPS)

```text
Ubuntu 24.04 LTS (AMD EPYC)
├── Nginx 1.26.2 (Static/Proxy)
├── Apache 2.4.62 + PHP-FPM 8.3 (APIs)
├── MariaDB 11.4 (Persistent storage)
├── Redis 7.2 (Session caching)
└── Docker 27.2 (Keycloak container)
```

## 🔒 **Security Architecture**

### **JWT Token Flow**

```text
1. Frontend → Keycloak OIDC login
2. Keycloak → JWT token (ID/access tokens)
3. Frontend stores tokens (localStorage + httpOnly)
4. API calls → PHP verifies JWT signature
5. Role extraction → Content gating
```

### **CORS Policy** (Production)

```nginx
# Strict domain allow-list

add_header Access-Control-Allow-Origin "https://edu.yourdomain.com";
add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
add_header Access-Control-Allow-Headers "Authorization, Content-Type";
```

### **SSL/TLS** (Automated)

```text
Certbot/LetsEncrypt → Auto-renewal (90-day certs)
Nginx HTTP→HTTPS redirect (HSTS preload)
TLS 1.3 + HTTP/2 + OCSP Stapling
```

## 🗄️ **Database Schema**

### **MariaDB 11.x Schema**

```sql
-- Core users table (Keycloak synced)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  keycloak_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_keycloak (keycloak_id),
  INDEX idx_role (role)
);

-- Projects/courses showcase
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  category ENUM('gpu', 'cpu', 'networking', 'ai') DEFAULT 'ai',
  featured BOOLEAN DEFAULT FALSE,
  whitepaper_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_featured (featured)
);

-- User-project relationships
CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  project_id INT,
  progress INT DEFAULT 0,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  UNIQUE KEY unique_user_project (user_id, project_id)
);

-- Admin audit trail
CREATE TABLE admin_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id INT,
  details JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_action (user_id, action)
);
```

## 🌐 **API Architecture**

### **REST Endpoints** (`/api/v1/*`)

```text
Authentication (Keycloak):
├── POST /api/v1/auth/login      # OIDC redirect
├── GET  /api/v1/auth/user       # JWT profile
└── POST /api/v1/auth/logout     # Token invalidation

Public Content:
├── GET  /api/v1/projects        # Project showcase
├── GET  /api/v1/projects/{slug} # Single project
└── GET  /api/v1/testimonials    # Marquee content

Authenticated (JWT):
├── GET  /api/v1/user/projects   # Enrolled projects
├── POST /api/v1/enrollments     # Enroll project
└── PUT  /api/v1/progress        # Update progress

Admin Only (role: admin):
├── POST /api/v1/admin/projects  # Create project
├── PUT  /api/v1/admin/projects  # Update project
├── DELETE /api/v1/admin/projects# Delete project
├── GET  /api/v1/admin/users     # User management
└── GET  /api/v1/admin/analytics # Dashboard metrics
```

## 🌍 **Network Architecture**

### **Nginx Configuration** (`/etc/nginx/sites-available/edu.conf`)

```nginx
server {
  listen 443 ssl http2;
  server_name edu.yourdomain.com;

  # Static assets (max performance)

  location / {
    root /var/www/edu/public;
    try_files $uri $uri/ /index.html;
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # API proxy to PHP-FPM

  location ~ ^/api/ {
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Authorization $http_authorization;
  }

  # Keycloak proxy

  location /keycloak/ {
    proxy_pass http://127.0.0.1:8080/;
    proxy_set_header Host $host;
  }
}
```

### **PHP-FPM Pool** (`/etc/php/8.3/fpm/pool.d/edu.conf`)

````ini
[edu]
user = www-data
group = www-data
listen = 127.0.0.1:9000
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
```

## 📦 **Keycloak Configuration**

### **Docker Compose** (`docker-compose.keycloak.yml`)

```yaml
version: "3.8"
services:
  keycloak:
    image: quay.io/keycloak/keycloak:25.0
    container_name: keycloak_edu
    environment:
      KC_DB: mariadb
      KC_DB_URL: jdbc:mariadb://mariadb:3306/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: secure_password_123
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin_secure_pass
    ports:
      - "8080:8080"
    depends_on:
      - mariadb
    command: start-dev

  mariadb:
    image: mariadb:11
    environment:
      MYSQL_ROOT_PASSWORD: root_secure_pass
      MYSQL_DATABASE: keycloak
      MYSQL_USER: keycloak
      MYSQL_PASSWORD: secure_password_123
````

### **Realm Configuration** (Admin Console)

```text
Realm: edu-platform
Clients:
├── edu-web-spa (public, SPA redirect URIs)
├── edu-admin (confidential, admin APIs)
Roles:
├── admin (project CRUD, user management)
└── student (content access, progress tracking)
```

## 🚀 **Performance Architecture**

### **Asset Optimization**

```text
✅ WebP/AVIF images (90% compression)
✅ CSS/JS minification (Terser, PostCSS)
✅ Preload critical fonts/CSS
✅ Lazy-load below-fold animations
✅ HTTP/2 Server Push (critical assets)
✅ Brotli compression (Nginx)
```

### **Caching Strategy**

```text
Browser: 1y immutable static assets
Redis: JWT sessions (1h TTL)
MariaDB: Query result caching
CDN: Global static asset distribution
```

## 🔍 **Monitoring \& Observability**

```text
Prometheus + Grafana (Docker stack)
├── Nginx access/error logs
├── PHP-FPM metrics
├── MariaDB slow query log
├── Keycloak audit events
└── Frontend performance (Lighthouse CI)
```

## 🛡️ **Security Hardening**

| Layer       | Controls                                           |
| :---------- | :------------------------------------------------- |
| **Network** | UFW firewall, fail2ban, Cloudflare WAF             |
| **Web**     | HTTP security headers, CSP, referrer-policy        |
| **App**     | Prepared statements, JWT validation, rate limiting |
| **Data**    | MariaDB SSL, Redis AUTH, Keycloak encryption       |

---

**This architecture delivers Hollywood-grade 3D animations at 60fps with enterprise authentication on cost-effective Apache/Nginx VPS infrastructure, optimized for AMD EPYC hosting and semiconductor/AI professional showcase.**
