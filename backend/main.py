from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import items, search, placement, waste

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register routes
app.include_router(items.router)
app.include_router(search.router)
app.include_router(placement.router)
app.include_router(waste.router)

@app.get("/")
def home():
    return {"message": "ISS Cargo Backend Running 🚀"}