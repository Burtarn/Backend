import * as noteService from '../services/notesServices.js';
import * as db from '../config/postgres.js';

jest.mock('../config/postgres', () => ({
    query: jest.fn()
}));

describe('Skapa anteckning', () => {
    test('ska skapa anteckning om userId finns', async () => {
        db.query.mockResolvedValue({
        rows: [{ id: 1, title: 'Test', content: 'Innehåll', user_id: 10 }],
        rowCount: 1
    });

        const result = await noteService.createNote({
        title: 'Test',
        content: 'Innehåll',
        userId: 10
        });

        expect(result.title).toBe('Test');
        expect(result.user_id).toBe(10);
    });

    test('ska kasta fel om query misslyckas', async () => {
        db.query.mockRejectedValue(new Error('DB error'));

        await expect(
        noteService.createNote({ title: 'X', content: 'Y', userId: 10 })
        ).rejects.toThrow('DB error');
    });
});
