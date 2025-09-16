"use server"

// LIBRARIES
import {prisma} from "@/src/lib/prisma"
// TYPES
import { ApiResponse } from "@/src/types/response"
import { CompareLanguageIdProps, GetLanguagesResponse } from "@/src/types/actions"
// UTILS
import { createResponse } from "@/src/utils/response"
// ZOD
import { CompareLanguageIdSchema } from "@/src/zod/actionsSchema"



export async function GetLanguages() : Promise<ApiResponse<GetLanguagesResponse>> {

    try {

        const languages = await prisma.language.findMany()

        // BU HATAYI KULLANICI GÖRMÜYOR O YÜZDEN THROW ETTİM.
        if(languages.length === 0) throw new Error("No Languages Found!")

        return createResponse(true, 200, {data: languages}, "SUCCESS: GetLanguages")

    } catch (error) {

        console.log(`ERROR: GetLanguages: ${error}`)
        return createResponse<GetLanguagesResponse>(false, 500, null, `ERROR: GetLanguages`)
    }
}


export async function CompareLanguageId(params : CompareLanguageIdProps) : Promise<ApiResponse<boolean>> {

    try {

        await CompareLanguageIdSchema.parseAsync(params)

        const { userId, languageId } = params

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                nativeLanguageId: true
            }
        })

        // BU İSTEĞİ YAPMIŞ İSE KULLANICI ZATEN LOGIN OLMUŞTUR DEMEKTİR. BU YÜZDEN KULLANICI BU HATAYI GÖRMEMELİ. THROW EDİYORUM.
        if(!user) throw new Error("User not found!")

        if(user.nativeLanguageId == languageId) return createResponse(true, 200, true,  "SUCCESS: CompareLanguageId")
            
        return createResponse(true, 200, false , "SUCCESS: CompareLanguageId")

    } catch (error) {

        console.log(`ERROR: CompareLanguageId: ${error}`)
        return createResponse<boolean>(false, 500, null, "ERROR: CompareLanguageId")
        
    }
}