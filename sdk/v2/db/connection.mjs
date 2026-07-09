import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';

export function connectDB(path) {

    const dbPath = resolve(path);

    const db = new DatabaseSync(dbPath);

    initDB(db);

    return db;

}

function initDB(db) {

    db.exec(`

    CREATE TABLE IF NOT EXISTS user (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        username TEXT UNIQUE NOT NULL,

        password TEXT NOT NULL

    );



    CREATE TABLE IF NOT EXISTS role (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT UNIQUE NOT NULL

    );



    CREATE TABLE IF NOT EXISTS permission (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT UNIQUE NOT NULL

    );



    CREATE TABLE IF NOT EXISTS user_role (

        user_id INTEGER,

        role_id INTEGER,

        PRIMARY KEY(user_id, role_id)

    );



    CREATE TABLE IF NOT EXISTS role_permission (

        role_id INTEGER,

        permission_id INTEGER,

        PRIMARY KEY(role_id, permission_id)

    );

    `);



    // ===================================================
    // ROLES
    // ===================================================

    const roleCount =
        db.prepare("SELECT COUNT(*) total FROM role").get();

    if (roleCount.total === 0) {

        db.exec(`

            INSERT INTO role(name)

            VALUES

            ('admin'),

            ('user'),

            ('operator');

        `);

    }



    // ===================================================
    // PERMISOS
    // ===================================================

    const permissionCount =
        db.prepare("SELECT COUNT(*) total FROM permission").get();

    if (permissionCount.total === 0) {

        db.exec(`

            INSERT INTO permission(name)

            VALUES

            ('CREATE_USER'),

            ('VIEW_USER'),

            ('UPDATE_USER'),

            ('DELETE_USER'),

            ('CREATE_ROLE'),

            ('VIEW_ROLE'),

            ('UPDATE_ROLE'),

            ('DELETE_ROLE'),

            ('CREATE_PERMISSION'),

            ('VIEW_PERMISSION'),

            ('UPDATE_PERMISSION'),

            ('DELETE_PERMISSION');

        `);

    }



    // ===================================================
    // USUARIOS
    // ===================================================

    const userCount =
        db.prepare("SELECT COUNT(*) total FROM user").get();

    if (userCount.total === 0) {

        db.exec(`

            INSERT INTO user(username,password)

            VALUES

            ('admin','1234'),

            ('juan','1234'),

            ('ana','1234'),

            ('pedro','1234');

        `);

    }



    // ===================================================
    // USER_ROLE
    // ===================================================

    const userRoleCount =
        db.prepare("SELECT COUNT(*) total FROM user_role").get();

    if (userRoleCount.total === 0) {

        db.exec(`

            INSERT INTO user_role(user_id, role_id)

            SELECT u.id, r.id

            FROM user u, role r

            WHERE u.username='admin'

            AND r.name='admin';



            INSERT INTO user_role(user_id, role_id)

            SELECT u.id, r.id

            FROM user u, role r

            WHERE u.username='juan'

            AND r.name='user';



            INSERT INTO user_role(user_id, role_id)

            SELECT u.id, r.id

            FROM user u, role r

            WHERE u.username='ana'

            AND r.name='user';



            INSERT INTO user_role(user_id, role_id)

            SELECT u.id, r.id

            FROM user u, role r

            WHERE u.username='pedro'

            AND r.name='operator';

        `);

    }



    // ===================================================
    // ROLE_PERMISSION
    // ===================================================

    const rolePermissionCount =
        db.prepare("SELECT COUNT(*) total FROM role_permission").get();

    if (rolePermissionCount.total === 0) {

        db.exec(`

            INSERT INTO role_permission(role_id, permission_id)

            SELECT r.id, p.id

            FROM role r, permission p

            WHERE r.name='admin';



            INSERT INTO role_permission(role_id, permission_id)

            SELECT r.id, p.id

            FROM role r, permission p

            WHERE r.name='user'

            AND p.name IN (

                'VIEW_USER'

            );



            INSERT INTO role_permission(role_id, permission_id)

            SELECT r.id, p.id

            FROM role r, permission p

            WHERE r.name='operator'

            AND p.name IN (

                'VIEW_USER',

                'UPDATE_USER'

            );

        `);

    }

    console.log("Base de datos inicializada correctamente.");

}