// BETTER AUTH
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
// LIBRARY
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { nextCookies } from "better-auth/next-js"

const adapter = prismaAdapter(prisma, {
    
    provider: "sqlserver"
})

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (!GOOGLE_CLIENT_ID) throw new Error("Missing required environment variable: GOOGLE_CLIENT_ID")
if (!GOOGLE_CLIENT_SECRET) throw new Error("Missing required environment variable: GOOGLE_CLIENT_SECRET")

export const auth = betterAuth({

    database: adapter,
    user: {
        additionalFields: {
            nativeLanguageId: {
                type: "number",
                required: false,
                defaultValue: 2,
                input: true
            }
        }
    },
    socialProviders: {

        google: {
            prompt: "select_account",
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }
    },

    emailAndPassword: {
        enabled: true
    },

    session: {

        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },

    plugins: [nextCookies()]
});