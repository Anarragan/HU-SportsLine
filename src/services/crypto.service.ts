import crypto from 'crypto';
import { publicKey, privateKey } from '../config/crypto.config.js';

export class CryptoService {
    static encryptMessage(message: string) {
        // 1. Generar una clave y un IV aleatorios para AES
        const aesKey = crypto.randomBytes(32); // 256 bits
        const iv = crypto.randomBytes(12); // GCM usa 12 bytes

        // 2. Cifrar el mensaje con AES
        const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
        const encrypted = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();

        // 3. Cifrar la clave AES con RSA
        const encryptedAesKey = crypto.publicEncrypt(publicKey, aesKey);

        return {
            encryptedData: encrypted.toString('base64'),
            iv: iv.toString('base64'),
            tag: tag.toString('base64'),
            encryptedKey: encryptedAesKey.toString('base64')
        };
    }

    // Descifrar un mensaje
    static decryptMessage(encryptedObj: {
        encryptedData: string;
        iv: string;
        tag: string;
        encryptedKey: string;
    }) {
        // 1. Descifrar la clave AES con RSA privada
        const aesKey = crypto.privateDecrypt(
            privateKey,
            Buffer.from(encryptedObj.encryptedKey, 'base64')
        );

        // 2. Descifrar el mensaje con AES
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            aesKey,
            Buffer.from(encryptedObj.iv, 'base64')
        );
        decipher.setAuthTag(Buffer.from(encryptedObj.tag, 'base64'));

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encryptedObj.encryptedData, 'base64')),
            decipher.final()
        ]);

        return decrypted.toString('utf8');
    }
}
