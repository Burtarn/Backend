    import * as noteService from '../services/notesServices.js';
    import {
    createNoteSchema,
    updateNoteSchema,
    deleteNoteSchema,
    searchNoteSchema,
    } from '../validators/notesValidator.js';
    import HttpError from '../utils/HttpError.js';

    export const getAllNotes = async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return next(new HttpError(401, "userId krävs"));
    try {
        const notes = await noteService.getAllNotes(userId);
        res.status(200).json(notes);
    } catch (err) {
        next(new HttpError(500, "Kunde inte hämta anteckningarna"));
    }
    };

    export const createNote = async (req, res, next) => {
    const { error } = createNoteSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const userId = req.user?.id;
    if (!userId) return next(new HttpError(401, "userId krävs"));

    try {
        const newNote = await noteService.createNote({
        ...req.body,
        userId,
        });
        res.status(201).json(newNote);
    } catch (err) {
        next(new HttpError(500, "Kunde inte skapa anteckning"));
    }
    };

    export const updateNote = async (req, res, next) => {
    const { error } = updateNoteSchema.validate(req.body);
    if (error) return next(new HttpError(400, error.details[0].message));

    const id = req.params.id;
    const userId = req.user?.id;

    try {
        const existingNote = await noteService.findNoteById(id);
        if (!existingNote) {
        return next(new HttpError(404, "Anteckning inte funnen"));
        }

        if (existingNote.user_id !== userId) {
        return next(new HttpError(403, "Du har inte behörighet att uppdatera denna anteckning"));
        }

        const updatedNote = await noteService.updateNote({
        id,
        ...req.body,
        });

        res.status(200).json(updatedNote);
    } catch (err) {
        next(new HttpError(500, "Kunde inte uppdatera anteckning"));
    }
    };

    export const deleteNote = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user?.id;

    try {
        const note = await noteService.findNoteById(id);
        if (!note) {
        return next(new HttpError(404, "Anteckning inte funnen"));
        }

        if (note.user_id !== userId) {
        return next(new HttpError(403, "Du har inte behörighet att radera denna anteckning"));
        }

        const deletedNote = await noteService.deleteNote(id);

        res.status(200).json({
        message: "Anteckning borttagen",
        note: deletedNote,
        });
    } catch (err) {
        next(new HttpError(500, "Kunde inte ta bort anteckning"));
    }
    };

    export const searchNotes = async (req, res, next) => {
    const { error } = searchNoteSchema.validate(req.query);
    if (error) return next(new HttpError(400, error.details[0].message));

    const userId = req.user?.id;
    const { query } = req.query;

    if (!userId) return next(new HttpError(401, "userId krävs"));

    try {
        const notes = await noteService.searchNotes(userId, query);
        res.status(200).json(notes);
    } catch (err) {
        next(new HttpError(500, "Kunde inte söka anteckningar"));
    }
    };
