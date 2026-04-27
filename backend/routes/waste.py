from fastapi import APIRouter
from db import get_connection

router = APIRouter()

@router.get("/waste")
def get_waste_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT w.item_id, i.name, w.reason
        FROM Waste w
        JOIN Items i ON w.item_id = i.item_id
    """)

    rows = cursor.fetchall()

    waste = []
    for row in rows:
        waste.append({
            "item_id": row[0],
            "name": row[1],
            "reason": row[2]
        })

    cursor.close()
    conn.close()

    return {"waste_items": waste}


@router.get("/waste/expired")
def get_expired_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT item_id, name, expiry_date
        FROM Items
        WHERE expiry_date IS NOT NULL
        AND expiry_date < SYSDATE
    """)

    rows = cursor.fetchall()

    expired = []
    for row in rows:
        expired.append({
            "item_id": row[0],
            "name": row[1],
            "expiry_date": str(row[2])
        })

    cursor.close()
    conn.close()

    return {"expired_items": expired}