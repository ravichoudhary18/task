# Task Management System

A full-stack **Task Manager Application** built with **React + Vite + Tailwind (Frontend)** and **Django REST Framework (Backend)**.\
The project is divided into two main parts:

- **Frontend (React + Vite + Tailwind)** → Provides a modern UI with reusable components for login, registration, task management, and logout.
- **Backend (Django + DRF)** → Provides secure APIs with JWT authentication, rate limiting, pagination, search, and filtering.

---

## 👂 Frontend Project Structure

```
|-- frontend
|   |-- dist
|   |-- node_modules
|   |-- public
|   |-- Dockerfile
|   |-- .env
|   `-- src
```

---

## 🎨 Frontend Features

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

## 🛠️ Tech Stack

**Frontend**: React, Vite, TailwindCSS

