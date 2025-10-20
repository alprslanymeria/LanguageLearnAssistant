"use server"

// LIBRARIES
import {prisma} from "@/src/lib/prisma"
// TYPES
import { GetProfileInfosProps, GetProfileInfosResponse, SaveProfileInfosResponse } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
import { createResponse } from "@/src/utils/response"
// GOOGLE CLOUD
import { Storage } from "@google-cloud/storage"
// ZOD
import { GetProfileInfosSchema, SaveProfileInfosSchema } from "@/src/zod/actionsSchema"
// UTILS
import { getOrSetCache, invalidateCache } from "@/src/utils/redisHelper"
import { CacheKeys } from "@/src/utils/cache_keys"
// LIBRARY
import { logger } from "@/src/lib/logger"

export async function GetProfileInfos(params : GetProfileInfosProps) : Promise<ApiResponse<GetProfileInfosResponse>> {

    try {

        await GetProfileInfosSchema.parseAsync(params)

        const {userId} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.user.profile(userId!)

        // GET USER INFOS
        const user = await getOrSetCache(key, async () => {

            const data = await prisma.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    nativeLanguageId: true
                }
            })

            if(!data) throw new Error("USER NOT FOUND")

            return data
        }, ttl)

        logger.info("GET PROFILE INFOS --> USER PROFILE INFOS SUCCESSFULL FETCHED!")
        return createResponse(true, 200, {data: user}, "SUCCESS: GetProfileInfos")
        
    } catch (error) {

        console.log(`ERROR: GetProfileInfos: ${error}`)
        logger.error("ERROR: GetProfileInfos", {error})

        return createResponse<GetProfileInfosResponse>(false, 500, null, "ERROR: GetProfileInfos")
        
    }
}

export async function SaveProfileInfos(prevState: ApiResponse<SaveProfileInfosResponse> | undefined, formData: FormData) : Promise<ApiResponse<SaveProfileInfosResponse>> {

    try {

        const values = {

            userId: formData.get("userId")?.toString(),
            name: formData.get("name")?.toString(),
            image: formData.get("profileImage") as File,
            nativeLanguageId: Number(formData.get("nativeLanguageId"))
        }

        logger.info("SaveProfileInfos Form Verileri Alındı:", {values} )
        await SaveProfileInfosSchema.parseAsync(values)

        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID
        logger.info("SAVE PROFILE INFOS --> GCP_PROJECT_ID", {projectId})

        const storage = new Storage({

            projectId: projectId,
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
        })

        const bucket = storage.bucket('create-items')

        // GET USER FIRST
        const user = await prisma.user.findFirst({
            where: {
                id: values.userId
            },
            select: {image: true}
        })

        if(!user) throw new Error("USER NOT FOUND")


        if(user.image != null) {

            // MEVCUT RESMİ SİL
            const oldImage = decodeURIComponent(user.image.split('/').pop() ?? "") 
            const [isExist] = await bucket.file(oldImage).exists()
            
            if(isExist) await bucket.file(oldImage).delete()

            logger.info("SAVE PROFILE INFOS --> OLD PROFILE IMAGE SUCCESSFULLY DELETED!")

        }

        // GET BUFFERS OF IMAGE
        const bufferForFileOne = await (values.image).arrayBuffer()

        // CREATE UNIQUE NAME FOR IMAGE
        const file1Name = `${values.userId}/profile/${Date.now()}_${(values.image).name}`
        logger.info("SAVE PROFILE INFOS --> PROFILE IMAGE FILE 1 NAME", {file1Name})

        const fileOneUrl = await new Promise((resolve, reject) => {

            // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
            const file = bucket.file(file1Name)

            // START STREAM
            // UPLOAD FILES TO GOOGLE CLOUD STORAGE
            const stream = file.createWriteStream({
                resumable: false,
                metadata: {contentType: values.image.type}
            })

            // IF ERROR OCCURED DURING STREAM
            stream.on("error", (err) => {

                logger.error("SAVE PROFILE INFOS --> GCS UPLOAD ERROR", {err})
                reject(err)
            })

            // IF STREAM FINISH
            stream.on("finish", async () => {

                try {

                    resolve(file.publicUrl())
                    
                } catch (error) {
                    
                    logger.error("SAVE PROFILE INFOS --> STREAM FINISH ERROR", {error})
                    reject(error)
                }
            })

            // WRITE FILES TO GOOGLE CLOUD STORAGE
            stream.end(Buffer.from(bufferForFileOne))
        })


        logger.info("SAVE PROFILE INFOS --> NEW PROFILE IMAGE CLOUD URL", {fileOneUrl})
        logger.info("SAVE PROFILE INFOS --> NEW PROFILE IMAGE SAVED TO CLOUD SUCCESSFULLY!")

        // UPDATE DATABASE
        const updatedUser = await prisma.user.update({
            where: {
                id: values.userId
            },
            data: {
                name: values.name,
                image: fileOneUrl as string,
                nativeLanguageId: values.nativeLanguageId
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                nativeLanguageId: true
            }
        })

        await invalidateCache(`profile_infos:${values.userId}`)

        logger.info("SAVE PROFILE INFOS --> USER PROFILE INFOS UPDATED ON DATABASE SUCCESSFULLY!")
        return createResponse(true, 200, {data: updatedUser} , "User Updated Successfully!")
        
    } catch (error) {

        console.log(`ERROR: SaveProfileInfos`)
        logger.error("ERROR: SaveProfileInfos", {error})
        
        return createResponse<SaveProfileInfosResponse>(false, 500, null , "ERROR: SaveProfileInfos")
        
    }
}