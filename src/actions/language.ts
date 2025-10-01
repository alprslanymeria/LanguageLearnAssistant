"use server"

// LIBRARIES
import {prisma} from "@/src/lib/prisma"
// TYPES
import { ApiResponse } from "@/src/types/response"
import { CompareLanguageIdProps, GetLanguagesResponse } from "@/src/types/actions"
// UTILS
import { createResponse } from "@/src/utils/response"
import { getOrSetCache } from "@/src//utils/redisHelper"
import { CacheKeys } from "@/src/utils/cache_keys"
// ZOD
import { CompareLanguageIdSchema } from "@/src/zod/actionsSchema"


// ADDED CACHE FEATURE - NO INVALIDATION REQUIRED
export async function GetLanguages() : Promise<ApiResponse<GetLanguagesResponse>> {

    try {

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.languages.all()

        const languages = await getOrSetCache(key, async () => {

            const result = await prisma.language.findMany()

            // BU HATAYI KULLANICI GÖRMÜYOR O YÜZDEN THROW ETTİM.
            if(result.length === 0) throw new Error("No Languages Found!")

            return result

        }, ttl)
        
        return createResponse(true, 200, {data: languages}, "SUCCESS: GetLanguages")

    } catch (error) {

        console.log(`ERROR: GetLanguages: ${error}`)
        return createResponse<GetLanguagesResponse>(false, 500, null, `ERROR: GetLanguages`)
    }
}

// ADDED CACHE FEATURE - NO INVALIDATION REQUIRED
export async function CompareLanguageId(params : CompareLanguageIdProps) : Promise<ApiResponse<boolean>> {

    try {

        await CompareLanguageIdSchema.parseAsync(params)

        const { userId, languageId } = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.user.compareLanguage(userId, languageId)

        const user = await getOrSetCache(key, async () => {

            const result = await prisma.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    nativeLanguageId: true
                }
            })

            // BU İSTEĞİ YAPMIŞ İSE KULLANICI ZATEN LOGIN OLMUŞTUR DEMEKTİR. BU YÜZDEN KULLANICI BU HATAYI GÖRMEMELİ. THROW EDİYORUM.
            if(!result) throw new Error("User not found!")

            return result

        }, ttl)
        
        if(user.nativeLanguageId == languageId) return createResponse(true, 200, true,  "SUCCESS: CompareLanguageId")
            
        return createResponse(true, 200, false , "SUCCESS: CompareLanguageId")

    } catch (error) {

        console.log(`ERROR: CompareLanguageId: ${error}`)
        return createResponse<boolean>(false, 500, null, "ERROR: CompareLanguageId")
        
    }
}