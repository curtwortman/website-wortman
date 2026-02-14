# INTEGRATION.md - System Integration Guide

**Complete integration guide connecting Frontend (GSAP 3D animations), Backend (PHP APIs), Keycloak (enterprise auth), and infrastructure (Nginx/Apache VPS).** Step-by-step code examples for production deployment.

## 🔗 **Integration Architecture Overview**

```text
Browser (SPA) ←→ Nginx (Static/CDN) ←→ Apache/PHP-FPM (APIs)
       ↓                     ↓                      ↓
Keycloak.js ←→ Keycloak Container ←→ MariaDB (Persistent) ←→ Redis (Cache)
```

## 🔐 **Keycloak.js Frontend Integration**

### **1. Environment Configuration** (`.env` or `config.js`)

```javascript
// config/keycloak.js
export const KEYCLOAK_CONFIG = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak.yourvps.com',
  realm: 'edu-platform',
  clientId: 'edu-web-spa'
};

// .env
VITE_KEYCLOAK_URL=https://keycloak.yourvps.com
VITE_API_BASE=https://edu.yourdomain.com/api/v1
```

### **2. Keycloak Initialization** (`main.js`)

```javascript
// Import Keycloak
import Keycloak from "keycloak-js";
import { KEYCLOAK_CONFIG } from "./config/keycloak.js";

class AuthService {
  constructor() {
    this.keycloak = new Keycloak({
      url: KEYCLOAK_CONFIG.url,
      realm: KEYCLOAK_CONFIG.realm,
      clientId: KEYCLOAK_CONFIG.clientId,
    });

    this.init();
  }

  async init() {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      });

      if (authenticated) {
        this.setAuthState(true);
        this.attachTokenInterceptor();
        this.loadUserProfile();
      }
    } catch (error) {
      console.error("Keycloak init failed:", error);
    }
  }

  setAuthState(isAuthenticated) {
    document.body.dataset.authenticated = isAuthenticated;
    if (
      isAuthenticated &&
      this.keycloak.tokenParsed.realm_access.roles.includes("admin")
    ) {
      document.getElementById("secure-access").classList.add("admin-active");
    }
  }

  async loadUserProfile() {
    const profile = await this.keycloak.loadUserProfile();
    document.getElementById("user-profile").textContent =
      profile.firstName + " " + profile.lastName;
  }
}

const auth = new AuthService();
window.auth = auth; // Global access
```

### **3. API Request Interceptor** (Axios/Fetch)

```javascript
// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api/v1",
  timeout: 10000,
});

// Attach Bearer token to all requests
api.interceptors.request.use(async (config) => {
  if (window.auth?.keycloak?.token) {
    const token = await window.auth.keycloak.updateToken(30); // Refresh if <30s
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.auth.keycloak.login();
    }
    return Promise.reject(error);
  },
);

export default api;
```

## 🌐 **Frontend → Backend API Integration**

### **Projects API Calls**

```javascript
// components/ProjectGrid.jsx
import api from "../utils/api.js";

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects?featured=true&limit=6")
      .then((response) => {
        setProjects(response.data.data.projects);
        setLoading(false);
      })
      .catch((error) => console.error("Projects fetch failed:", error));
  }, []);

  if (loading) return <ProjectSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### **Admin Content Management**

```javascript
// admin/AdminDashboard.jsx
async function updateProject(projectId, data) {
  try {
    const response = await api.put(`/admin/projects/${projectId}`, data);
    showToast("Project updated successfully");
    return response.data.data.project;
  } catch (error) {
    if (error.response?.status === 403) {
      showToast("Admin access required");
    }
    throw error;
  }
}
```

## ⏳ **Loading States \& Skeleton Screens**

### **Glassmorphic Skeleton** (`components/Skeleton.jsx`)

```jsx
function ProjectSkeleton() {
  return (
    <div className="glass-effect p-8 rounded-3xl shadow-xl animate-pulse">
      <div className="aspect-video bg-white/5 rounded-2xl mb-6"></div>
      <div className="h-8 bg-white/10 rounded-xl mb-4 w-3/4"></div>
      <div className="h-5 bg-white/5 rounded-full mb-6 w-1/2"></div>
      <div className="flex items-center justify-between">
        <div className="h-8 bg-white/10 rounded-xl w-24"></div>
        <div className="h-12 bg-white/10 rounded-xl w-32"></div>
      </div>
    </div>
  );
}
```

### **Global Loading Overlay**

```css
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

## 🗄️ **Environment Variables**

### **Frontend** (Vite/.env)

```text
VITE_KEYCLOAK_URL=https://keycloak.yourvps.com
VITE_API_BASE=https://edu.yourdomain.com/api/v1
VITE_APP_TITLE=AMD AI Solutions
VITE_ANALYTICS_ID=UA-XXXXX-X
```

### **Backend** (PHP `.env`)

```text
KEYCLOAK_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
DB_HOST=localhost
DB_NAME=edu_platform
DB_USER=edu_user
DB_PASS=secure_password_123
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
APP_SECRET=your_32_char_secret_key_here
```

### **Docker** (docker-compose.yml)

```yaml
environment:
  - KEYCLOAK_PUBLIC_KEY=${KEYCLOAK_PUBLIC_KEY}
  - DB_HOST=mariadb
  - DB_NAME=${DB_NAME}
```

## 🔄 **Error Boundary \& Recovery**

```javascript
// utils/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to Sentry/Keycloak audit
    console.error("Frontend error:", error, errorInfo);

    if (error.message.includes("401")) {
      window.auth.keycloak.login();
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## 📡 **Real-time Updates** (Server-Sent Events)

```javascript
// utils/events.js
const eventSource = new EventSource("/api/v1/events");

eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data);
  if (data.type === "project_updated") {
    // Refresh project list
    fetchProjects();
  }
};
```

## 🎨 **Content Gating** (Role-Based Rendering)

```javascript
// components/GatedContent.jsx
function GatedContent({ children, requiredRole = "student" }) {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (
      window.auth.keycloak?.tokenParsed?.realm_access?.roles?.includes(
        requiredRole,
      )
    ) {
      setHasAccess(true);
    }
  }, []);

  if (!hasAccess) {
    return (
      <div class="glass-effect p-12 text-center rounded-3xl">
        <LockIcon />
        <h3 class="text-2xl font-bold mt-4 mb-2">Secure Content</h3>
        <p class="text-gray-400 mb-6">Login required for technical resources</p>
        <button onClick={() => window.auth.keycloak.login()}>
          Access Content
        </button>
      </div>
    );
  }

  return children;
}
```

## 🚀 **Production Deployment Checklist**

```text
✅ [ ] Keycloak realm/clients configured
✅ [ ] Frontend builds with correct VITE_* vars
✅ [ ] Backend .env loaded (phpdotenv)
✅ [ ] CORS allow-list matches domains
✅ [ ] Nginx proxies /api/* to PHP-FPM
✅ [ ] Redis session store configured
✅ [ ] Skeleton screens visible during loads
✅ [ ] Error boundaries catch 401/403
✅ [ ] Lighthouse CI passes 95+
```

**This INTEGRATION.md provides complete production integration code** connecting GSAP 3D frontend, PHP REST APIs, Keycloak enterprise auth, and Nginx infrastructure with loading states, error handling, and environment management for semiconductor/AI professional platform deployment.
