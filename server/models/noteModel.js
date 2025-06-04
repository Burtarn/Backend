    import pool from '../config/postgres.js';

    export const findAllNotesByUser = async (userId) => {
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
    return result.rows;
    };

    export const findNoteById = async (id) => {
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    return result.rows[0];
    };

    export const createNote = async ({ title, content, userId }) => {
    const result = await pool.query(
        'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, content, userId]
    );
    return result.rows[0];
    };

    export const updateNote = async ({ id, title, content }) => {
    const result = await pool.query(
        'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id]
    );
    return result.rows[0];
    };

    export const deleteNote = async (id) => {
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
    };

    export const searchNotes = async (userId, query) => {
    const result = await pool.query(
        'SELECT * FROM notes WHERE user_id = $1 AND title ILIKE $2',
        [userId, `%${query}%`]
    );
    return result.rows;
    };
