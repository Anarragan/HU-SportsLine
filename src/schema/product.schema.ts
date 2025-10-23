import zod from 'zod';

export const createProductSchema = zod.object({
    code: zod.string().max(20),
    name: zod.string().max(100),
    description: zod.string().optional(),
    price: zod.number(),
    stock: zod.number(),
    user_id: zod.number()
});

export const updateProductSchema = createProductSchema.partial();