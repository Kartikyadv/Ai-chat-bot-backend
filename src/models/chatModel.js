const db = require('../config/db');

// Save a chat message
async function saveChat(email, userMessage, aiResponse) {
    const query = `
        INSERT INTO chats (email, user_message, ai_response)
        VALUES (?, ?, ?)
    `;
    const values = [email, userMessage, aiResponse];
    const [result] = await db.execute(query, values);
    return result;
}

// Get chat history for a user
async function getChatHistory(email) {
    const query = `
        SELECT user_message, ai_response, timestamp
        FROM chats
        WHERE email = ?
        ORDER BY timestamp ASC
    `;
    const [rows] = await db.execute(query, [email]);
    return rows;
}

// Find or create a user
async function findOrCreateUser(email) {
    // Check if the user already exists
    const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length > 0) {
        return user[0]; // Return the existing user
    }

    // If the user doesn't exist, create a new user
    const [result] = await db.execute('INSERT INTO users (email) VALUES (?)', [email]);
    return { id: result.insertId, email };
}

module.exports = {
    saveChat,
    getChatHistory,
    findOrCreateUser
};