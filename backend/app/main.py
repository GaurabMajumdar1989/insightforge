from fastapi import FastAPI
from app.routers import notes, ai, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="InsightForge Backend")

# origins = [
#             "http:/localhost:5173",
#             "http:/127.0.0.1:8000",
#             "http:127.0.0.1:5432"
#           ]

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,  # Allow cookies and authentication headers
        allow_methods=["*"],     # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
        allow_headers=["*"],     # Allow all headers
)

app.include_router(notes.router)
app.include_router(ai.router)
app.include_router(auth.router)
