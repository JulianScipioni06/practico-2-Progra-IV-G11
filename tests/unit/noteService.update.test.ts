import { describe, it, expect, beforeEach } from "vitest";
import { NoteServiceImpl } from "../../src/services/NoteService";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository"; 
import { createDb } from "../../src/db/connection"; 

describe('NoteService.updateNote (Ejercicio 4)', () => {
    let service: NoteServiceImpl;
    
    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('Actualiza solo el título',  () => {
        const notaOriginal =  service.createNote({
            title: 'Titulo original',
            content: 'Contenido original',
            pinned: false
        });

        const notaActualizada =  service.updateNote(notaOriginal.id, {
            title: 'Titulo nuevo'
        });

        
        expect(notaActualizada).toBeDefined();
        expect(notaActualizada?.id).toBe(notaOriginal.id);
        expect(notaActualizada?.title).toBe('Titulo nuevo'); // Titulo modificado
        //No se deben modificar 
        expect(notaActualizada?.content).toBe('Contenido original'); 
    });
    it ('Actualiza solo el contenido',  () => {
        const notaOriginal = service.createNote({
            title: 'Titulo original',
            content: 'Contenido original',
        });

        const notaActualizada = service.updateNote(notaOriginal.id, {
            content: 'Contenido nuevo'
        });

        expect(notaActualizada).toBeDefined();
        expect(notaActualizada?.id).toBe(notaOriginal.id);
        expect(notaActualizada?.content).toBe('Contenido nuevo'); // Contenido modificado
        //No se deben modificar 
        expect(notaActualizada?.title).toBe('Titulo original');  
    });
    it('Actualiza varios campos',  () => {
        const notaOriginal = service.createNote({
            title: 'Titulo original',
            content: 'Contenido original',
            pinned: false
        });

        const notaActualizada = service.updateNote(notaOriginal.id, {
            title: 'Titulo nuevo',
            content: 'Contenido nuevo',
            pinned: true
        });

        expect(notaActualizada).toBeDefined();
        expect(notaActualizada?.id).toBe(notaOriginal.id);
        expect(notaActualizada?.title).toBe('Titulo nuevo'); // Título modificado
        expect(notaActualizada?.content).toBe('Contenido nuevo'); // Contenido modificado
        expect(notaActualizada?.pinned).toBe(true);
    });
    it ('Actualiza solo el pinned',  () => {
        const notaOriginal = service.createNote({
            title: 'Titulo original',
            content: 'Contenido original',
            pinned: false
        });

        const notaActualizada = service.updateNote(notaOriginal.id, {
            pinned: true
        });

        expect(notaActualizada).toBeDefined();
        expect(notaActualizada?.id).toBe(notaOriginal.id);
        expect(notaActualizada?.pinned).toBe(true);
    });
    it('Devuelve undefined si la nota no existe',  () => {
        const notaActualizada = service.updateNote(999, {
            title: 'Titulo nuevo'
        });
        expect(notaActualizada).toBeUndefined();
    });
});
