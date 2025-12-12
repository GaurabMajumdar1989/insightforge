InsightForge

InsightForge is a full-stack playground for experiments in JWT authentication, protected content, and AI-enhanced note-taking. It includes a FastAPI backend, a React (Vite) frontend, and a minimalist CRUD system for notes, along with steps toward integration with a text-processing AI.

Features

JWT login & signup with protected routes

Notes CRUD: create, update, delete with a clean API

AI-assisted note prompts: optional summary & insight generation

React frontend built with Vite

FastAPI backend with SQLAlchemy ORM

PostgreSQL ready via SQLAlchemy models and Alembic migrations

Project Structure
InsightForge/
│
├── backend/
│   ├── app/
│   │   ├── routers/       # Auth and Notes API routes
│   │   ├── models/        # SQLAlchemy ORM models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── deps.py        # DB & Auth dependencies
│   │   └── services/      # AI service wrapper
│   ├── alembic/           # Database migrations
│   └── main.py            # FastAPI entrypoint
│
└── frontend/
    ├── src/
    │   ├── pages/         # Login / Signup / Notes pages
    │   ├── components/    # ProtectedRoute etc.
    │   └── services/      # Axios API helpers
    └── vite.config.js

Running the Backend

Inside backend/:

uvicorn app.main:app --reload


Runs at:

http://127.0.0.1:8000


Interactive docs:

http://127.0.0.1:8000/docs

Running the Frontend

Inside frontend/:

npm install
npm run dev


Runs at:

http://127.0.0.1:5173

Environment Variables

Create a .env inside backend/:

DATABASE_URL=postgresql+psycopg2://user:pass@localhost:5432/insightforge
SECRET_KEY=your-secret
JWT_ALGORITHM=HS256


Local SQLite can also be used for development.

Deployment Plan

Frontend to Netlify or Vercel

Backend to Railway, Render, or Fly.io

Database hosted on Neon or Supabase

A Dockerfile and CI/CD steps are coming next as part of the deployment phases.

Roadmap

Refresh token flow

User profile & permission scopes

AI routes for more advanced text understanding

Cloud deployment (Phase 3–6)

Developer Story

InsightForge began as a personal laboratory where I could merge curiosity, engineering practice, and modern web development. Rather than following preset tutorials, I built this project to understand how individual components of a real product fit together: authentication, data flows, protected UI, and integrations with external services.

The project reflects the way I like to work:

start with a minimal feature

understand it deeply

tighten the architecture

iterate with clarity and purpose

I chose FastAPI, JWT, and React (Vite) specifically because they together mirror the foundations of many production systems: asynchronous APIs, stateless authentication, client-side routing, and a clean division between frontend and backend.

Every piece—from Alembic migrations to React route guards—was implemented deliberately rather than pasted in. My goal was to build a small but coherent system that reads cleanly, deploys cleanly, and is easy to reason about.

InsightForge will keep evolving as I add new features, explore patterns, and strengthen the overall engineering shape of the application. More than anything, it represents my habit of learning by building and refining systems that grow one thoughtful layer at a time.
