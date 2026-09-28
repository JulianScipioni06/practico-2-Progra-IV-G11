import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { notify } from '../../src/services/notificationService';
import { createDb } from '../../src/db/connection'; 
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';

vi.mock('../../src/services/notificationService');

describe('NoteService - Ejercicio 6', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
});

it('debería llamar a notify si la nota se crea con pinned en true', () => {
    const nuevaNota = {
        title: 'Nota',
        content: 'prueba',
        pinned: true
    };

    service.createNote(nuevaNota);

    expect(notify).toHaveBeenCalled();
    });
});