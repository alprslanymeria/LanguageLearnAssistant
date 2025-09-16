"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { GetPracticeResponse, GetPracticesProps } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// UTILS
import { createResponse } from "@/src/utils/response"
// ZOD
import { GetPracticesSchema } from "@/src/zod/actionsSchema"


export default async function GetPractices(params : GetPracticesProps) : Promise<ApiResponse<GetPracticeResponse>> {

    try {

        await GetPracticesSchema.parseAsync(params)

        const {language} = params
        
        const lang = await prisma.language.findFirst({
            where: {
                name: language
            },
            select: {
                id: true
            }
        })

        if(!lang) throw new Error("Language not found!")

        const practices = await prisma.practice.findMany({
            where: {
                languageId: lang!.id
            }
        })

        if(!practices) throw new Error("Practices not found!")

        return createResponse(true, 200, {data: practices}, "SUCCESS: GetPractices")

    } catch (error) {
        
        console.log(`ERROR: GetPractices: ${error}`)
        return createResponse<GetPracticeResponse>(false, 500, null, "ERROR: GetPractices")
    }
}