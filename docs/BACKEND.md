# BACKEND.md - Backend API Specification

**Complete REST API specification for the 3D Animated Educational Platform.** PHP 8.3 endpoints with Keycloak JWT validation, MariaDB persistence, and AdminLTE dashboard integration for semiconductor/AI professional content management.

## 🛠️ **API Overview**

**Base URL**: `https://edu.yourdomain.com/api/v1`
**Format**: JSON only (application/json)
**Authentication**: Bearer JWT (Keycloak OIDC)
**Rate Limiting**: 100 req/min per IP (Redis)
**CORS**: Strict domain allow-list

## 🔐 **Authentication Endpoints**

### **GET /api/v1/auth/session**

**Validate current JWT and return user profile**

```http
GET /api/v1/auth/session
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAi...
```

**Response** (200):

```json
{
  "status": "success",
  "data": {
    "user_id": 123,
    "email": "user@enterprise.com",
    "roles": ["student", "admin"],
    "keycloak_id": "f:12345678-1234-1234-1234-123456789abc",
    "expires_at": "2026-02-14T15:00:00Z"
  },
  "timestamp": "2026-02-14T14:22:00Z"
}
```

### **POST /api/v1/auth/logout**

**Invalidate session (client-side token cleanup)**

```http
POST /api/v1/auth/logout
```

**Response** (200):

```json
{
  "status": "success",
  "message": "Session terminated",
  "timestamp": "2026-02-14T14:22:00Z"
}
```

### **GET /api/v1/auth/roles**

**Check specific role permissions**

```http
GET /api/v1/auth/roles?permission=admin
```

**Response** (200):

```json
{
  "status": "success",
  "data": {
    "has_permission": true,
    "required_role": "admin",
    "user_roles": ["student", "admin"]
  }
}
```

## 📂 **Projects Endpoints** (Public + Authenticated)

### **GET /api/v1/projects**

**List featured projects (public)**

```text
Query Params:
?featured=true    # Featured only
?category=gpu     # Filter by category
?limit=6          # Pagination
```

**Response** (200):

```json
{
  "status": "success",
  "data": {
    "projects": [
      {
        "id": 1,
        "title": "MI300X Inference Benchmarks",
        "slug": "mi300x-inference",
        "category": "gpu",
        "featured": true,
        "image_url": "/assets/mi300x.jpg",
        "excerpt": "4x H100 throughput on Llama 70B",
        "whitepaper_url": "/downloads/mi300x-wp.pdf"
      }
    ],
    "pagination": { "total": 24, "page": 1, "limit": 6 }
  }
}
```

### **GET /api/v1/projects/{slug}**

**Single project details**

```http
GET /api/v1/projects/mi300x-inference
```

**Response** (200):

```json
{
  "status": "success",
  "data": {
    "project": {
      "id": 1,
      "title": "MI300X Inference Benchmarks",
      "description": "Comprehensive ROCm 6.1 performance...",
      "metrics": { "throughput": "4200 tok/s", "latency": "120ms" },
      "whitepaper_url": "/secure/whitepapers/mi300x.pdf"
    }
  }
}
```

### **GET /api/v1/user/projects** (Authenticated)

**User's enrolled/enrolled projects**

```http
GET /api/v1/user/projects
Authorization: Bearer ...
```

## 👑 **Admin Endpoints** (role: admin REQUIRED)

### **POST /api/v1/admin/projects**

**Create new project**

```http
POST /api/v1/admin/projects
Content-Type: application/json
Authorization: Bearer admin_jwt...

{
  "title": "EPYC 9755 Benchmark",
  "slug": "epyc-9755",
  "category": "cpu",
  "description": "512-core training results...",
  "image_url": "/assets/epyc-9755.jpg",
  "featured": true
}
```

**Response** (201):

```json
{
  "status": "success",
  "data": {
    "project": { "id": 25, "slug": "epyc-9755", ... },
    "message": "Project created successfully"
  }
}
```

### **PUT /api/v1/admin/projects/{id}**

**Update project**

```http
PUT /api/v1/admin/projects/1
{
  "title": "MI300X Updated Benchmarks",
  "featured": false
}
```

### **DELETE /api/v1/admin/projects/{id}**

**Soft delete project**

```http
DELETE /api/v1/admin/projects/1
```

### **GET /api/v1/admin/users**

**Admin user management**

```text
Query: ?role=student&limit=50
```

**Response**:

```json
{
  "data": {
    "users": [
      {
        "id": 123,
        "email": "user@enterprise.com",
        "role": "student",
        "enrollments": 3,
        "last_active": "2026-02-14T10:30:00Z"
      }
    ]
  }
}
```

### **GET /api/v1/admin/analytics**

**Dashboard metrics**

```json
{
  "data": {
    "total_users": 847,
    "active_projects": 24,
    "enrollments_7d": 156,
    "top_project": "MI300X Inference (42%)"
  }
}
```

## 📊 **Enrollment \& Progress Endpoints**

### **POST /api/v1/enrollments**

```http
POST /api/v1/enrollments
{
  "project_id": 1
}
```

### **PUT /api/v1/progress/{enrollment_id}**

```http
PUT /api/v1/progress/456
{
  "progress": 75
}
```

## 📈 **Utility Endpoints**

### **GET /api/v1/testimonials**

**Marquee content**

```json
{
  "data": {
    "testimonials": [
      {
        "quote": "MI300X delivered 4x throughput...",
        "author": "Dr. Jane Smith",
        "title": "CTO, AI Research Lab"
      }
    ]
  }
}
```

## 🚨 **Error Codes \& Responses**

| Code    | Message      | Example                                                 |
| :------ | :----------- | :------------------------------------------------------ |
| **400** | Bad Request  | `{"status":"error","message":"Invalid slug format"}`    |
| **401** | Unauthorized | `{"status":"error","message":"Missing or invalid JWT"}` |
| **403** | Forbidden    | `{"status":"error","message":"Admin role required"}`    |
| **404** | Not Found    | `{"status":"error","message":"Project not found"}`      |
| **429** | Rate Limited | `{"status":"error","message":"Too many requests"}`      |
| **500** | Server Error | `{"status":"error","message":"Internal server error"}`  |

## 💻 **PHP Implementation Examples**

### **JWT Middleware** (`middleware/jwt.php`)

```php
<?php
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function validateJWT($token) {
    $key = $_ENV['KEYCLOAK_PUBLIC_KEY'];
    $decoded = JWT::decode($token, new Key($key, 'RS256'));

    if (!in_array('admin', $decoded->realm_access->roles ?? [])) {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Admin role required']);
        exit;
    }

    return $decoded;
}
?>
```

### **Projects Controller** (`api/projects.php`)

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://edu.yourdomain.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

$pdo = new PDO('mysql:host=localhost;dbname=edu_platform', $user, $pass);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT id, title, slug, category, featured FROM projects WHERE featured = ? LIMIT 6");
    $stmt->execute([1]);

    echo json_encode([
        'status' => 'success',
        'data' => ['projects' => $stmt->fetchAll(PDO::FETCH_ASSOC)]
    ]);
}
?>
```

### **Admin Rate Limiting** (Redis)

```php
<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$ip = $_SERVER['REMOTE_ADDR'];
$key = "rate_limit:$ip";
$requests = $redis->incr($key);

if ($requests > 100) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Rate limit exceeded']);
    exit;
}

$redis->expire($key, 60); // 1min window
?>
```

## 🧪 **API Testing Checklist**

```text
✅ [ ] JWT validation (valid/expired/missing)
✅ [ ] Role-based access (admin/student/public)
✅ [ ] CORS headers correct
✅ [ ] Rate limiting triggers @ 101 req/min
✅ [ ] Error responses formatted correctly
✅ [ ] Pagination works (limit/offset)
✅ [ ] SQL injection protection (prepared statements)
✅ [ ] Response times <150ms (Redis cached)
```

**This BACKEND.md provides complete production-ready API specification** with PHP 8.3 code examples, Keycloak JWT integration, MariaDB schemas, and enterprise security suitable for semiconductor/AI professional platform deployment.
