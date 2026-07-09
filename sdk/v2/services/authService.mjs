export function login(db, username, password) {
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    const stmt = db.prepare(sql);
    const user = stmt.get(username, password);

    if (!user) {
        return { status: false, description: "INVALID_CREDENTIALS" };
    }

    return {
        status: true,
        user_id: user.id,
        username: user.username
    };
}