-- ===============================
-- SECCIÓN 1: Creación de la Base de Datos y Tablas
-- ===============================
DROP DATABASE IF EXISTS user_file_system_db;
CREATE DATABASE user_file_system_db CHARACTER SET utf8 COLLATE utf8_bin;
USE user_file_system_db;

-- Tabla de usuarios
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Tabla de carpetas (con dueño)
CREATE TABLE folder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_parent_folder INT,
    id_user INT,
    FOREIGN KEY (id_parent_folder) REFERENCES folder(id) ON DELETE SET NULL,
    FOREIGN KEY (id_user) REFERENCES user(id)
);

-- Tabla de archivos (con dueño)
CREATE TABLE file (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20),
    size_kb INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_folder INT,
    id_user INT,
    FOREIGN KEY (id_folder) REFERENCES folder(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user(id)
);

-- ===============================
-- SECCIÓN 2: Datos de prueba
-- ===============================

-- Usuarios
INSERT INTO user (username, password) VALUES
('alice', 'alice123'),
('bob', 'bob123'),
('carol', 'carol123');

-- Carpetas raíz creadas por usuarios
INSERT INTO folder (name, id_user) VALUES
('AliceDocs', 1),
('BobMedia', 2),
('CarolProjects', 3);

-- Subcarpetas
INSERT INTO folder (name, id_parent_folder, id_user) VALUES
('Reports', 1, 1),
('Videos', 2, 2),
('Code', 3, 3);

-- Archivos de cada usuario
INSERT INTO file (name, type, size_kb, created_at, id_folder, id_user) VALUES
('q1_report.pdf', 'pdf', 950, '2024-06-10 09:00:00', 4, 1),
('vacation_video.mp4', 'mp4', 120000, '2024-07-01 12:00:00', 5, 2),
('main_project.zip', 'zip', 10000, '2024-07-05 15:00:00', 6, 3);

-- ===============================
-- SECCIÓN 3: Procedimientos Almacenados
-- ===============================
DELIMITER //

-- Crear carpeta con dueño
CREATE PROCEDURE folder_create(
    IN fname VARCHAR(255),
    IN pid INT,
    IN uid INT
)
BEGIN
    INSERT INTO folder (name, id_parent_folder, id_user)
    VALUES (fname, pid, uid);
END;
//

-- Crear archivo con dueño
CREATE PROCEDURE file_create(
    IN fname VARCHAR(255),
    IN ftype VARCHAR(20),
    IN fsize INT,
    IN fcreated DATETIME,
    IN fid_folder INT,
    IN fuid INT
)
BEGIN
    INSERT INTO file (name, type, size_kb, created_at, id_folder, id_user)
    VALUES (fname, ftype, fsize, fcreated, fid_folder, fuid);
END;
//

-- Buscar archivos por usuario, tipo y fecha mínima
CREATE PROCEDURE search_user_files_by_type_date(
    IN uid INT,
    IN ftype VARCHAR(20),
    IN from_date DATETIME
)
BEGIN
    SELECT f.name AS file_name, f.type, f.size_kb, f.created_at, fol.name AS folder_name
    FROM file f
    JOIN folder fol ON f.id_folder = fol.id
    WHERE f.id_user = uid AND f.type = ftype AND f.created_at >= from_date
    ORDER BY f.created_at DESC;
END;
//

-- Obtener todas las carpetas y subcarpetas de un usuario
CREATE PROCEDURE get_user_folders(IN uid INT)
BEGIN
    SELECT id, name, id_parent_folder, created_at
    FROM folder
    WHERE id_user = uid;
END;
//

DELIMITER ;