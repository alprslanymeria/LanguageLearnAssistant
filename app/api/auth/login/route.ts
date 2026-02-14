// NEXT
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
// TYPES
import { AUTH_COOKIES, ApiServiceResult, TokenResponse } from "@/src/infrastructure/auth/authTypes"


const OAUTH_SERVER_URL = process.env.OAUTH_SERVER_URL


export async function POST(request: NextRequest) {

    try {

        const body = await request.json()

        const response = await fetch(`${OAUTH_SERVER_URL}/api/Auth/CreateToken`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const result: ApiServiceResult<TokenResponse> = await response.json()

        if (!response.ok || result.errorMessage) {

            return NextResponse.json(
                { errorMessage: result.errorMessage ?? ["SignIn failed!"] },
                { status: response.status }
            )
        }

        if (!result.data) {

            return NextResponse.json(
                { errorMessage: ["Invalid server response"] },
                { status: 500 }
            )
        }

        const { accessToken, accessTokenExpiration, refreshToken, refreshTokenExpiration } = result.data

        const cookieStore = await cookies()

        // SET ACCESS TOKEN AS HTTPONLY COOKIE
        cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {

            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(accessTokenExpiration),
        })

        // SET REFRESH TOKEN AS HTTPONLY COOKIE
        cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, {
            
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(refreshTokenExpiration),
        })

        return NextResponse.json({ success: true })

    } catch {

        return NextResponse.json(
            { errorMessage: ["An unexpected error occurred"] },
            { status: 500 }
        )
    }
}
