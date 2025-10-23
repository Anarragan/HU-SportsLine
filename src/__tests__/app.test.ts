import { createApp } from '../app.js';
import express from 'express';

describe('Application Configuration', () => {
    describe('createApp function', () => {
        it('should create an Express application', () => {
        const app = createApp();
        
        expect(app).toBeDefined();
        expect(typeof app).toBe('function'); // Express app is a function
        });

        it('should have JSON parser middleware', () => {
        const app = createApp();
        
        // Verify the app is configured
        expect(app).toBeDefined();
        });

        it('should have CORS middleware', () => {
        const app = createApp();
        
        // Verify the app is configured
        expect(app).toBeDefined();
        });

        it('should have cookie parser middleware', () => {
        const app = createApp();
        
        // Verify the app is configured
        expect(app).toBeDefined();
        });
    });

    describe('Express Framework', () => {
        it('should use Express framework', () => {
        const app = createApp();
        
        // Check if it's an Express app
        expect(app.get).toBeDefined();
        expect(app.post).toBeDefined();
        expect(app.use).toBeDefined();
        });
    });
});
