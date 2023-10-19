import jwt from 'jsonwebtoken';
import fs from 'fs';

export function signJWT(payload: object, expiresIn: string | number) {
    const privateKey = fs.readFileSync('private.key');
    const algorithmType = 'RS256';
    return jwt.sign(
        payload,
        privateKey,
        {
            algorithm: algorithmType,
            expiresIn: expiresIn
        });
}

export function verifyJWT(token: string){
    try {
        const publicKey = fs.readFileSync('public.key');
        const algorithmType = 'RS256';
        const decoded = jwt.verify(token, publicKey, {
            algorithms: [algorithmType]
        });
        return {
            payload: decoded,
            expired: false
        };
    } catch (e) {
        return {
            payload: null,
            expired: true
        };
    }
}