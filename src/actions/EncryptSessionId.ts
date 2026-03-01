"use server"

import { encrypt } from "@/src/infrastructure/security/crypto"

export async function encryptSessionId(sessionId: string): Promise<string> {

    const encryptedSessionId = encrypt(sessionId)

    return encodeURIComponent(encryptedSessionId)
}
