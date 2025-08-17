# Task Management System

A full-stack **Task Manager Application** built with **Django REST Framework (Backend)** and **React + Vite + Tailwind (Frontend)**.\
The project is divided into two main parts:

- **Backend (Django + DRF)** → Provides secure APIs with JWT authentication, rate limiting, pagination, search, and filtering.
- **Frontend (React + Vite + Tailwind)** → Provides a modern UI with reusable components for login, registration, task management, and logout.

---

## 👂 Project Structure

```
|-- backend
|   |-- authx
|   |-- backend
|   |-- Dockerfile
|   |-- middleware
|   `-- task
|-- frontend
|   |-- dist
|   |-- node_modules
|   |-- public
|   |-- Dockerfile
|   |-- .env
|   `-- src
|-- mount
|-- docker-compose.*.yml
|-- .env.dev
`-- project_ss
```

---

## 🚀 Backend (Django + DRF)

### Features

- **JWT Authentication** system with:
  - Login
  - Register
  - Logout
  - Refresh Token
- **Task Management** APIs (CRUD)
- **Custom RateLimitMiddleware**
- **DRF Throttling** (`DEFAULT_THROTTLE_RATES`)
- **Pagination** (limit/offset & page)
- **Search, Filtering, Date Range, and Ordering**

---

### AuthX Module APIs

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| POST   | `/api/authx/login/`         | Login user & return JWT token  |
| POST   | `/api/authx/logout/`        | Logout user (invalidate token) |
| POST   | `/api/authx/register/`      | Register a new user            |
| POST   | `/api/authx/token/refresh/` | Refresh JWT access token       |

---

### Task Model

| Field         | Type     | Description       |
| ------------- | -------- | ----------------- |
| `id`          | UUID     | Unique identifier |
| `title`       | String   | Task title        |
| `description` | Text     | Task details      |
| `created_on`  | DateTime | Auto timestamp    |

---

### Task APIs

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| GET    | `/api/task/tasks/`      | List all tasks    |
| POST   | `/api/task/tasks/`      | Create a new task |
| GET    | `/api/task/tasks/{id}/` | Get task details  |
| PUT    | `/api/task/tasks/{id}/` | Update a task     |
| DELETE | `/api/task/tasks/{id}/` | Delete a task     |

> ✅ Supports **Search, Filtering, Date Range, Ordering, and Pagination**

---

## 🎨 Frontend (React + Vite + Tailwind)

### Features

- **Reusable Components**:
  - Login Form
  - Register Form
  - Task Create / Update Form (same component)
  - Delete Modal
  - Task Table (custom-built)
- **Authentication**:
  - Login with JWT
  - Refresh token logic (auto logout if refresh also expires)
  - Logout option on homepage
- **Task Management**:
  - Create, Update, Delete, and View tasks
  - Client-side + Server-side search
  - Pagination from backend

---

### Pages

- **Login Page** → [GitHub Link Here]
- **Register Page** → [GitHub Link Here]
- **Home Page** → Logout + Task Table
- **Dashboard** → Manage tasks

---

## ⚙️ Middleware & Rate Limiting

- Added **Custom RateLimitMiddleware**
- Configured **DRF Throttling** with `DEFAULT_THROTTLE_RATES`

---

## 🛠️ Tech Stack

**Backend**: Django, Django REST Framework, JWT\
**Frontend**: React, Vite, TailwindCSS\
**Database**: SQLite / PostgreSQL (configurable)\
**Auth**: JWT (Access + Refresh)

---

## 📌 Setup Instructions

### Clone Repository

```bash
git clone <your-repo-link>
cd task
```

### Environment Setup

```bash
# Rename environment files
mv .env.dev.example .env.dev
mv .env.example .env
```

### Run with Docker

```bash
# Build and start containers
sudo docker-compose -f docker-compose-dev.yml up --build
```

### Access the Application

- **Backend (Django + DRF)** → [http://localhost:8000](http://localhost:8000)
- **Frontend (React + Vite)** → [http://localhost:3000](http://localhost:3000)

Both services will be running inside Docker containers.

---

## ✅ Future Enhancements

- Docker setup for production
- CI/CD pipeline
- Role-based authentication
- Task categories & priorities

