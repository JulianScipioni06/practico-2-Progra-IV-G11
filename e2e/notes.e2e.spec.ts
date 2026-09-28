import { test, expect } from '@playwright/test';
import { resetAndSeed } from './helpers';

test.describe('API Notes - e2e (Ejercicio 7)', () => {
    test.beforeEach(async ({ baseURL }) => {
        //esto limpia la base y siembra 2 notas fijas antes de cada test
        await resetAndSeed(baseURL as string); 
});

test('Happy Path: debería crear una nota exitosamente', async ({ request }) => {
    const response = await request.post('/notes', {
        data: {
            title: 'estudiar playwright',
            content: 'Para el ejercicio 7',
            pinned: false
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.title).toBe('estudiar playwright');
});

test('Caso de error: debería devolver un 404 al buscar un id que no existe', async ({ request }) => {
    //intentamos buscar una nota con un ID alto
    const response = await request.get('/notes/9999');

    //esperamos que el código de estado http sea un 404
    expect(response.status()).toBe(404);
    });
});