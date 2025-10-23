import { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken } from '../config/jwt.config.js';

describe('JWT Configuration Tests', () => {
    const mockUserPayload = {
        id: '1',
        email: 'test@example.com',
        role: 'user',
    };

    describe('Token Generation', () => {
        it('should generate a token successfully', () => {
        const token = generateToken(mockUserPayload, '15m');
        
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token).not.toBeNull();
        });

        it('should generate a refresh token successfully', () => {
        const refreshToken = generateRefreshToken(mockUserPayload, '7d');
        
        expect(refreshToken).toBeDefined();
        expect(typeof refreshToken).toBe('string');
        expect(refreshToken).not.toBeNull();
        });

        it('should generate different tokens for different users', () => {
        const token1 = generateToken(mockUserPayload, '15m');
        const token2 = generateToken({ ...mockUserPayload, id: '2' }, '15m');
        
        expect(token1).not.toBe(token2);
        });
    });

    describe('Token Verification', () => {
        it('should verify a valid token', () => {
        const token = generateToken(mockUserPayload, '15m');
        const payload = verifyToken(token as string);
        
        expect(payload).toBeDefined();
        expect(payload).not.toBeNull();
        expect(payload?.email).toBe(mockUserPayload.email);
        expect(payload?.role).toBe(mockUserPayload.role);
        });

        it('should return null for invalid token', () => {
        const payload = verifyToken('invalid.token.here');
        
        expect(payload).toBeNull();
        });

        it('should verify a valid refresh token', () => {
        const refreshToken = generateRefreshToken(mockUserPayload, '7d');
        const payload = verifyRefreshToken(refreshToken as string);
        
        expect(payload).toBeDefined();
        expect(payload).not.toBeNull();
        expect(payload?.email).toBe(mockUserPayload.email);
        });

        it('should return null for invalid refresh token', () => {
        const payload = verifyRefreshToken('invalid.refresh.token');
        
        expect(payload).toBeNull();
        });
    });

    describe('Token Payload', () => {
        it('should include all user information in token', () => {
        const token = generateToken(mockUserPayload, '15m');
        const payload = verifyToken(token as string);
        
        expect(payload?.id).toBe(mockUserPayload.id);
        expect(payload?.email).toBe(mockUserPayload.email);
        expect(payload?.role).toBe(mockUserPayload.role);
        });

        it('should handle user without id', () => {
        const userWithoutId = {
            email: 'test@example.com',
            role: 'user',
        };
        
        const token = generateToken(userWithoutId, '15m');
        expect(token).toBeDefined();
        expect(token).not.toBeNull();
        });
    });
});
