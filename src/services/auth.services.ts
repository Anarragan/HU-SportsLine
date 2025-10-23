import bcrypt from 'bcrypt';
import { users } from '../models/users.js';
import { registerSchema , loginSchema, type RegisterDTO, type LoginDTO } from '../schema/auth.schema.js';
import { generateToken, generateRefreshToken } from "../config/jwt.config.js";

export const registerUserService = async (userData: RegisterDTO) => {
    const validation = registerSchema.safeParse(userData);
    if (!validation.success) {
        throw new Error("Invalid user data");
    }

    const existingUser = await users.findOne({ where: { email: userData.email } });
    if (existingUser) throw new Error("Email already in use");

    const password_hash = await bcrypt.hash(userData.password, 10);

    const newUser = await users.create({
        name: userData.name,
        email: userData.email,
        password: password_hash,
        role: (userData as any).role ?? 'user'
    });

    const payload = { id: String(newUser.id), email: newUser.email, role: newUser.role };
    const token = generateToken(payload, '15m');
    if (!token) throw new Error("Failed to generate token");
    const refreshToken = generateRefreshToken(payload, '7d');

    return { user: newUser, token, refreshToken };
}

export const loginUserService = async (userData: LoginDTO) => {
    const validation = loginSchema.safeParse(userData);
    if (!validation.success) {
        throw new Error("Invalid user data");
    }

    const user = await users.findOne({ where: { email: userData.email } });
    if (!user) throw new Error("users not found");

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = { id: String(user.id), email: user.email, role: user.role };
    const token = generateToken(payload, '15m');
    if (!token) throw new Error("Failed to generate token");
    const refreshToken = generateRefreshToken(payload, '7d');
    return { user, token, refreshToken };
}