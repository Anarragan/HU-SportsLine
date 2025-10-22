import bcrypt from 'bcrypt';
import { users } from '../models/users.js';
import type { IRegisterDTO, ILoginDTO } from '../interfaces/auth.DTO.js';
import { generateToken, generateRefreshToken } from "../config/jwt.config.js";

export const registerUserService = async (userData: IRegisterDTO) => {
    if (!userData.email) throw new Error("Email is required");
    if (!userData.name) throw new Error("Name is required");
    if (!userData.password) throw new Error("Password is required");

    const existingUser = await users.findOne({ where: { email: userData.email } });
    if (existingUser) throw new Error("Email already in use");

    const password_hash = await bcrypt.hash(userData.password, 10);

    const newUser = await users.create({
        name: userData.name,
        email: userData.email,
        password: password_hash,
        role: userData.role
    });

    const payload = { id: String(newUser.id), email: newUser.email, role: newUser.role };
    const token = generateToken(payload, '15m');
    const refreshToken = generateRefreshToken(payload, '7d');

    return { user: newUser, token, refreshToken };
}

export const loginUserService = async (userData: ILoginDTO) => {
    const user = await users.findOne({ where: { email: userData.email } });
    if (!user) throw new Error("users not found");

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = { id: String(user.id), email: user.email, role: user.role };
    const token = generateToken(payload, '15m');
    const refreshToken = generateRefreshToken(payload, '7d');
    return { user, token, refreshToken };
}