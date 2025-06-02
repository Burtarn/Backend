    import pool from '../config/postgres.js';

    export const createUser = async ({ username, hashedPassword }) => {
    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
        [username, hashedPassword]
    );
    return result.rows[0];
    };

    export const findUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
    };


export const deleteUserById = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, username', [id]);
    return result.rows[0]; 
};

export const deleteUserByUsername = async (username) => {
    const result = await pool.query('DELETE FROM users WHERE username = $1 RETURNING id, username', [username]);
    return result.rows[0];
};