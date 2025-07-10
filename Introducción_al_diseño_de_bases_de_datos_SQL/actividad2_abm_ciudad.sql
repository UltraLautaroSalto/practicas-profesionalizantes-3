-- ===============================
-- SECCIÓN 1: Creación de la Base de Datos y Tablas
-- ===============================
DROP DATABASE IF EXISTS countries_cities_db;
CREATE DATABASE countries_cities_db CHARACTER SET utf8 COLLATE utf8_bin;
USE countries_cities_db;

-- Tabla de País
CREATE TABLE country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capital VARCHAR(100),
    language VARCHAR(100),
    area_km2 FLOAT,
    population INT
);

-- Tabla de Ciudad
CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    population INT,
    area_km2 FLOAT,
    postal_code VARCHAR(20),
    is_coastal BOOLEAN,
    id_country INT,
    FOREIGN KEY (id_country) REFERENCES country(id)
);

-- ===============================
-- SECCIÓN 2: Datos de prueba
-- ===============================
-- Insertar países
INSERT INTO country (name, capital, language, area_km2, population) VALUES
('Argentina', 'Buenos Aires', 'Spanish', 2780400, 45376763),
('Germany', 'Berlin', 'German', 357022, 83190556),
('Japan', 'Tokyo', 'Japanese', 377975, 125960000),
('Canada', 'Ottawa', 'English/French', 9984670, 38454327);

-- Insertar ciudades
INSERT INTO city (name, population, area_km2, postal_code, is_coastal, id_country) VALUES
('Buenos Aires', 30543000, 203, 'C1000', TRUE, 1),
('Córdoba', 1391000, 576, 'X5000', FALSE, 1),
('Hamburg', 1841179, 755, '20095', TRUE, 2),
('Munich', 1471508, 310.7, '80331', FALSE, 2),
('Tokyo', 13929286, 2194, '100-0001', TRUE, 3),
('Osaka', 2691000, 223, '530-0001', TRUE, 3),
('Toronto', 2731571, 630, 'M5H', TRUE, 4),
('Montreal', 1763000, 431.5, 'H2Y', TRUE, 4);

-- ===============================
-- SECCIÓN 3: Procedimientos Almacenados
-- ===============================
DELIMITER //

-- Crear ciudad
CREATE PROCEDURE city_create(
    IN cname VARCHAR(100),
    IN cpopulation INT,
    IN carea FLOAT,
    IN cpostal_code VARCHAR(20),
    IN ccoastal BOOLEAN,
    IN cid_country INT
)
BEGIN
    INSERT INTO city (name, population, area_km2, postal_code, is_coastal, id_country)
    VALUES (cname, cpopulation, carea, cpostal_code, ccoastal, cid_country);
END;
//

-- Obtener datos de ciudad por nombre
CREATE PROCEDURE city_get(IN cname VARCHAR(100))
BEGIN
    SELECT * FROM city WHERE name = cname;
END;
//

-- Editar ciudad por ID
CREATE PROCEDURE city_update(
    IN cid INT,
    IN cname VARCHAR(100),
    IN cpopulation INT,
    IN carea FLOAT,
    IN cpostal_code VARCHAR(20),
    IN ccoastal BOOLEAN,
    IN cid_country INT
)
BEGIN
    UPDATE city
    SET name = cname,
        population = cpopulation,
        area_km2 = carea,
        postal_code = cpostal_code,
        is_coastal = ccoastal,
        id_country = cid_country
    WHERE id = cid;
END;
//

-- Eliminar ciudad por ID
CREATE PROCEDURE city_delete(IN cid INT)
BEGIN
    DELETE FROM city WHERE id = cid;
END;
//

-- Mostrar el nombre del país que tiene la ciudad más poblada registrada
CREATE PROCEDURE get_country_with_most_populated_city()
BEGIN
    SELECT country.name AS country_name
    FROM city
    INNER JOIN country ON city.id_country = country.id
    ORDER BY city.population DESC
    LIMIT 1;
END;
//

-- Obtener países con ciudades costeras con más de 1 millón de habitantes
CREATE PROCEDURE get_countries_with_large_coastal_cities()
BEGIN
    SELECT DISTINCT country.name AS country_name
    FROM city
    INNER JOIN country ON city.id_country = country.id
    WHERE city.is_coastal = TRUE AND city.population > 1000000;
END;
//

-- Obtener país y ciudad con mayor densidad de población
CREATE PROCEDURE get_highest_density_city()
BEGIN
    SELECT 
        country.name AS country_name,
        city.name AS city_name,
        (city.population / city.area_km2) AS density
    FROM city
    INNER JOIN country ON city.id_country = country.id
    ORDER BY density DESC
    LIMIT 1;
END;
//

DELIMITER ;