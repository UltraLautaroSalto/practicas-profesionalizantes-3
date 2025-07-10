-- ===============================
-- SECCIÓN 1: Creación de la Base de Datos y Tabla
-- ===============================
DROP DATABASE IF EXISTS countries_db;
CREATE DATABASE countries_db CHARACTER SET utf8 COLLATE utf8_bin;
USE countries_db;

CREATE TABLE country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capital VARCHAR(100),
    language VARCHAR(100),
    area_km2 FLOAT,
    population INT
);

-- ===============================
-- SECCIÓN 2: Datos de prueba
-- ===============================
INSERT INTO country (name, capital, language, area_km2, population) VALUES
('Argentina', 'Buenos Aires', 'Spanish', 2780400, 45376763),
('Germany', 'Berlin', 'German', 357022, 83190556),
('Japan', 'Tokyo', 'Japanese', 377975, 125960000),
('Canada', 'Ottawa', 'English/French', 9984670, 38454327);

-- ===============================
-- SECCIÓN 3: Procedimientos Almacenados
-- ===============================

-- Obtener datos de un país por nombre
DELIMITER //
CREATE PROCEDURE country_get(IN country_name VARCHAR(100))
BEGIN
    SELECT * FROM country WHERE name = country_name;
END;
//

-- Crear un país
CREATE PROCEDURE country_create(
    IN pname VARCHAR(100),
    IN pcapital VARCHAR(100),
    IN planguage VARCHAR(100),
    IN parea FLOAT,
    IN ppopulation INT
)
BEGIN
    INSERT INTO country (name, capital, language, area_km2, population)
    VALUES (pname, pcapital, planguage, parea, ppopulation);
END;
//

-- Editar un país por ID
CREATE PROCEDURE country_update(
    IN pid INT,
    IN pname VARCHAR(100),
    IN pcapital VARCHAR(100),
    IN planguage VARCHAR(100),
    IN parea FLOAT,
    IN ppopulation INT
)
BEGIN
    UPDATE country
    SET name = pname,
        capital = pcapital,
        language = planguage,
        area_km2 = parea,
        population = ppopulation
    WHERE id = pid;
END;
//

-- Eliminar un país por ID
CREATE PROCEDURE country_delete(IN pid INT)
BEGIN
    DELETE FROM country WHERE id = pid;
END;
//
DELIMITER ;