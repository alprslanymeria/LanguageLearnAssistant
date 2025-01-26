import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY

// ENCRYPT FUNCTION
export function encrypt(sessionId)
{
    return CryptoJS.AES.encrypt(sessionId, SECRET_KEY).toString();
}

// DECRYPT FUNCTION
export function decrypt(encryptedSessionId)
{
    const bytes = CryptoJS.AES.decrypt(encryptedSessionId, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
}