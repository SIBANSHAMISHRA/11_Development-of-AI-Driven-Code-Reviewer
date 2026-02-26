from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routes import review, auth_routes, files, history, github, terminal


# Create tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Code Reviewer API",
    version="2.0.0"
)

# ✅ CORS CONFIGURATION (VERY IMPORTANT)
origins = [
    "http://localhost:5173",   # Vite frontend
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(review.router)
app.include_router(auth_routes.router)
app.include_router(files.router)
app.include_router(history.router)
app.include_router(github.router)
app.include_router(terminal.router)


@app.get("/")
def root():
    return {"message": "AI Code Reviewer Backend Running"}
