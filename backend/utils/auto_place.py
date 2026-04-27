import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_connection

def auto_place():
    conn = get_connection()
    cursor = conn.cursor()

    # Get all items
    cursor.execute("SELECT item_id, preferred_zone, depth FROM Items")
    items = cursor.fetchall()

    for item_id, zone, item_depth in items:
        try:
            # Get container in that zone
            cursor.execute("""
                SELECT container_id
                FROM Containers
                WHERE zone_name = :1
            """, (zone,))
            
            container = cursor.fetchone()

            if not container:
                continue

            container_id = container[0]

            # Get current max depth
            cursor.execute("""
                SELECT NVL(MAX(start_depth), 0)
                FROM Placements
                WHERE container_id = :1
            """, (container_id,))
            
            current_depth = cursor.fetchone()[0]

            new_depth = current_depth + item_depth

            # Insert placement (ONLY valid columns)
            cursor.execute("""
                INSERT INTO Placements (
                    item_id, container_id, start_depth
                )
                VALUES (:1, :2, :3)
            """, (
                item_id,
                container_id,
                new_depth
            ))

        except Exception as e:
            print("ERROR:", e)

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    auto_place()