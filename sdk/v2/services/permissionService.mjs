// =====================================================
// CREATE
// =====================================================

export function createPermission(db, name) {

    const stmt = db.prepare(
        "INSERT INTO permission (name) VALUES (?)"
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

export function getPermissions(db) {

    const stmt = db.prepare(
        "SELECT * FROM permission ORDER BY id"
    );

    return stmt.all();
}


// =====================================================
// READ (uno)
// =====================================================

export function getPermission(db, id) {

    const stmt = db.prepare(
        "SELECT * FROM permission WHERE id = ?"
    );

    return stmt.get(id);
}


// =====================================================
// UPDATE
// =====================================================

export function updatePermission(db, id, name) {

    const stmt = db.prepare(
        "UPDATE permission SET name = ? WHERE id = ?"
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

export function deletePermission(db, id) {

    const stmt = db.prepare(
        "DELETE FROM permission WHERE id = ?"
    );

    stmt.run(id);

    return {
        deleted: true
    };
}


// =====================================================
// ASIGNAR PERMISO A UN ROL
// =====================================================

export function assignPermission(db, roleId, permissionId) {

    const stmt = db.prepare(`
        INSERT INTO role_permission (role_id, permission_id)
        VALUES (?, ?)
    `);

    stmt.run(roleId, permissionId);

    return {
        assigned: true
    };
}


// =====================================================
// QUITAR PERMISO DE UN ROL
// =====================================================

export function removePermission(db, roleId, permissionId) {

    const stmt = db.prepare(`
        DELETE FROM role_permission
        WHERE role_id = ?
        AND permission_id = ?
    `);

    stmt.run(roleId, permissionId);

    return {
        removed: true
    };
}


// =====================================================
// PERMISOS DE UN ROL
// =====================================================

export function getRolePermissions(db, roleId) {

    const stmt = db.prepare(`
        SELECT
            permission.id,
            permission.name

        FROM permission

        INNER JOIN role_permission
            ON permission.id = role_permission.permission_id

        WHERE role_permission.role_id = ?
    `);

    return stmt.all(roleId);
}


// =====================================================
// PERMISOS DE UN USUARIO
// =====================================================

export function getUserPermissions(db, userId) {

    const stmt = db.prepare(`

        SELECT DISTINCT

            permission.name

        FROM permission

        INNER JOIN role_permission
            ON permission.id = role_permission.permission_id

        INNER JOIN user_role
            ON role_permission.role_id = user_role.role_id

        WHERE user_role.user_id = ?

        ORDER BY permission.name

    `);

    const rows = stmt.all(userId);

    return rows.map(row => row.name);
}


// =====================================================
// VERIFICAR PERMISO
// =====================================================

export function hasPermission(db, userId, permissionName) {

    const permissions = getUserPermissions(db, userId);

    return permissions.includes(permissionName);

}