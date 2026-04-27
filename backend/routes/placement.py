from fastapi import APIRouter
from pydantic import BaseModel
from db import get_connection

router = APIRouter()

class PlacementRequest(BaseModel):
    item_id: str
    container_id: str
    start_depth: float

@router.post("/place")
def place_item_api(data: PlacementRequest):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO Placements (item_id, container_id, start_depth)
            VALUES (:1, :2, :3)
        """, (
            data.item_id,
            data.container_id,
            data.start_depth
        ))

        conn.commit()
        return {"message": "Item placed successfully"}

    except Exception as e:
        return {"error": str(e)}

    finally:
        cursor.close()
        conn.close()


# ✅ FIXED RETRIEVE API
@router.post("/retrieve/{item_id}")
def retrieve_item_api(item_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.callproc("retrieve_item", [item_id])
        print("SUCCESS retrieving:", item_id)  # ✅ debug log

        return {
            "status": "success",
            "message": f"Item {item_id} retrieved successfully"
        }

    except Exception as e:
        print("ERROR retrieving:", e)  # ✅ debug log

        return {
            "status": "error",
            "error": str(e)
        }

    finally:
        cursor.close()
        conn.close()