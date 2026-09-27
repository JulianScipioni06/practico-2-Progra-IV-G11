import {describe, it, expect, beforeEach} from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('Integracion: PATCH /notes/:id (ejercicio 4)', () => {
    let app: any;

    beforeEach(() => {
        app = makeApp(':memory:');
    })
    it('Actualiza solo el titulo, Devuelve código 200 y la nota actualizada', async () => {
        const resPost = await request(app)
            .post('/notes')
            .send({
                title: 'Titulo original',
                content: 'Contenido original',
                pinned: false
            });
        const notaId = resPost.body.id;
        const resPatch = await request(app)
            .patch(`/notes/${notaId}`)
            .send({
                title: 'Titulo nuevo'
            });
        expect(resPatch.status).toBe(200);
        expect(resPatch.body.id).toBe(notaId);
        expect(resPatch.body.title).toBe('Titulo nuevo');
        expect(resPatch.body.content).toBe('Contenido original');
    });
    it('Devuelve codigo 404 si la nota no existe', async () => {
        const resPatch = await request(app)
            .patch('/notes/999')
            .send({
                title: 'Intento fallido'
            });
        expect(resPatch.status).toBe(404);
    })
})