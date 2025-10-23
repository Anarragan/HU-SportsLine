import zod from 'zod';

export const createCustomerSchema = zod.object({
    name: zod.string().max(100),
    email: zod.string().max(100).optional(),
    phone: zod.string().max(20).optional(),
    adress: zod.string().max(150).optional(),
    created_at: zod.date().optional(),
    updated_at: zod.date().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();