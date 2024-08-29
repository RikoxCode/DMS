// @ts-ignore
const config = require('../../../dms.config.json');
// @ts-ignore
import * as crypto from 'crypto';

export class Hasher {
    private static salt: string;

    static {
        this.salt = config.backendConfig.authConfig.hashSalt;
    }

    static hash(password: string) {
        return crypto.hash('sha256', this.salt + password + this.salt, 'hex');
    }

    static compare(password: string, hash: string) {
        return this.hash(password) === hash;
    }
}