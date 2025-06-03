    import pool from "../config/postgres.js";

    export const createTables = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            content VARCHAR(300) NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);

        console.log("✅ Tables created successfully.");
    } catch (err) {
        console.error("❌ Failed to create tables:", err.message);
        throw err;
    }
    };
