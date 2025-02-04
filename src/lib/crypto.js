import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY
// const SECRET_KEY = "aRfiXpNLzT6ZRGN7flPJaFK9PDNafGHmAJHzGTGUGA"

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