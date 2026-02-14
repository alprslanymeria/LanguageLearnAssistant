// NEXT
import { NextRequest, NextResponse } from "next/server"


const OAUTH_SERVER_URL = process.env.OAUTH_SERVER_URL


export async function GET(request: NextRequest) {

    const origin = request.nextUrl.origin
    const callbackUrl = `${origin}/api/auth/google/callback`

    return NextResponse.redirect(
        `${OAUTH_SERVER_URL}/api/Auth/GoogleLogin?redirect_uri=${encodeURIComponent(callbackUrl)}`
    )
}
