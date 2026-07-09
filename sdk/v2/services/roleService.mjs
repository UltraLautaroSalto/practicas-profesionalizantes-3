// =====================================================
// CREATE
// =====================================================

export function createRole(db, name) {

    const stmt = db.prepare(
        "INSERT INTO role (name) VALUES (?)"
    );

    const result = stmt.run(name);

    return {
        id: result.lastInsertRowid,
        name
    };
}


// =====================================================
// READ (todos)
// =====================================================

export function getRoles(db) {

    const stmt = db.prepare(
        "SELECT * FROM role ORDER BY id"
    );

    return stmt.all();
}


// =====================================================
// READ (uno)
// =====================================================

export function getRole(db, id) {

    const stmt = db.prepare(
        "SELECT * FROM role WHERE id = ?"
    );

    return stmt.get(id);
}


// =====================================================
// UPDATE
// =====================================================

export function updateRole(db, id, name) {

    const stmt = db.prepare(
        "UPDATE role SET name = ? WHERE id = ?"
    );

    stmt.run(name, id);

    return {
        id,
        name
    };
}


// =====================================================
// DELETE
// =====================================================

export function deleteRole(db, id) {

    const stmt = db.prepare(
        "DELETE FROM role WHERE id = ?"
    );

    stmt.run(id);

    return {
        deleted: true
    };
}


// =====================================================
// ASIGNAR ROL A USUARIO
// =====================================================

export function assignRole(db, userId, roleId) {

    const stmt = db.prepare(
        `INSERT INTO user_role (user_id, role_id)
        VALUES (?, ?)`
    );

    stmt.run(userId, roleId);

    return {
        assigned: true
    };
}


// =====================================================
// QUITAR ROL A USUARIO
// =====================================================

export function removeRole(db, userId, roleId) {

    const stmt = db.prepare(
        `DELETE FROM user_role
        WHERE user_id = ?
        AND role_id = ?`
    );

    stmt.run(userId, roleId);

    return {
        removed: true
    };
}


// =====================================================
// OBTENER ROLES DE UN USUARIO
// =====================================================

export function getUserRoles(db, userId) {

    const stmt = db.prepare(`
        SELECT
            role.id,
            role.name
        FROM role

        INNER JOIN user_role
            ON role.id = user_role.role_id

        WHERE user_role.user_id = ?
    `);

    return stmt.all(userId);
}