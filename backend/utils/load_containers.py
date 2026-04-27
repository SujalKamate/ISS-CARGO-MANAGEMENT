import csv
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_connection

def load_containers():
    conn = get_connection()
    cursor = conn.cursor()

    zones = set()

    # READ containers.csv
    with open("../data/containers.csv", "r") as file:
        reader = csv.DictReader(file)

        for row in reader:
            zones.add(row["zone"])

    # INSERT ZONES
    for z in zones:
        try:
            cursor.execute("INSERT INTO Zones VALUES (:1)", (z,))
        except:
            pass

    # INSERT CONTAINERS
    with open("../data/containers.csv", "r") as file:
        reader = csv.DictReader(file)

        for row in reader:
            try:
                cursor.execute("""
                    INSERT INTO Containers
                    (container_id, zone_name, width, depth, height)
                    VALUES (:1, :2, :3, :4, :5)
                """, (
                    row["container_id"],
                    row["zone"],
                    float(row["width_cm"]),
                    float(row["depth_cm"]),
                    float(row["height_cm"])
                ))
            except:
                pass  # skip duplicates

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    load_containers()