export function getUserPermissions(db, userId) {
    const sql = `
    SELECT p.name
    FROM permission p
    JOIN role_permission rp ON rp.permission_id = p.id
    JOIN user_role ur ON ur.role_id = rp.role_id
    WHERE ur.user_id = ?
    `;

    const stmt = db.prepare(sql);
    const rows = stmt.all(userId);

    return rows.map(r => r.name);
}

export function hasPermission(db, userId, permissionName) {
    const permissions = getUserPermissions(db, userId);
    return permissions.includes(permissionName);
}