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
@app.get("/search/{item_name}")
def search_item(item_name: str):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
    SELECT i.item_id, i.name, c.container_id, c.zone_id
    FROM Items i
    LEFT JOIN Placements p ON i.item_id = p.item_id
    LEFT JOIN Containers c ON p.container_id = c.container_id
    WHERE LOWER(i.name) LIKE :name
    """

    cursor.execute(query, {"name": f"%{item_name.lower()}%"})
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"results": rows}