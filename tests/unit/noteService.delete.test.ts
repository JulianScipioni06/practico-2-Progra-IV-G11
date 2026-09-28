import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
    });

    it('elimina una nota existente y devuelve true', () => {
        const note = service.createNote({ title: 'Comprar pan', content: 'Antes de las 20hs' });
        const resultado = service.deleteNote(note.id);

        expect(resultado).toBe(true);
        expect(service.listNotes()).toHaveLength(0);
    });

    it('devuelve false si el id no existe', () => {
        const resultado = service.deleteNote(999)

        expect(resultado).toBe(false);
    });
});