from fastapi import FastAPI
from .Core.middleware import setup_middleware
from .Routes import auth, admin, club, student

app = FastAPI()

# Setup middleware
setup_middleware(app)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(club.router, prefix="/club", tags=["Club"])
app.include_router(student.router, prefix="/student", tags=["Student"])
