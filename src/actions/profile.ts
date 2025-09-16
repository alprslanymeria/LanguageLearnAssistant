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

export async function GetProfileInfos(params : GetProfileInfosProps) : Promise<ApiResponse<GetProfileInfosResponse>> {

    try {

        await GetProfileInfosSchema.parseAsync(params)

        const {userId} = params

        // GET USER INFOS
        const user = await prisma.user.findFirst({
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

        if(!user) throw new Error("USER NOT FOUND")

        return createResponse(true, 200, {data: user}, "SUCCESS: GetProfileInfos")

        
    } catch (error) {

        console.log(`ERROR: GetProfileInfos: ${error}`)
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

        await SaveProfileInfosSchema.parseAsync(values)

        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID

        const storage = new Storage({

            projectId: projectId
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
        }


        // GET BUFFERS OF IMAGE
        const bufferForFileOne = await (values.image).arrayBuffer()

        // CREATE UNIQUE NAME FOR IMAGE
        const file1Name = `${values.userId}/profile/${Date.now()}_${(values.image).name}`
        console.log(`FILE NAME: ${file1Name}`)

        // UPLOAD FILES TO GOOGLE CLOUD STORAGE
        const file1Upload = bucket.file(file1Name).createWriteStream({
            resumable: false,
            metadata: { contentType: (values.image).type }
        })

        // WRITE FILES TO GOOGLE CLOUD STORAGE
        file1Upload.end(Buffer.from(bufferForFileOne))

        // GET FILE'S URL
        const fileOneUrl = bucket.file(file1Name).publicUrl()
        console.log(`FILE URL: ${fileOneUrl}`)


        // UPDATE DATABASE
        const updatedUser = await prisma.user.update({
            where: {
                id: values.userId
            },
            data: {
                name: values.name,
                image: fileOneUrl,
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


        return createResponse(true, 200, {data: updatedUser} , "User Updated Successfully!")
        
    } catch (error) {

        console.log(`ERROR: SaveProfileInfos`)
        return createResponse<SaveProfileInfosResponse>(false, 500, null , "ERROR: SaveProfileInfos")
        
    }
}