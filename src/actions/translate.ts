"use server"

import { prisma } from "../lib/prisma"
import { v2 } from "@google-cloud/translate"

const {Translate} = v2


//CLIENT
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
})


export default async function translateText(selectedText: any, userId: any, language: any, practice: any){

    let target = ''

    if(practice == 'reading' || practice == 'listening')
    {
        //GET USER DEFAULT LANGUAGE
        const user = await prisma.user.findFirst({
            where: {
                userId: userId
            }
        })

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
            }
        })

        const langId = lang.id

        if(langId == "1") target = "en"
        if(langId == "2") target = "tr"
        if(langId == "3") target = "de"
        if(langId == "4") target = "ru"
    }

    console.log(`PRACTICE: ${practice}`)
    console.log(`TARGET LANGUAGE: ${target}`)

    let [translations] = await translate.translate(selectedText, target)
    translations = Array.isArray(translations) ? translations[0] : translations

    return translations

}