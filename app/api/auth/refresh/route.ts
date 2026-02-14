// NEXT
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
// TYPES
import { AUTH_COOKIES, ApiServiceResult, TokenResponse } from "@/src/infrastructure/auth/authTypes"


const OAUTH_SERVER_URL = process.env.OAUTH_SERVER_URL


export async function POST(request: NextRequest) {

    try {

        const cookieStore = await cookies()
        const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value

        if (!refreshToken) {

            return NextResponse.json(
                { errorMessage: ["No refresh token available"] },
                { status: 401 }
            )
        }

        const response = await fetch(`${OAUTH_SERVER_URL}/api/Auth/CreateTokenByRefreshToken`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Token: refreshToken }),
        })

        const result: ApiServiceResult<TokenResponse> = await response.json()

        if (!response.ok || result.errorMessage) {

            // REFRESH TOKEN IS INVALID, CLEAR COOKIES
            cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN)
            cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN)

            return NextResponse.json(
                { errorMessage: result.errorMessage ?? ["Token refresh failed"] },
                { status: 401 }
            )
        }

        if (!result.data) {

            return NextResponse.json(
                { errorMessage: ["Invalid server response"] },
                { status: 500 }
            )
        }

        const { accessToken, accessTokenExpiration, refreshToken: newRefreshToken, refreshTokenExpiration } = result.data

        // UPDATE COOKIES WITH NEW TOKENS
        cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {

            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(accessTokenExpiration),
        })

        cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, newRefreshToken, {
            
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
