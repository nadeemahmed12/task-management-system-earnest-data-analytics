# 📋 Task Management System

A full-stack Task Management web application where users can securely register, login, and manage their tasks efficiently.

This project demonstrates real-world concepts like authentication, CRUD operations, pagination, filtering, search, and responsive UI.

---

# 🚀 Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL

## Authentication
- JWT (Access Token)
- Refresh Token
- Protected Routes

---

# ✨ Features

## Authentication
- User registration
- Secure login
- JWT authentication
- Refresh token mechanism
- Logout functionality
- Protected dashboard routes

## Task Management (CRUD)
- Create new task
- Update task
- Delete task
- Toggle task status (Pending / Completed)

## Advanced Features
- Pagination (load tasks page by page)
- Search tasks by title
- Filter tasks by status
- Responsive UI (mobile friendly)
- Toast notifications
- Loading indicators
- Confirmation before delete

---

# ⚙️ Installation

## 1 Clone Repository
- git clone: https://github.com/nadeemahmed12/task-management-system-earnest-data-analytics.git
- cd task-management-system

# 🔧 Backend Setup

Go to backend folder:
- cd backend
- npm install
- Create `.env` file:
- DATABASE_URL="mysql://username:password@localhost:3306/taskdb"
- JWT_SECRET="your_secret_key"
- REFRESH_TOKEN_SECRET="your_refresh_secr
- Run migrations:
- npx prisma migrate dev
- Start backend server:
- npm run dev
- Backend will run on:
- http://localhost:5000

---

# 💻 Frontend Setup
- Open new terminal:
- cd frontend
- npm install
- npm run dev
- Frontend will run on:
- http://localhost:3000

---

# 🔐 API Endpoints

## Auth Routes

### Register
- POST /auth/register
### Login
- POST /auth/login
### Refresh Token
- POST /auth/refresh
### Logout
- POST /auth/logout

---

## Task Routes

### Get Tasks (pagination + search + filter)
- GET /tasks?page=1&search=task&status=true
### Create Task
- POST /tasks
### Update Task
- PUT /tasks/:id
### Delete Task
- DELETE /tasks/:id
### Toggle Task Status
- PATCH /tasks/:id/toggle

## 📸 Screenshots
### Assignment Registeration Page
![Assignment Listing](./screenshots/registration.png)

### Assignment Registeration Success
![Assignment Listing](./screenshots/registration-success.png)


### Assignment Login
![Assignment Listing](./screenshots/login-page.png)

### Assignment Login Success
![Assignment Listing](./screenshots/login-success.png)

### Assignment Dashboard
![Assignment Listing](./screenshots/dashboard-page.png)

### Assignment Task Created
![Assignment Listing](./screenshots/task-created.png)

### Assignment Edit Task
![Assignment Listing](./screenshots/edit-task.png)

### Assignment filtering all
![Assignment Listing](./screenshots/filtering-all.png)

### Assignment filtering pending
![Assignment Listing](./screenshots/filtering-pending.png)

### Assignment filtering Completed
![Assignment Listing](./screenshots/filtering-completed.png)

### Assignment filtering all
![Assignment Listing](./screenshots/filtering-all.png)

### Assignment Searching Page
![Assignment Listing](./screenshots/searching-page.png)

### Assignment Pagination Page
![Assignment Listing](./screenshots/pagination-page.png)

### Assignment Pagination Page Two
![Assignment Listing](./screenshots/pagination-page2.png)

### Assignment Logout Toast
![Assignment Listing](./screenshots/logout-page.png)

### Assignment Registeration New User
![Assignment Listing](./screenshots/registeration-new.png)

### Assignment Login New User
![Assignment Listing](./screenshots/login-new.png)

### Assignment Dashboard New User
![Assignment Listing](./screenshots/dashboard-new.png)

### Assignment Task New User
![Assignment Listing](./screenshots/task-new.png)

### Assignment Responsive ui
![Assignment Listing](./screenshots/responsibe-ui.png)

### Assignment Responsive ui Second
![Assignment Listing](./screenshots/responsibe-ui2.png)





