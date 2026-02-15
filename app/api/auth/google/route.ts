// NEXT
import { NextRequest, NextResponse } from "next/server"


// PUBLIC URL FOR BROWSER REDIRECTS
const OAUTH_SERVER_PUBLIC_URL = process.env.OAUTH_SERVER_PUBLIC_URL

// EXTERNALLY ACCESSIBLE URL OF THIS NEXT.JS APP
const APP_URL = process.env.APP_URL


export async function GET(request: NextRequest) {

    // USE APP_URL IF SET, OTHERWISE DERIVE FROM REQUEST HEADERS
    const origin = APP_URL
    const callbackUrl = `${origin}/api/auth/google/callback`

    return NextResponse.redirect(
        
        `${OAUTH_SERVER_PUBLIC_URL}/api/Auth/GoogleLogin?redirect_uri=${encodeURIComponent(callbackUrl)}`
    )
}
