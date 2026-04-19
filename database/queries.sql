-- =========================
-- 1. VIEW ALL ITEMS
-- =========================
SELECT * FROM Items;

-- =========================
-- 2. FIND ITEM LOCATION
-- =========================
SELECT i.name, p.container_id, c.zone_id
FROM Items i
JOIN Placements p ON i.item_id = p.item_id
JOIN Containers c ON p.container_id = c.container_id;

-- =========================
-- 3. HIGH PRIORITY ITEMS
-- =========================
SELECT name, priority
FROM Items
WHERE priority > 80;

-- =========================
-- 4. EXPIRED ITEMS
-- =========================
SELECT name, expiry_date
FROM Items
WHERE expiry_date < SYSDATE;

-- =========================
-- 5. ITEMS IN CREW ZONE
-- =========================
SELECT i.name, c.container_id
FROM Items i
JOIN Placements p ON i.item_id = p.item_id
JOIN Containers c ON p.container_id = c.container_id
WHERE c.zone_id = 'Z1';

-- =========================
-- 6. COUNT ITEMS PER CONTAINER
-- =========================
SELECT container_id, COUNT(*) AS total_items
FROM Placements
GROUP BY container_id;

-- =========================
-- 7. UNUSED / LOW USAGE ITEMS
-- =========================
SELECT name, usage_limit
FROM Items
WHERE usage_limit < 20;

-- =========================
-- 8. LOG HISTORY
-- =========================
SELECT * FROM Logs ORDER BY timestamp DESC;

-- =========================
-- 9. ITEMS WITH THEIR ZONES
-- =========================
SELECT i.name, z.zone_name
FROM Items i
JOIN Containers c ON i.preferred_zone = c.zone_id
JOIN Zones z ON z.zone_id = c.zone_id;

-- =========================
-- 10. TOTAL ITEMS COUNT
-- =========================
SELECT COUNT(*) FROM Items;