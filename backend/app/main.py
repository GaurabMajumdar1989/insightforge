from fastapi import FastAPI
from app.routers import notes, ai, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="InsightForge Backend")

origins = [
    "http://localhost:5173",                       # local frontend (dev)
    "https://insightforge-two.vercel.app",         # your Vercel site (prod)
    "https://unlifting-zachery-nonhistrionically.ngrok-free.dev"  # ngrok tunnel
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,  # Allow cookies and authentication headers
        allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],     # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
        allow_headers=["*"],     # Allow all headers
)

app.include_router(notes.router)
app.include_router(ai.router)
app.include_router(auth.router)
