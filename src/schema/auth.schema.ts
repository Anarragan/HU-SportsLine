import zod from 'zod';

export const registerSchema = zod.object({
    name: zod.string().min(2).max(100),
    email: zod.string().email(),
    password: zod.string().min(6).max(100),
});

export const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(100),
});

export type RegisterDTO = zod.infer<typeof registerSchema>;
export type LoginDTO = zod.infer<typeof loginSchema>;