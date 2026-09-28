import {describe, it, expect, beforeEach} from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('Integracion: GET /notes/:id (ejercicio 3)', () => {
    let app: any;

    beforeEach(() => {
        app = makeApp(':memory:');
    });

    it('devuelve código 200 y la nota si el id existe', async () => {
        // 1. Creamos la nota con POST
        const resPost = await request(app)
            .post('/notes')
            .send({
                title: 'Nota de integración',
                content: 'Probando GET por ID',
                pinned: false
            });

        const notaId = resPost.body.id;

        // 2. Consultamos la nota con GET
        const resGet = await request(app).get(`/notes/${notaId}`);

        expect(resGet.status).toBe(200);
        expect(resGet.body.id).toBe(notaId);
        expect(resGet.body.title).toBe('Nota de integración');
        expect(resGet.body.content).toBe('Probando GET por ID');
        expect(resGet.body.pinned).toBe(false);
    });

    it('devuelve código 404 si la nota no existe', async () => {
        const resGet = await request(app).get('/notes/999');

        expect(resGet.status).toBe(404);
    });
});

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

    describe('Integracion: DELETE /notes/:id (ejercicio 5)', () => {
    let app: any;

    beforeEach(() => {
        app = makeApp(':memory:');
    });

    it('elimina una nota existente y devuelve codigo 204', async () => {
        const resPost = await request(app)
            .post('/notes')
            .send({
                title: 'Nota a eliminar',
                content: 'Probando DELETE',
                pinned: false
            });

        const notaId = resPost.body.id;

        const resDelete = await request(app).delete(`/notes/${notaId}`);

        expect(resDelete.status).toBe(204);

        // La nota ya no debe existir
        const resGet = await request(app).get(`/notes/${notaId}`);
        expect(resGet.status).toBe(404);
    });

    it('devuelve codigo 404 si la nota no existe', async () => {
        const resDelete = await request(app).delete('/notes/999');

        expect(resDelete.status).toBe(404);
    });
});
})