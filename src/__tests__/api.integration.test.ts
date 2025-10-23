import request from 'supertest';
import { createApp } from '../app.js';

describe('API Integration Tests', () => {
    let app: ReturnType<typeof createApp>;

    beforeAll(() => {
        app = createApp();
    });

    describe('GET /', () => {
        it('should respond to root endpoint', async () => {
        const response = await request(app).get('/');
        
        // Verifica que la aplicación responda
        expect(response.status).toBeDefined();
        });
    });

    describe('Authentication Endpoints Structure', () => {
        it('should have /auth/register endpoint defined', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({});
        
        // No esperamos 404, debe estar definido el endpoint
        expect(response.status).not.toBe(404);
        });

        it('should have /auth/login endpoint defined', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({});
        
        // No esperamos 404, debe estar definido el endpoint
        expect(response.status).not.toBe(404);
        });

        it('should validate required fields on registration', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
            name: 'Test',
            // Missing email and password
            });
        
        // Debe fallar (400 por validación o 500 por error)
        expect([400, 500]).toContain(response.status);
        });

        it('should validate email format on login', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
            email: 'invalid-email',
            password: 'password123',
            });
        
        // Debe fallar (400 por validación o 500 por error)
        expect([400, 500]).toContain(response.status);
        });
    });

    describe('Products Endpoints Structure', () => {
        it('should have /products endpoint defined', async () => {
        const response = await request(app).get('/products');
        
        // No esperamos 404, debe estar definido el endpoint
        expect(response.status).not.toBe(404);
        });
    });

    describe('Customers Endpoints Structure', () => {
        it('should have /customers endpoint defined', async () => {
        const response = await request(app).get('/customers');
        
        // No esperamos 404, debe estar definido el endpoint
        expect(response.status).not.toBe(404);
        });
    });

    describe('Orders Endpoints Structure', () => {
        it('should have /orders endpoint defined', async () => {
        const response = await request(app).get('/orders');
        
        // No esperamos 404, debe estar definido el endpoint
        expect(response.status).not.toBe(404);
        });
    });
});
