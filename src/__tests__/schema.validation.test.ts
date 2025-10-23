import { registerSchema, loginSchema } from '../schema/auth.schema.js';

describe('Auth Schemas Validation', () => {
    describe('registerSchema', () => {
        it('should validate correct registration data', () => {
            const validData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };

        const result = registerSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
        });

        it('should reject name that is too short', () => {
        const invalidData = {
            name: 'T',
            email: 'test@example.com',
            password: 'password123',
        };

        const result = registerSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject invalid email format', () => {
        const invalidData = {
            name: 'Test User',
            email: 'invalid-email',
            password: 'password123',
        };

        const result = registerSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject password that is too short', () => {
        const invalidData = {
            name: 'Test User',
            email: 'test@example.com',
            password: '12345',
        };

        const result = registerSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject missing required fields', () => {
        const invalidData = {
            name: 'Test User',
        };

        const result = registerSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject name longer than 100 characters', () => {
        const invalidData = {
            name: 'A'.repeat(101),
            email: 'test@example.com',
            password: 'password123',
        };

        const result = registerSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });
    });

    describe('loginSchema', () => {
        it('should validate correct login data', () => {
        const validData = {
            email: 'test@example.com',
            password: 'password123',
        };

        const result = loginSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
        });

        it('should reject invalid email format', () => {
        const invalidData = {
            email: 'invalid-email',
            password: 'password123',
        };

        const result = loginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject password that is too short', () => {
        const invalidData = {
            email: 'test@example.com',
            password: '12345',
        };

        const result = loginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject missing email', () => {
        const invalidData = {
            password: 'password123',
        };

        const result = loginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject missing password', () => {
        const invalidData = {
            email: 'test@example.com',
        };

        const result = loginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });

        it('should reject empty string as email', () => {
        const invalidData = {
            email: '',
            password: 'password123',
        };

        const result = loginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        });
    });
});
