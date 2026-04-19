-- =========================
-- ZONES
-- =========================
INSERT INTO Zones VALUES ('Z1', 'Crew Quarters');
INSERT INTO Zones VALUES ('Z2', 'Airlock');
INSERT INTO Zones VALUES ('Z3', 'Laboratory');
INSERT INTO Zones VALUES ('Z4', 'Storage Bay');
INSERT INTO Zones VALUES ('Z5', 'Medical Bay');

-- =========================
-- CONTAINERS
-- =========================
INSERT INTO Containers VALUES ('C1', 'Z1', 100, 80, 200);
INSERT INTO Containers VALUES ('C2', 'Z1', 120, 90, 200);
INSERT INTO Containers VALUES ('C3', 'Z2', 50, 80, 200);
INSERT INTO Containers VALUES ('C4', 'Z3', 200, 100, 200);
INSERT INTO Containers VALUES ('C5', 'Z4', 150, 100, 200);
INSERT INTO Containers VALUES ('C6', 'Z5', 80, 80, 200);

-- =========================
-- ITEMS
-- =========================
INSERT INTO Items VALUES ('001','Food Packet',10,10,20,5,80,TO_DATE('2025-05-20','YYYY-MM-DD'),30,'Z1');
INSERT INTO Items VALUES ('002','Oxygen Cylinder',15,15,50,30,95,NULL,100,'Z2');
INSERT INTO Items VALUES ('003','First Aid Kit',20,20,10,2,100,TO_DATE('2025-07-10','YYYY-MM-DD'),5,'Z5');
INSERT INTO Items VALUES ('004','Water Bottle',10,10,25,3,70,TO_DATE('2026-01-01','YYYY-MM-DD'),50,'Z1');
INSERT INTO Items VALUES ('005','Tool Kit',30,30,30,8,60,NULL,200,'Z4');
INSERT INTO Items VALUES ('006','Battery Pack',20,20,20,6,85,NULL,500,'Z4');
INSERT INTO Items VALUES ('007','Medical Scanner',40,40,30,12,90,NULL,100,'Z5');
INSERT INTO Items VALUES ('008','Research Sample',15,15,15,2,75,TO_DATE('2025-12-01','YYYY-MM-DD'),20,'Z3');
INSERT INTO Items VALUES ('009','Laptop',25,20,5,2,65,NULL,300,'Z1');
INSERT INTO Items VALUES ('010','Fire Extinguisher',20,20,40,10,95,NULL,50,'Z3');
INSERT INTO Items VALUES ('011','Protein Bars',10,10,10,1,60,TO_DATE('2025-08-15','YYYY-MM-DD'),100,'Z1');
INSERT INTO Items VALUES ('012','CO2 Scrubber',30,30,40,15,85,NULL,200,'Z3');
INSERT INTO Items VALUES ('013','Helmet Visor',20,20,15,3,70,NULL,150,'Z4');
INSERT INTO Items VALUES ('014','Antibiotic Supply',15,15,10,1,95,TO_DATE('2025-09-10','YYYY-MM-DD'),10,'Z5');
INSERT INTO Items VALUES ('015','Solar Panel',100,50,5,20,50,NULL,1000,'Z4');

-- =========================
-- USERS
-- =========================
INSERT INTO Users VALUES ('U1','Astronaut A');
INSERT INTO Users VALUES ('U2','Astronaut B');
INSERT INTO Users VALUES ('U3','Astronaut C');

-- =========================
-- PLACEMENTS (SIMPLE INITIAL)
-- =========================
INSERT INTO Placements (item_id, container_id, start_width, start_depth, start_height, end_width, end_depth, end_height)
VALUES ('001','C1',0,0,0,10,10,20);

INSERT INTO Placements (item_id, container_id, start_width, start_depth, start_height, end_width, end_depth, end_height)
VALUES ('002','C3',0,0,0,15,15,50);

INSERT INTO Placements (item_id, container_id, start_width, start_depth, start_height, end_width, end_depth, end_height)
VALUES ('003','C6',0,0,0,20,20,10);

-- =========================
-- LOGS
-- =========================
INSERT INTO Logs (user_id,item_id,action_type,timestamp)
VALUES ('U1','001','placement',SYSDATE);

INSERT INTO Logs (user_id,item_id,action_type,timestamp)
VALUES ('U2','002','placement',SYSDATE);

-- =========================
-- WASTE (EMPTY FOR NOW)
-- =========================

COMMIT;