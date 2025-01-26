"use server"

//LIBRARIES
import { prisma } from "../lib/prisma"

export async function CreateLiveSession(sessionId : string, userId : string | undefined | null) {

    try {
        
        await prisma.liveSession.create({
            data: {
                liveSessionId: sessionId,
                userId: userId
            }
        })

        return {status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "LiveSession oluşturulurken bir hata oluştu", details: error.message}

    }
}

export async function DeleteLiveSession(userId : string | undefined | null) {

    try {
        
        await prisma.liveSession.delete({
            where: {
                userId: userId
            }
        })

        return {status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "LiveSession silinirken bir hata oluştu", details: error.message}

    }
}