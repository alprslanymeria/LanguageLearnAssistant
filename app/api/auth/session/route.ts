// NEXT
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
// TYPES
import { AUTH_COOKIES } from "@/src/infrastructure/auth/authTypes"
// UTILS
import { decodeJwtPayload, extractUserSession } from "@/src/infrastructure/auth/tokenUtils"


export async function GET() {

    try {

        const cookieStore = await cookies()
        const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value

        if (!accessToken) {

            return NextResponse.json({ session: null }, { status: 401 })
        }

        const payload = decodeJwtPayload(accessToken)

        if (!payload) {

            return NextResponse.json({ session: null }, { status: 401 })
        }

        const session = extractUserSession(payload)

        if (!session) {

            return NextResponse.json({ session: null }, { status: 401 })
        }

        return NextResponse.json({ session })

    } catch {

        return NextResponse.json({ session: null }, { status: 500 })
    }
}
