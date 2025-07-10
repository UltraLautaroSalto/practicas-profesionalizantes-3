-- ===============================
-- SECCIÓN 1: Creación de la Base de Datos y Tablas
-- ===============================
DROP DATABASE IF EXISTS user_access_db;
CREATE DATABASE user_access_db CHARACTER SET utf8 COLLATE utf8_bin;
USE user_access_db;

-- Tabla de usuarios
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Tabla de grupos
CREATE TABLE user_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de permisos
CREATE TABLE permission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255) NOT NULL UNIQUE
);

-- Relación muchos a muchos: usuario - grupo
CREATE TABLE user_user_group (
    id_user INT,
    id_user_group INT,
    PRIMARY KEY (id_user, id_user_group),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_user_group) REFERENCES user_group(id)
);

-- Relación muchos a muchos: grupo - permiso
CREATE TABLE user_group_permission (
    id_user_group INT,
    id_permission INT,
    PRIMARY KEY (id_user_group, id_permission),
    FOREIGN KEY (id_user_group) REFERENCES user_group(id),
    FOREIGN KEY (id_permission) REFERENCES permission(id)
);

-- ===============================
-- SECCIÓN 2: Datos de prueba
-- ===============================

-- Insertar usuarios
INSERT INTO user (username, password) VALUES
('admin', 'admin123'),
('moderator', 'mod123'),
('user1', 'userpass');

-- Insertar grupos
INSERT INTO user_group (name) VALUES
('administrator'),
('moderator'),
('regular');

-- Insertar permisos (acciones de la WebAPI)
INSERT INTO permission (action) VALUES
('/api/uploadVideo'),
('/api/getUserVideos'),
('/api/likeVideo'),
('/api/commentOnVideo'),
('/api/deleteVideo'),
('/api/suspendUser');

-- Asignar usuarios a grupos
INSERT INTO user_user_group (id_user, id_user_group) VALUES
(1, 1), -- admin → administrator
(2, 2), -- moderator → moderator
(3, 3); -- user1 → regular

-- Asignar permisos a grupos
-- Administrador: todos los permisos
INSERT INTO user_group_permission (id_user_group, id_permission)
SELECT 1, id FROM permission;

-- Regular: like, comment, upload, getUserVideos
INSERT INTO user_group_permission (id_user_group, id_permission) VALUES
(3, 1), -- uploadVideo
(3, 2), -- getUserVideos
(3, 3), -- likeVideo
(3, 4); -- commentOnVideo

-- Moderador: solo suspender usuarios
INSERT INTO user_group_permission (id_user_group, id_permission) VALUES
(2, 6); -- suspendUser

-- ===============================
-- SECCIÓN 3: Procedimientos Almacenados
-- ===============================
DELIMITER //

-- Crear usuario
CREATE PROCEDURE user_create(IN uname VARCHAR(100), IN upass VARCHAR(100))
BEGIN
    INSERT INTO user (username, password) VALUES (uname, upass);
END;
//

-- Editar contraseña de usuario
CREATE PROCEDURE user_update_password(IN uid INT, IN newpass VARCHAR(100))
BEGIN
    UPDATE user SET password = newpass WHERE id = uid;
END;
//

-- Eliminar usuario
CREATE PROCEDURE user_delete(IN uid INT)
BEGIN
    DELETE FROM user_user_group WHERE id_user = uid;
    DELETE FROM user WHERE id = uid;
END;
//

-- Crear grupo
CREATE PROCEDURE user_group_create(IN gname VARCHAR(100))
BEGIN
    INSERT INTO user_group (name) VALUES (gname);
END;
//

-- Crear permiso
CREATE PROCEDURE permission_create(IN action_path VARCHAR(255))
BEGIN
    INSERT INTO permission (action) VALUES (action_path);
END;
//

-- Asignar usuario a grupo
CREATE PROCEDURE user_assign_to_group(IN uid INT, IN gid INT)
BEGIN
    INSERT IGNORE INTO user_user_group (id_user, id_user_group)
    VALUES (uid, gid);
END;
//

-- Asignar permiso a grupo
CREATE PROCEDURE group_assign_permission(IN gid INT, IN pid INT)
BEGIN
    INSERT IGNORE INTO user_group_permission (id_user_group, id_permission)
    VALUES (gid, pid);
END;
//

-- Obtener permisos de un usuario por su nombre
CREATE PROCEDURE get_user_permissions(IN uname VARCHAR(100))
BEGIN
    SELECT DISTINCT p.action
    FROM user u
    JOIN user_user_group uug ON u.id = uug.id_user
    JOIN user_group_permission ugp ON uug.id_user_group = ugp.id_user_group
    JOIN permission p ON ugp.id_permission = p.id
    WHERE u.username = uname;
END;
//

DELIMITER ;