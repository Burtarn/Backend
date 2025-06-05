import { Router } from 'express';
import {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes
} from '../controllers/notesController.js';

import authMiddleware from '../middleware/AuthMiddleware.js';
import validate from '../middleware/validate.js';
import {
    createNoteSchema,
    updateNoteSchema,
    deleteNoteSchema,
    searchNoteSchema,
    noteIdParamSchema
} from '../validators/notesValidator.js';

const router = Router();

router.use(authMiddleware); 

router.get('/', getAllNotes);
router.post('/', validate(createNoteSchema), createNote);
router.put('/:id', validate(noteIdParamSchema, 'params'), validate(updateNoteSchema), updateNote);
router.delete('/:id', validate(noteIdParamSchema, 'params'), deleteNote);
router.get('/search', validate(searchNoteSchema, 'query'), searchNotes);

export default router;
