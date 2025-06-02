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

    const { title, content, userId } = req.body;

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

    try {
        const result = await pool.query(
        "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
        [title, content, id]
        );

        if (result.rowCount === 0) {
        return next(new HttpError(404, "Anteckning inte funnen"));
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(new HttpError(500, "Kunde inte uppdatera anteckning"));
    }
    };

    export const deleteNote = async (req, res, next) => {
    const { error } = deleteNoteSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const { id } = req.body;

    try {
        const result = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
        return next(new HttpError(404, "Anteckning inte funnen"));
        }

        res.status(200).json({ message: "Anteckning borttagen", note: result.rows[0] });
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
