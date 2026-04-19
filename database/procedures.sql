-- =========================
-- PROCEDURE: RETRIEVE ITEM
-- =========================
CREATE OR REPLACE PROCEDURE retrieve_item(p_item_id VARCHAR2) AS
BEGIN
    UPDATE Items
    SET usage_limit = usage_limit - 1
    WHERE item_id = p_item_id;

    INSERT INTO Logs (user_id, item_id, action_type, timestamp)
    VALUES ('U1', p_item_id, 'retrieve', SYSDATE);

    COMMIT;
END;
/

-- =========================
-- PROCEDURE: PLACE ITEM
-- =========================
CREATE OR REPLACE PROCEDURE place_item(
    p_item_id VARCHAR2,
    p_container_id VARCHAR2,
    sw NUMBER, sd NUMBER, sh NUMBER,
    ew NUMBER, ed NUMBER, eh NUMBER
) AS
BEGIN
    INSERT INTO Placements (
        item_id, container_id,
        start_width, start_depth, start_height,
        end_width, end_depth, end_height
    )
    VALUES (
        p_item_id, p_container_id,
        sw, sd, sh,
        ew, ed, eh
    );

    INSERT INTO Logs (user_id, item_id, action_type, timestamp)
    VALUES ('U1', p_item_id, 'placement', SYSDATE);

    COMMIT;
END;
/