// NEXT
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
// TYPES
import { AUTH_COOKIES } from "@/src/infrastructure/auth/authTypes"


// EXTERNALLY ACCESSIBLE URL OF THIS NEXT.JS APP
const APP_URL = process.env.APP_URL


export async function GET(request: NextRequest) {

    const origin = APP_URL

    try {

        const searchParams = request.nextUrl.searchParams

        // GET TOKEN INFOS FROM QUERY PARAMS
        const accessToken = searchParams.get("access_token")
        const accessTokenExpiration = searchParams.get("access_token_expiration")
        const refreshToken = searchParams.get("refresh_token")
        const refreshTokenExpiration = searchParams.get("refresh_token_expiration")

        // IF TOKEN INFOS ARE MISSING, REDIRECT TO LOGIN WITH ERROR MESSAGE
        if (!accessToken || !accessTokenExpiration || !refreshToken || !refreshTokenExpiration) {

            return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent("Google authentication failed")}`)
        }

        const cookieStore = await cookies()

        // SET ACCESS TOKEN AS HTTPONLY COOKIE
        cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {

            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(accessTokenExpiration),
        })

        // SET REFRESH TOKEN AS HTTPONLY COOKIE
        cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, {

            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(refreshTokenExpiration),
        })

        // AFTER TOKENS ARE WRITTEN TO COOKIES, REDIRECT TO HOMEPAGE
        return NextResponse.redirect(`${origin}/`)

    } catch {

        return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent("An unexpected error occurred")}`)
    }
}
