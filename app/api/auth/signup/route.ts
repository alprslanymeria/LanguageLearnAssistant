// NEXT
import { NextRequest, NextResponse } from "next/server"
// TYPES
import { ApiServiceResult } from "@/src/infrastructure/auth/authTypes"
import { UserDto } from "@/src/actions/User/Response"


const OAUTH_SERVER_URL = process.env.OAUTH_SERVER_URL


export async function POST(request: NextRequest) {

    try {

        const body = await request.json()

        const response = await fetch(`${OAUTH_SERVER_URL}/api/User`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const result: ApiServiceResult<UserDto> = await response.json()

        if (!response.ok || result.errorMessage) {

            return NextResponse.json(
                { errorMessage: result.errorMessage ?? ["SignUp failed!"] },
                { status: response.status }
            )
        }

        if (!result.data) {

            return NextResponse.json(
                { errorMessage: ["Invalid server response"] },
                { status: 500 }
            )
        }

        return NextResponse.json({ data: result.data })

    } catch {

        return NextResponse.json(
            { errorMessage: ["An unexpected error occurred"] },
            { status: 500 }
        )
    }
}
