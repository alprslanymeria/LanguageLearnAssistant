// NEXT
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
// TYPES
import { AUTH_COOKIES } from "@/src/infrastructure/auth/authTypes"


const OAUTH_SERVER_URL = process.env.OAUTH_SERVER_URL


export async function POST() {

    try {

        const cookieStore = await cookies()
        const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value

        // REVOKE REFRESH TOKEN ON OAUTH SERVER
        if (refreshToken) {

            await fetch(`${OAUTH_SERVER_URL}/api/Auth/RevokeRefreshToken`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Token: refreshToken })
            })
        }

        // CLEAR AUTH COOKIES
        cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN)
        cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN)

        return NextResponse.json({ success: true })

    } catch {

        return NextResponse.json(
            { errorMessage: ["An unexpected error occurred"] },
            { status: 500 }
        )
    }
}
