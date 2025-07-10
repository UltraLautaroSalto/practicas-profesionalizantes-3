-- ===============================
-- SECCIÓN 1: Creación de la Base de Datos y Tablas
-- ===============================
DROP DATABASE IF EXISTS file_system_db;
CREATE DATABASE file_system_db CHARACTER SET utf8 COLLATE utf8_bin;
USE file_system_db;

-- Tabla de carpetas
CREATE TABLE folder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_parent_folder INT,
    FOREIGN KEY (id_parent_folder) REFERENCES folder(id) ON DELETE SET NULL
);

-- Tabla de archivos
CREATE TABLE file (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20), -- Ej: 'pdf', 'jpg', 'mp4'
    size_kb INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_folder INT,
    FOREIGN KEY (id_folder) REFERENCES folder(id) ON DELETE CASCADE
);

-- ===============================
-- SECCIÓN 2: Datos de prueba
-- ===============================

-- Carpetas raíz
INSERT INTO folder (name) VALUES
('Documents'),
('Media'),
('Projects');

-- Subcarpetas
INSERT INTO folder (name, id_parent_folder) VALUES
('Reports', 1),
('Videos', 2),
('Images', 2),
('Code', 3);

-- Archivos
INSERT INTO file (name, type, size_kb, created_at, id_folder) VALUES
('report_q1.pdf', 'pdf', 1200, '2024-06-10 10:00:00', 4),
('vacation.jpg', 'jpg', 3500, '2024-07-01 14:20:00', 6),
('lecture.mp4', 'mp4', 150000, '2024-06-15 08:30:00', 5),
('project1.zip', 'zip', 10240, '2024-07-05 09:00:00', 7),
('presentation.pptx', 'pptx', 2300, '2024-07-08 13:45:00', 1);

-- ===============================
-- SECCIÓN 3: Procedimientos Almacenados
-- ===============================
DELIMITER //

-- Crear carpeta
CREATE PROCEDURE folder_create(IN fname VARCHAR(255), IN pid INT)
BEGIN
    INSERT INTO folder (name, id_parent_folder)
    VALUES (fname, pid);
END;
//

-- Crear archivo
CREATE PROCEDURE file_create(
    IN fname VARCHAR(255),
    IN ftype VARCHAR(20),
    IN fsize INT,
    IN fcreated DATETIME,
    IN fid_folder INT
)
BEGIN
    INSERT INTO file (name, type, size_kb, created_at, id_folder)
    VALUES (fname, ftype, fsize, fcreated, fid_folder);
END;
//

-- Eliminar carpeta por ID
CREATE PROCEDURE folder_delete(IN fid INT)
BEGIN
    DELETE FROM folder WHERE id = fid;
END;
//

-- Eliminar archivo por ID
CREATE PROCEDURE file_delete(IN fid INT)
BEGIN
    DELETE FROM file WHERE id = fid;
END;
//

-- Buscar archivos por tipo y fecha mínima
CREATE PROCEDURE search_files_by_type_date(
    IN ftype VARCHAR(20),
    IN from_date DATETIME
)
BEGIN
    SELECT f.name AS file_name, f.type, f.size_kb, f.created_at, fol.name AS folder_name
    FROM file f
    JOIN folder fol ON f.id_folder = fol.id
    WHERE f.type = ftype AND f.created_at >= from_date
    ORDER BY f.created_at DESC;
END;
//

DELIMITER ;