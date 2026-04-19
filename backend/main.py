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
@app.post("/retrieve/{item_id}")
def retrieve_item_api(item_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.callproc("retrieve_item", [item_id])
        return {"message": f"Item {item_id} retrieved successfully"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()

from pydantic import BaseModel

class PlacementRequest(BaseModel):
    item_id: str
    container_id: str
    start_width: float
    start_depth: float
    start_height: float
    end_width: float
    end_depth: float
    end_height: float


@app.post("/place")
def place_item_api(data: PlacementRequest):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO Placements (
                item_id, container_id,
                start_width, start_depth, start_height,
                end_width, end_depth, end_height
            )
            VALUES (:1, :2, :3, :4, :5, :6, :7, :8)
        """, (
            data.item_id,
            data.container_id,
            data.start_width,
            data.start_depth,
            data.start_height,
            data.end_width,
            data.end_depth,
            data.end_height
        ))

        conn.commit()

        return {"message": "Item placed successfully"}

    except Exception as e:
        return {"error": str(e)}

    finally:
        cursor.close()
        conn.close()

@app.get("/smart-search/{item_id}")
def smart_search(item_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        # Get target item position
        cursor.execute("""
            SELECT container_id, start_depth
            FROM Placements
            WHERE item_id = :1
        """, (item_id,))
        
        result = cursor.fetchone()

        if not result:
            return {"error": "Item not found"}

        container_id, depth = result

        # Count blocking items (simple logic: items deeper inside)
        cursor.execute("""
            SELECT COUNT(*)
            FROM Placements
            WHERE container_id = :1
            AND start_depth < :2
        """, (container_id, depth))

        blocking_count = cursor.fetchone()[0]

        return {
            "item_id": item_id,
            "container": container_id,
            "retrieval_steps": blocking_count
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        cursor.close()
        conn.close()

# 1) Get expired items (based on expiry_date)
@app.get("/waste/expired")
def get_expired_items():
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT item_id, name, expiry_date
            FROM Items
            WHERE expiry_date IS NOT NULL
            AND expiry_date < SYSDATE
        """)
        rows = cursor.fetchall()
        return {"expired_items": rows}
    finally:
        cursor.close()
        conn.close()


# 2) Get items already marked as waste (by trigger)
@app.get("/waste")
def get_waste_items():
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT w.item_id, i.name, w.reason
            FROM Waste w
            JOIN Items i ON w.item_id = i.item_id
        """)
        rows = cursor.fetchall()
        return {"waste_items": rows}
    finally:
        cursor.close()
        conn.close()