import { registerSchema, loginSchema } from '../schema/auth.schema.js';
import { createProductSchema, updateProductSchema } from '../schema/product.schema.js';
import { createCustomerSchema, updateCustomerSchema } from '../schema/customers.schema.js';
import { createOrderSchema, orderItemSchema } from '../schema/order.schema.js';

describe('Schema Validation Tests', () => {
    describe('Auth Schemas', () => {
        describe('registerSchema', () => {
        it('should validate correct registration data', () => {
            const validData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securePassword123',
            };

            const result = registerSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should reject invalid data', () => {
            const invalidData = {
            name: 'A',
            email: 'not-an-email',
            password: '123',
            };

            const result = registerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        });

        describe('loginSchema', () => {
        it('should validate correct login data', () => {
            const validData = {
            email: 'user@example.com',
            password: 'password123',
            };

            const result = loginSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should reject missing fields', () => {
            const invalidData = {
            email: 'user@example.com',
            };

            const result = loginSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        });
    });

    describe('Product Schemas', () => {
        describe('createProductSchema', () => {
        it('should validate correct product data', () => {
            const validData = {
            code: 'PROD001',
            name: 'Test Product',
            description: 'A test product description',
            price: 99.99,
            stock: 100,
            user_id: 1,
            };

            const result = createProductSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should accept product without description', () => {
            const validData = {
            code: 'PROD001',
            name: 'Test Product',
            price: 99.99,
            stock: 100,
            user_id: 1,
            };

            const result = createProductSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should reject missing required fields', () => {
            const invalidData = {
            code: 'PROD001',
            name: 'Test Product',
            // Missing price, stock, user_id
            };

            const result = createProductSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        });

        describe('updateProductSchema', () => {
        it('should validate partial updates', () => {
            const validData = {
            name: 'Updated Product Name',
            };

            const result = updateProductSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should validate all fields for update', () => {
            const validData = {
            code: 'PROD002',
            name: 'Updated Product',
            description: 'Updated description',
            price: 149.99,
            stock: 50,
            user_id: 1,
            };

            const result = updateProductSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should allow empty object for update', () => {
            const result = updateProductSchema.safeParse({});
            expect(result.success).toBe(true);
        });
        });
    });

    describe('Customer Schemas', () => {
        describe('createCustomerSchema', () => {
        it('should validate correct customer data', () => {
            const validData = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '1234567890',
            adress: '123 Main St',
            };

            const result = createCustomerSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should validate customer with only name', () => {
            const validData = {
            name: 'Jane Doe',
            };

            const result = createCustomerSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should reject missing name', () => {
            const invalidData = {
            email: 'jane@example.com',
            phone: '1234567890',
            };

            const result = createCustomerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        });

        describe('updateCustomerSchema', () => {
        it('should validate partial customer updates', () => {
            const validData = {
            name: 'Updated Name',
            };

            const result = updateCustomerSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });
        });
    });

    describe('Order Schemas', () => {
        describe('orderItemSchema', () => {
        it('should validate correct order item', () => {
            const validData = {
            product_id: 1,
            quantity: 2,
            };

            const result = orderItemSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should reject negative quantity', () => {
            const invalidData = {
            product_id: 1,
            quantity: -2,
            };

            const result = orderItemSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it('should reject zero quantity', () => {
            const invalidData = {
            product_id: 1,
            quantity: 0,
            };

            const result = orderItemSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        });

        describe('createOrderSchema', () => {
        it('should validate correct order data', () => {
            const validData = {
            customer_id: 1,
            user_id: 1,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 1 },
            ],
            };

            const result = createOrderSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should reject empty items array', () => {
            const invalidData = {
            customer_id: 1,
            user_id: 1,
            items: [],
            };

            const result = createOrderSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it('should reject missing user_id', () => {
            const invalidData = {
            customer_id: 1,
            items: [{ product_id: 1, quantity: 2 }],
            };

            const result = createOrderSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it('should reject negative customer_id', () => {
            const invalidData = {
            customer_id: -1,
            user_id: 1,
            items: [{ product_id: 1, quantity: 2 }],
            };

            const result = createOrderSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        });
    });
});
