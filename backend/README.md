# Node Mongo Auth

## Setup

1. Copy files to a folder.
2. `cp .env.example .env` and edit `.env` (set MONGO_URI and JWT_SECRET).
3. `npm install`
4. `npm run dev` (runs nodemon index.js)

## API endpoints

Base: `http://localhost:5000/api/auth`

- POST `/register`

  - Body JSON: `{ "name":"Alice", "email":"a@a.com", "password":"secret123", "dob":"1990-01-01" }`
  - Response: created user (without password) and sets HTTP-only cookie.

- POST `/login`

  - Body JSON: `{ "email":"a@a.com", "password":"secret123" }`
  - Response: user and sets cookie.

- POST `/logout`

  - Clears cookie.

- GET `/profile`
  - Protected: requires cookie set by login/register.
