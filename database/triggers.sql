-- =========================
-- TRIGGER: AUTO WASTE
-- =========================
CREATE OR REPLACE TRIGGER mark_waste
AFTER UPDATE ON Items
FOR EACH ROW
BEGIN
    IF :NEW.usage_limit <= 0 THEN
        INSERT INTO Waste (item_id, reason)
        VALUES (:NEW.item_id, 'Out of Uses');
    END IF;
END;
/