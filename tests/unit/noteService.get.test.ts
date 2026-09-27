import { describe, it, expect, beforeEach } from "vitest";
import { NoteServiceImpl } from "../../src/services/NoteService";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository"; 
import { createDb } from "../../src/db/connection"; 

describe('NoteService.getNote (Ejercicio 3)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('debería retornar la nota correcta cuando el id existe', () => {
        const notaCreada = service.createNote({
            title: 'Nota de prueba',
            content: 'Contenido de prueba',
            pinned: false
        });

        const notaEncontrada = service.getNote(notaCreada.id);

        expect(notaEncontrada).toBeDefined();
        expect(notaEncontrada?.id).toBe(notaCreada.id);
        expect(notaEncontrada?.title).toBe('Nota de prueba');
        expect(notaEncontrada?.content).toBe('Contenido de prueba');
    });

    it('debería retornar undefined cuando el id no existe', () => {
        const resultado = service.getNote(999);
        expect(resultado).toBeUndefined();
    });
});