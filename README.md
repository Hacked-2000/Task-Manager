# Task Manager (MERN)

Full-stack task management app with JWT auth, MongoDB persistence, and a React dashboard.

## Project Structure

```
Assignment6/
├── TaskManager-Backend/    # Express + TypeScript API
└── TaskManager-Frontend/   # React + Vite UI
```

## Tech Stack

**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt, Joi

**Frontend:** React, Vite, Material UI, Framer Motion, Axios, React Router

## State Management

The frontend uses React Context (`AuthContext` + `TaskContext`) instead of Redux.

For an app this size, global state is limited to auth session and task list CRUD. Context keeps the data flow straightforward without extra boilerplate. If the app grows with notifications, offline sync, or shared caches across many views, moving to Zustand or Redux would make sense.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| POST | `/api/tasks` | Yes | Create a task |
| GET | `/api/tasks?status=` | Yes | List tasks (optional status filter) |
| PATCH | `/api/tasks/:id` | Yes | Update a task |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### Backend

```bash
cd TaskManager-Backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

**Environment variables** (`TaskManager-Backend/.env`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
```

### Frontend

```bash
cd TaskManager-Frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

**Environment variables** (`TaskManager-Frontend/.env`):

```
VITE_API_BASE_URL=https://task-manager-backed-ekvb.onrender.com/api
```

For local dev with a local backend, use `/api` (Vite proxies to `http://localhost:5000`).

## Backend Architecture

- **Models** (`src/models/`) — Mongoose schemas and database queries
- **Validation** (`src/utils/validationSchema.ts`) — Joi schemas for all request validation
- **Routes** (`src/routes/routes.ts`) — All API routes in one file
- **Controllers** (`src/controllers/`) — Request handlers
- **Middleware** (`src/middleware/`) — JWT auth and validation

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| Backend | `npm run dev` | Start dev server with hot reload |
| Backend | `npm run build` | Compile TypeScript |
| Frontend | `npm run dev` | Start Vite dev server |
| Frontend | `npm run build` | Production build |
