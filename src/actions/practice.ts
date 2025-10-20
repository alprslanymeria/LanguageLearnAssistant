"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { GetPracticeResponse, GetPracticesProps } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// UTILS
import { createResponse } from "@/src/utils/response"
import { CacheKeys } from "@/src/utils/cache_keys"
import { getOrSetCache } from "@/src/utils/redisHelper"
// ZOD
import { GetPracticesSchema } from "@/src/zod/actionsSchema"
// LIBRARY
import { logger } from "@/src/lib/logger"


export default async function GetPractices(params : GetPracticesProps) : Promise<ApiResponse<GetPracticeResponse>> {

    try {

        await GetPracticesSchema.parseAsync(params)

        const {language} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.practice.byLanguage(language!)

        const practices = await getOrSetCache(key, async () => {

            const lang = await prisma.language.findFirst({
                where: {
                    name: language
                },
                select: {
                    id: true
                }
            })

            if(!lang) throw new Error("Language not found!")

            const data = await prisma.practice.findMany({
                where: {
                    languageId: lang!.id
                }
            })

            if(!data) throw new Error("Practices not found!")

            return data
            
        }, ttl)
        
        logger.info("GET PRACTICES: PRACTICES FETCHED SUCCESSFULLY!")
        return createResponse(true, 200, {data: practices}, "SUCCESS: GetPractices")

    } catch (error) {
        
        console.log(`ERROR: GetPractices: ${error}`)
        logger.error("ERROR: GetPractices", {error})

        return createResponse<GetPracticeResponse>(false, 500, null, "ERROR: GetPractices")
    }
}