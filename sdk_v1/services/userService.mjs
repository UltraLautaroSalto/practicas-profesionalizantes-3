export function createUser(db, username, password) {
    const sql = "INSERT INTO user (username, password) VALUES (?, ?) RETURNING id";

    const stmt = db.prepare(sql);
    const row = stmt.get(username, password);

    return {
        id: row.id,
        username,
        password
    };
}