# 🔐 Login & Registration System (MERN Stack Authentication)

A full-stack authentication application built using **React.js**, **Node.js**, **Express.js**, and **MongoDB Atlas**. The project demonstrates secure user registration, login authentication, JWT token management, protected routes, and real-world deployment using **Vercel** and **Render**.

---

## 🌐 Live Demo

### Frontend (Vercel)

https://loginandregistration-one.vercel.app/

### Backend API (Render)

https://loginandregistration-rd3v.onrender.com/

### GitHub Repository

https://github.com/arivalagan-tech/loginandregistration

---

## 📖 Project Overview

This project was developed as a real-world authentication system to demonstrate modern full-stack development practices. It includes secure user registration, login functionality, JWT-based authentication, protected routes, MongoDB integration, and deployment to cloud platforms.

The application follows a production-style architecture where the React frontend communicates with an Express backend API, while MongoDB Atlas securely stores user information.

---

## ✨ Features

* 🔐 Secure User Registration
* 🔑 JWT-Based Authentication
* 🛡 Protected Routes
* 👤 User Profile Access
* 🍪 Cookie & Token Authentication
* 📊 Login History Dashboard
* 📱 Responsive User Interface
* ☁ MongoDB Atlas Integration
* 🚀 Render Backend Deployment
* ⚡ Vercel Frontend Deployment
* 🔄 REST API Architecture
* 📂 Modular Folder Structure

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcrypt
* Cookie Parser
* CORS
* dotenv

### Database

* MongoDB Atlas
* Mongoose ODM

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Cloud Database)

---

## 📁 Project Structure

```text
loginandregistration/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── css/
│   │   └── Images/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── README.md
└── LICENSE
```

## 🔑 Authentication Flow

```text
User Registration
        ↓
Password Hashing (bcrypt)
        ↓
MongoDB Atlas Storage
        ↓
User Login
        ↓
JWT Token Generation
        ↓
Token Stored in Browser
        ↓
Protected Route Access
        ↓
User Dashboard / History Page
```

## 🚀 Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/arivalagan-tech/loginandregistration.git
```

### 2. Backend Setup

```bash
cd loginandregistration/backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
COOKIE_NAME=token
NODE_ENV=development
```

Start Backend:

```bash
node index.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open Application

```text
http://localhost:5173
```

---

## 🧪 Application Testing

### Register User

Fill the following details:

* Name
* Date of Birth
* Email
* Password

Click:

```text
GET STARTED
```

### Login User

Enter:

* Email
* Password

Click:

```text
CONTINUE
```

### Protected Route

After successful authentication:

```text
/history
```

becomes accessible.

---

## 📸 Core Modules

### Registration Module

* User Registration Form
* Input Validation
* Password Encryption
* MongoDB Data Storage

### Login Module

* JWT Authentication
* Secure Session Handling
* Protected Route Access

### History Dashboard

* User Profile Information
* Login Activity View
* Authentication Verification

---

## 🔒 Security Features

* Password Hashing using bcrypt
* JWT Token Authentication
* Protected API Routes
* Environment Variables for Secrets
* Secure MongoDB Atlas Connection
* CORS Configuration
* Authentication Middleware

---

## 📚 Learning Outcomes

Through this project I gained practical experience in:

* React.js Application Development
* Express.js API Development
* MongoDB Atlas Integration
* JWT Authentication
* Protected Routes
* REST API Design
* Cloud Deployment
* Git & GitHub Workflow
* Debugging Production Issues
* Full-Stack MERN Architecture

---

