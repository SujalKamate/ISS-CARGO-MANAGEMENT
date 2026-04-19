from fastapi import FastAPI
from db import get_connection

app = FastAPI()

@app.get("/")
def home():
    return {"message": "ISS Cargo Backend Running 🚀"}

@app.get("/items")
def get_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT item_id, name FROM Items")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"items": rows}