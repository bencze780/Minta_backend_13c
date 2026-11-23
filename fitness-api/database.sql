CREATE DATABASE IF NOT EXISTS fitness_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;

USE fitness_db;

CREATE TABLE IF NOT EXISTS tipusok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS berletek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipus_id INT NOT NULL,
    megnevezes VARCHAR(100) NOT NULL,
    ar INT NOT NULL,
    ervenyes_napok INT NOT NULL,
    diak_kedvezmeny TINYINT(1) NOT NULL,
    CONSTRAINT fk_berletek_tipusok
      FOREIGN KEY (tipus_id) REFERENCES tipusok(id)
);

INSERT IGNORE INTO tipusok (id, nev) VALUES
(1, 'Napijegy'),
(2, 'Alkalmas bérlet'),
(3, 'Időszakos bérlet');

-- A vizsgafeladatban megadott fitness_db.sql használatakor
-- ezt a database.sql fájlt nem szükséges importálni.
-- A táblákhoz tartozó bérletadatokat a feladat adatbázisa tartalmazza.