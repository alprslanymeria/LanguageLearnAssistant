// BETTER AUTH
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
// LIBRARY
import { nextCookies } from "better-auth/next-js"
import { prisma } from "@/src/infrastructure/persistence/prisma"

const adapter = prismaAdapter(prisma, {
    
    provider: "sqlserver"
})

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

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