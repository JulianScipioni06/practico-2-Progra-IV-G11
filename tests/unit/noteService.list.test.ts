import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNote (Ejercicio 2)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('debería devolver una lista vacía si no hay notas creadas', () => {
        // Act: Llamamos al método que queremos probar
        const notas = service.listNotes();

        // Assert: Forzamos el error a propósito para el commit rojo
        expect(notas.length).toBe(0); 
    });

    it('debería devolver una lista con los elementos guardados', () => {
        //Creamos una nota de prueba
        service.createNote({
            title: 'Aprobar Progra',
            content: 'Terminar el ejercicio 2'
        });

        //Llamamos a la función para listar
        const notas = service.listNotes();

        //Comprobamos que la lista tenga 1 elemento y coincida con lo que creamos
        expect(notas.length).toBe(1);
        expect(notas[0].title).toBe('Aprobar Progra');
        expect(notas[0].content).toBe('Terminar el ejercicio 2');
    });
});
