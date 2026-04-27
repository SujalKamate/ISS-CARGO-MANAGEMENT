from fastapi import APIRouter
from db import get_connection

router = APIRouter()

@router.get("/search/{item_name}")
def search_item(item_name: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT i.item_id, i.name, c.container_id
        FROM Items i
        LEFT JOIN Placements p ON i.item_id = p.item_id
        LEFT JOIN Containers c ON p.container_id = c.container_id
        WHERE LOWER(i.name) LIKE :name
    """, {"name": f"%{item_name.lower()}%"})

    rows = cursor.fetchall()

    results = []
    for row in rows:
        results.append({
            "item_id": row[0],
            "name": row[1],
            "container": row[2]
        })

    cursor.close()
    conn.close()

    return {"results": results}


@router.get("/smart-search/{item_id}")
def smart_search(item_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT container_id, start_depth
        FROM Placements
        WHERE item_id = :1
    """, (item_id,))

    result = cursor.fetchone()

    if not result:
        cursor.close()
        conn.close()
        return {"error": "Item not found"}

    container_id, depth = result

    cursor.execute("""
        SELECT COUNT(*)
        FROM Placements
        WHERE container_id = :1
        AND start_depth < :2
    """, (container_id, depth))

    blocking_count = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return {
        "item_id": item_id,
        "container": container_id,
        "retrieval_steps": blocking_count
    }