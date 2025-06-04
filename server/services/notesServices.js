import * as noteModel from '../models/noteModel.js';

    export const getAllNotes = async (userId) => {
    return await noteModel.findAllNotesByUser(userId);
    };

    export const createNote = async (data) => {
    return await noteModel.createNote(data);
    };

    export const updateNote = async (data) => {
    return await noteModel.updateNote(data);
    };

    export const deleteNote = async (id) => {
    return await noteModel.deleteNote(id);
    };

    export const searchNotes = async (userId, query) => {
    return await noteModel.searchNotes(userId, query);
    };

    export const findNoteById = async (id) => {
    return await noteModel.findNoteById(id);
    };
