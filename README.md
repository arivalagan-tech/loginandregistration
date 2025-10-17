# loginandregistration

**Login & Registration System** built with **React.js (Frontend)** and **Node.js + Express (Backend)**.  
A secure authentication demo implementing **JWT tokens**, **protected routes**, and **data-driven UI** for modern web applications.

---

## 🔎 Project Overview

This project demonstrates a production-style authentication flow:

- User registration (Name, DOB, Email, Password)
- Secure login with **JWT** tokens
- Protected routes and sample data table view after authentication
- Frontend (React) + Backend (Node/Express) + Database (MongoDB)
- Deployed frontend on **Vercel** and backend on **Render/Railway**

**🟢 Live Demo:** [https://your-frontend-demo-url](https://your-frontend-demo-url)  
**💻 Source Code:** [https://github.com/arivalagan-tech/loginandregistration](https://github.com/arivalagan-tech/loginandregistration)

---

## 🧩 Key Features

- 🔐 JWT-based secure authentication  
- 🚀 Protected routes & role-based access  
- ⚙️ Environment-configured API (`REACT_APP_API_URL`)  
- 📱 Responsive modern UI with clean design  
- 📊 Sample protected data table (after login)  
- 🧠 Modular structure for easy scaling & deployment  

---

## 🛠 Tech Stack

| Layer | Technologies Used |
|:------|:------------------|
| **Frontend** | React.js (Vite / CRA), HTML5, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) |
| **Authentication** | JWT Tokens, Protected Routes |
| **Deployment** | Vercel (Frontend), Render / Railway / Fly.io (Backend) |

---

## 📁 Repository Structure

loginandregistration/
├── backend/ # Node.js + Express API
├── frontend/ # React.js Application
├── README.md
└── LICENSE



## ▶️ Run Locally

### 1. Clone Repository
```bash
git clone https://github.com/arivalagan-tech/loginandregistration.git


2. Setup Backend

cd loginandregistration/backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
node index.js


3. Setup Frontend

cd ../frontend
npm install
# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000
npm run dev


4. Access the App

Open the URL shown in your terminal (usually http://localhost:3000 or http://localhost:5173).

🧪 How to Test the Application
Step	Action	Command / Details
1	Clone the repository	git clone https://github.com/arivalagan-tech/loginandregistration.git
2	Go to the backend folder	cd backend
3	Install backend dependencies	npm install
4	Start the backend server	node index.js
5	Go to the frontend folder	cd frontend
6	Install frontend dependencies	npm install
7	Run the frontend dev server	npm run dev
8	Open app in your browser	Visit the URL shown in terminal
9	Register a new user	Fill in: Name, Date of Birth, Email, Password
10	After registration/login	You’ll be redirected to a protected page with a sample data table.






