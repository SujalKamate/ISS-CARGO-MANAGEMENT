from fastapi import APIRouter
from db import get_connection

router = APIRouter()

@router.get("/items")
def get_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT item_id, name FROM Items")
    rows = cursor.fetchall()

    items = []
    for row in rows:
        items.append({
            "item_id": row[0],
            "name": row[1]
        })

    cursor.close()
    conn.close()

    return {"items": items}