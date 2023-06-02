// @ts-nocheck

const crypto = require('crypto');

export default {
    createHash(password) {
        return crypto.createHmac('sha256', 'paipan').update(password).digest('base64')
    }
};
