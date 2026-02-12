# 🔐 SecureTask RBAC API

A production-ready secure task management backend built using **Next.js (App Router)**, **Prisma ORM**, **Neon PostgreSQL**, and **JWT authentication**.

---

## 🚀 Live Deployment

**Swagger API Documentation:**  
👉 https://securetask-api.vercel.app/api/docs  

**Base API URL:**  
👉 https://securetask-api.vercel.app  

---

## 📌 Features

- User Registration & Login
- Secure Password Hashing (bcrypt)
- JWT Authentication
- Role-Based Access Control (USER / ADMIN)
- Task CRUD Operations
- Pagination Support
- Admin-only endpoints
- Swagger API Documentation
- Production Deployment on Vercel
- Cloud Database (Neon PostgreSQL)

---

## 🏗 Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JSON Web Token (jsonwebtoken)
- Zod (Validation)
- Swagger UI
- Vercel Deployment

---

## 🔐 Authentication

All protected routes require:

Authorization: Bearer <your_jwt_token>

---

## 📂 Project Structure

src/
 ├── app/api/v1
 │    ├── auth
 │    ├── tasks
 ├── lib
 │    ├── prisma.ts
 │    ├── auth.ts
 │    ├── swagger.ts
prisma/
 └── schema.prisma

---

## 🧪 API Endpoints

### 🔑 Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### 📋 Tasks
- GET /api/v1/tasks (paginated)
- POST /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id

### 👑 Admin
- GET /api/v1/tasks/all (Admin only)

---

## ⚙️ Local Setup

Clone the repository:

git clone <your-repo-url>
cd securetask-api
npm install

Create a `.env` file in the root:

DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key

Run the development server:

npm run dev

---

## 📦 Production

Deployed on **Vercel** with **Neon PostgreSQL**.

---

## 📜 License

Created for internship evaluation purposes.
