"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// GOOGLE CLOUD
import { v2 } from "@google-cloud/translate"
// TYPES
import { TranslateTextProps } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
import { createResponse } from "@/src/utils/response"
// ZOD
import { TranslateTextSchema } from "@/src/zod/actionsSchema"


const {Translate} = v2


//CLIENT
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
})


export async function TranslateText(params : TranslateTextProps) : Promise<ApiResponse<string>> {


    try {

        await TranslateTextSchema.parseAsync(params)

        const {userId, language, practice, selectedText} = params

        let target = ''

        if(practice == 'reading' || practice == 'listening')
        {
            //GET USER DEFAULT LANGUAGE
            const user = await prisma.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    nativeLanguageId: true
                }
            })

            if (!user) throw new Error("USER NOT FOUND")

            if(user.nativeLanguageId == 1) target = "en"
            if(user.nativeLanguageId == 2) target = "tr"
            if(user.nativeLanguageId == 3) target = "de"
            if(user.nativeLanguageId == 4) target = "ru"

        }

        if(practice == 'writing')
        {
            //GET TARGET LANGUAGE
            const lang = await prisma.language.findFirst({
                where: {
                    name: language
                },
                select: {
                    id: true
                }
            })

            if (!lang) throw new Error("LANGUAGE NOT FOUND")

            const langId = lang.id

            if(langId == 1) target = "en"
            if(langId == 2) target = "tr"
            if(langId == 3) target = "de"
            if(langId == 4) target = "ru"
        }

        if (!target) throw new Error("TARGET LANGUAGE NOT DEFINED")


        let [translations] = await translate.translate(selectedText, target)
        translations = Array.isArray(translations) ? translations[0] : translations

        return createResponse(true, 200, translations, "SUCCESS: TranslateText!")
        
    } catch (error) {
        
        console.log(`ERROR: TranslateText: ${error}`)
        return createResponse<string>(false, 500, null, "ERROR: TranslateText!")
    }
}