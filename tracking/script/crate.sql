CREATE TABLE equipement (
    id VARCHAR(50) PRIMARY KEY,
    position GEO_POINT,
    salle VARCHAR(50),
    timestamp TIMESTAMP GENERATED ALWAYS AS CURRENT_TIMESTAMP
);
INSERT INTO equipement (id,position,salle) values ('test1','POINT (0 0)','inconnu');