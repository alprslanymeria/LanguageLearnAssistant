// NEXT
import { NextResponse } from "next/server"


const OAUTH_SERVER_URL = process.env.OAUTH_SERVER_URL


export async function GET() {

    return NextResponse.redirect(`${OAUTH_SERVER_URL}/api/Auth/GoogleLogin`)
}
