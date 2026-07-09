// CREATE
export function createUser(db, username, password) {
    const stmt = db.prepare(
        "INSERT INTO user (username, password) VALUES (?, ?)"
    );
    const result = stmt.run(username, password);

    return { id: result.lastInsertRowid, username };
}

// READ
export function getUser(db, id) {
    const stmt = db.prepare("SELECT * FROM user WHERE id = ?");
    return stmt.get(id);
}

// UPDATE
export function updateUser(db, id, username, password) {
    const stmt = db.prepare(
        "UPDATE user SET username = ?, password = ? WHERE id = ?"
    );
    stmt.run(username, password, id);

    return { id, username };
}

// DELETE
export function deleteUser(db, id) {
    const stmt = db.prepare("DELETE FROM user WHERE id = ?");
    stmt.run(id);

    return { deleted: true };
}