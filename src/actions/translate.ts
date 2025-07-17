"use server"

import { prisma } from "../lib/prisma"
import { v2 } from "@google-cloud/translate"

const {Translate} = v2


//CLIENT
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
})


export default async function translateText(selectedText: any, languageId: any, practiceId: any, userId: any){

    let target = ''

    // GET PRACTICE NAME
    const practice = await prisma.practice.findFirst({

        where: {
            id: Number(practiceId),
            languageId: Number(languageId)
        }
    })

    if(practice.name == 'reading' || practice.name == 'listening')
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

    if(practice.name == 'writing')
    {
        //GET TARGET LANGUAGE
        if(languageId == "1") target = "en"
        if(languageId == "2") target = "tr"
        if(languageId == "3") target = "de"
        if(languageId == "4") target = "ru"
    }

    console.log(`PRACTICE: ${practice.name}`)
    console.log(`TARGET LANGUAGE: ${target}`)

    let [translations] = await translate.translate(selectedText, target)
    translations = Array.isArray(translations) ? translations[0] : translations

    return translations

}