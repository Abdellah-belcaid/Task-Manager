# Task Manager

📋 **Task Manager – A Comprehensive Full-Stack CRUD Application**

Task Manager is a robust full-stack application designed to streamline task management with a modern tech stack. It features secure JWT-based authentication, role-based access control, and a responsive user interface. Built with Spring Boot and React, it ensures seamless integration between the backend and frontend, while PostgreSQL provides reliable data persistence. The application is fully containerized with Docker, making deployment and scaling effortless.

Whether you're managing personal tasks or collaborating in a team, Task Manager offers a user-friendly experience with essential features like task creation, editing, and deletion, all protected by secure authentication mechanisms.

---

## 🛠️ Tech Stack

### Backend

- **Java 21 + Spring Boot**
- Spring Security (JWT Authentication)
- JPA Hibernate
- PostgreSQL
- Flyway (Database migrations)
- Docker

### Frontend

- **React 19 (with Vite)**
- TypeScript
- React Router DOM
- Axios
- React Query
- Formik + Yup
- Tailwind CSS
- Docker + Nginx

---

## 🚀 Features

### Backend

- JWT-secured user registration & login
- Role-based access control
- CRUD operations for tasks
- Input validation & custom exception handling
- CORS configuration
- Dockerized Spring Boot app
- Flyway-managed database migrations
- Logging with SLF4J

### Frontend

- Login, registration, and protected dashboard
- Task management (list, create, edit, delete)
- Client-side validation with Formik/Yup
- React Router for navigation
- Axios with auth token interceptor
- TailwindCSS for responsive UI
- Dockerized with Nginx for deployment

---

## 📦 Project Structure

```bash
.
├── backend/
│   ├── src/...              # Spring Boot application
│   ├── Dockerfile
├── frontend/
│   ├── src/...              # React application
│   ├── Dockerfile
│   ├── nginx.conf
├── docker-compose.yml
├── README.md
```

---

## 🐳 Getting Started (Dockerized)

Ensure Docker and Docker Compose are installed.

Run the following from the project root:

```bash
docker-compose up --build
```

⏱ Services will be available at:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
- **PostgreSQL**: Accessible on port `5432` (container: `task_manager_postgres`)

---

## ⚙️ Environment Variables

### Local Development (without Docker)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/task_manager_db
    username: admin
    password: admin123
```

### Dockerized Environment

```yaml
spring:
  datasource:
    url: jdbc:postgresql://db:5432/task_manager_db
    username: admin
    password: admin123
```

Other configurations:

```yaml
app:
  jwt:
    secret: "YOUR_SECRET"
    expiration-in-ms: 86400000
```

---

## 🧪 Tests

- ✅ Backend: JUnit & Mockito
- ❌ Frontend: Not implemented (optional)

---

## 🔐 Authentication

### Endpoints

- `POST /api/v1/users/sign-in`
- `POST /api/v1/users/sign-up`

Protected routes require a JWT token in the `Authorization: Bearer <token>` header.

---

## 📝 Flyway

Database schema is versioned and managed with Flyway. Migrations run automatically on application startup.

---

## 📁 Sample Users (for Testing)

| Username | Password | Role  |
| -------- | -------- | ----- |
| admin    | admin123 | ADMIN |
| user     | user1234 | USER  |

---

## 🧠 Architecture Highlights

- Clean code with service/repository/controller layers
- DTO mapping using `TaskMapper`
- Security via custom `JwtAuthenticationFilter` & `SecurityConfiguration`
- Frontend authentication using `useAuth` context with `localStorage`
- Explicit CORS handling (no wildcards)
- Nginx routing fallback for SPA support

---

## 🛠️ GitHub Actions CI Pipeline

The project includes a GitHub Actions CI pipeline to automate testing and building for both the backend and frontend. Below are the defined stages:

#### Backend - Tests

- Runs on `ubuntu-latest`.
- Sets up PostgreSQL as a service.
- Installs dependencies and runs backend tests using Maven.

#### Backend - Build

- Runs on `ubuntu-latest`.
- Depends on the successful completion of the backend tests.
- Builds the backend using Maven.

#### Frontend - Build

- Runs on `ubuntu-latest`.
- Installs dependencies and builds the frontend using Node.js.

This pipeline ensures code quality and seamless integration for both backend and frontend components.
