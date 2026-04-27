import csv
import sys
import os
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_connection

def load_items():
    conn = get_connection()
    cursor = conn.cursor()

    path = "../data/input_items.csv"
    print("File exists:", os.path.exists(path))

    with open(path, "r") as file:
        reader = csv.DictReader(file)

        for row in reader:
            try:
                expiry = row["expiry_date"]

                if expiry in ["", "NULL", "N/A", "########"]:
                    expiry_val = None
                else:
                    expiry_val = datetime.strptime(expiry, "%d-%m-%Y")  # ✅ FIX

                cursor.execute("""
                    INSERT INTO Items (
                        item_id, name, width, depth, height,
                        mass, priority, expiry_date,
                        usage_limit, preferred_zone
                    )
                    VALUES (
                        :1,:2,:3,:4,:5,
                        :6,:7,:8,
                        :9,:10
                    )
                """, (
                    row["item_id"],
                    row["name"],
                    float(row["width_cm"]),
                    float(row["depth_cm"]),
                    float(row["height_cm"]),
                    float(row["mass_kg"]),
                    int(row["priority"]),
                    expiry_val,
                    int(row["usage_limit"]),
                    row["preferred_zone"]
                ))

            except Exception as e:
                print("ERROR:", e)

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    load_items()