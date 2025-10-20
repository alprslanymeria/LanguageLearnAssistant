"use server"

//LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { CreateLiveSessionProps, CreateLiveSessionResponse, DeleteLiveSessionProps } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// UTILS
import { createResponse } from "@/src/utils/response"
// ZOD
import { CreateLiveSessionSchema, DeleteLiveSessionSchema } from "@/src/zod/actionsSchema"
// LIBRARY
import { logger } from "@/src/lib/logger"

// NO CACHE NEEDED 
export async function CreateLiveSession(params : CreateLiveSessionProps) : Promise<ApiResponse<CreateLiveSessionResponse>> {

    try {

        await CreateLiveSessionSchema.parseAsync(params)

        const {userId, liveSessionId} = params

        const isLiveSessionExist = await prisma.liveSession.findUnique({

            where: {
                userId: userId
            }
        })

        if(isLiveSessionExist) {

            logger.error("CREATE LIVE SESSION --> LIVE SESSION ALREADY EXIST!")
            throw new Error("Live Session already exist!")
        }

        const liveSession = await prisma.liveSession.create({

            data: {
                userId: userId!,
                liveSessionId: liveSessionId
            }
        })

        logger.info("CREATE LIVE SESSION --> LIVE SESSION CREATED SUCCESFULLY! ")
        return createResponse(true, 201, {data: liveSession}, "Live Session Created Successfully!")
        
    } catch (error) {
        
        console.log(`ERROR: CreateLiveSession: ${error}`)
        logger.error("ERROR: CreateLiveSession!", {error})

        if(error instanceof Error)
        return createResponse<CreateLiveSessionResponse>(false, 500, null, error.message)

        return createResponse<CreateLiveSessionResponse>(false, 500, null, "ERROR: CreateLiveSession!")
    }
}

export async function DeleteLiveSession(params : DeleteLiveSessionProps) : Promise<ApiResponse<undefined>>  {

    try {

        await DeleteLiveSessionSchema.parseAsync(params)

        const {userId} = params

        const isLiveSessionExist = await prisma.liveSession.findUnique({

            where: {
                userId: userId
            }
        })

        if(!isLiveSessionExist) {

            logger.error("DELETE LIVE SESSION --> LIVE SESSION DOESN'T EXIST!")
            throw new Error("Live Session doesn't exist!")
        }
        
        await prisma.liveSession.delete({
            where: {
                userId: userId
            }
        })

        logger.info("DELETE LIVE SESSION --> LIVE SESSION DELETED SUCCESSFULLY!")
        return createResponse(true, 204, undefined , "Live session deleted successfully!")

    } catch (error) {
        
        console.log(`ERROR: DeleteLiveSession: ${error}`)
        logger.error("ERROR: DeleteLiveSession", {error})

        if(error instanceof Error)
        return createResponse(false, 500, undefined , error.message)

        return createResponse(false, 500, undefined , "ERROR: DeleteLiveSession")
    }
}