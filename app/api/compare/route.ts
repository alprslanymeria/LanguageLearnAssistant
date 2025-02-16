import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET(req: NextRequest){

    try {
        
        const sessionId = req.nextUrl.searchParams.get('sessionId')
        const userId = req.nextUrl.searchParams.get('userId')

        const isExist = await prisma.liveSession.findFirst({

            where: {
                liveSessionId: sessionId,
                userId: userId
            }
        })

        if(!isExist) return NextResponse.json(isExist, {status: 404})

        return NextResponse.json(isExist, {status: 200})

    } catch (error) {
        
        return NextResponse.json(null, {status: 500})
    }
}