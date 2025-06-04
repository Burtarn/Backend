    import pool from "../config/postgres.js";
    import {
    createNoteSchema,
    updateNoteSchema,
    deleteNoteSchema,
    searchNoteSchema,
    } from "../validators/notesValidator.js";
    import HttpError from "../utils/HttpError.js";

    export const getAllNotes = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM notes");
        res.status(200).json(result.rows);
    } catch (err) {
        next(new HttpError(500, "Kunde inte hämta anteckningarna"));
    }
    };

    export const createNote = async (req, res, next) => {
    const { error } = createNoteSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!userId) return next(new HttpError(401, "userId krävs"));

    try {
        const result = await pool.query(
        "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
        [title, content, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(new HttpError(500, "Kunde inte skapa anteckning"));
    }
    };

export const updateNote = async (req, res, next) => {
    const { error } = updateNoteSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { id, title, content } = req.body;
    const userId = req.user?.id;

    try {

        const noteResult = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);

        if (noteResult.rowCount === 0) {
        return next(new HttpError(404, "Anteckning inte funnen"));
        }

        const note = noteResult.rows[0];
        if (note.user_id !== userId) {
        return next(new HttpError(403, "Du har inte behörighet att uppdatera denna anteckning"));
        }


        const result = await pool.query(
        "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
        [title, content, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(new HttpError(500, "Kunde inte uppdatera anteckning"));
    }
};

export const deleteNote = async (req, res, next) => {
    const { error } = deleteNoteSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { id } = req.body;
    const userId = req.user?.id;

    try {

        const noteResult = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);

        if (noteResult.rowCount === 0) {
        return next(new HttpError(404, "Anteckning inte funnen"));
        }

        const note = noteResult.rows[0];
        if (note.user_id !== userId) {
        return next(new HttpError(403, "Du har inte behörighet att radera denna anteckning"));
        }

        const deleteResult = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);

        res.status(200).json({
        message: "Anteckning borttagen",
        note: deleteResult.rows[0],
        });
    } catch (err) {
        next(new HttpError(500, "Kunde inte ta bort anteckning"));
    }
};

    export const searchNotes = async (req, res, next) => {
    const { error } = searchNoteSchema.validate(req.query);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { query } = req.query;

    try {
        const result = await pool.query("SELECT * FROM notes WHERE title ILIKE $1", [`%${query}%`]);
        res.status(200).json(result.rows);
    } catch (err) {
        next(new HttpError(500, "Kunde inte söka anteckningar"));
    }
    };
