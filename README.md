# 🔐 SecureTask API

A production-ready secure task management application built with **Next.js (App Router)**, **Prisma ORM**, **Neon PostgreSQL**, and **JWT authentication**.

This project includes:

- Secure backend API
- Role-based access control (RBAC)
- Pagination
- Swagger documentation
- Basic frontend (authentication + dashboard)
- Production deployment

---

## 🚀 Live Demo

🌐 Application:  
https://securetask-api.vercel.app/register  

📄 Swagger API Documentation:  
https://securetask-api.vercel.app/api/docs  

💻 GitHub Repository:  
https://github.com/ranjeetm/securetask-api  

---

## 📌 Features

### 🔑 Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes

### 👑 Role-Based Access Control (RBAC)
- USER role: Manage own tasks
- ADMIN role: Access all tasks
- Secure role validation in backend

### 📋 Task Management
- Create Task
- View Tasks (paginated)
- Delete Task
- Ownership validation
- Admin-only endpoint

### 🖥 Frontend (Basic Supportive UI)
- Register page
- Login page
- Protected dashboard
- JWT stored in localStorage
- CRUD interaction with API
- Error and success messages

### 📦 Backend
- Next.js App Router API routes
- Prisma ORM
- Neon PostgreSQL
- Swagger Documentation
- Production deployment on Vercel

---

## 🏗 Architecture Overview

```
Frontend (Next.js UI)
        ↓
API Routes (Next.js App Router)
        ↓
JWT Authentication Layer
        ↓
Role-Based Access Control
        ↓
Prisma ORM
        ↓
Neon PostgreSQL Database
```

---

## 🛠 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JSON Web Token (jsonwebtoken)
- bcryptjs
- Zod (validation)
- Swagger UI
- Tailwind CSS
- Vercel Deployment

---

## 🔐 Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens are signed using a secret key
- Protected routes validate JWT before execution
- Role-based authorization enforced for admin endpoints
- Environment variables are not exposed in the repository
- Production database credentials stored securely in Vercel

---

## 🧪 API Endpoints

### Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Tasks
- GET /api/v1/tasks (paginated)
- POST /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id

### Admin
- GET /api/v1/tasks/all (Admin only)

---

## ⚙️ Local Setup

Clone repository:

```
git clone https://github.com/ranjeetm/securetask-api.git
cd securetask-api
npm install
```

Create `.env.local`:

```
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Run development server:

```
npm run dev
```

---

## 🌍 Production

- Hosted on Vercel
- Database hosted on Neon PostgreSQL
- Prisma client generated during deployment
- Swagger documentation available publicly

---

## 📜 Purpose

This project was built as part of an internship assignment to demonstrate:

- Backend architecture
- Secure authentication
- Role-based access control
- Database integration
- API design
- Full-stack integration
- Production deployment

---

## 👤 Author

Ranjeet Mathade
