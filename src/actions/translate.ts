"use server"

import { prisma } from "../lib/prisma"
import { v2 } from "@google-cloud/translate"

const {Translate} = v2


//CLIENT
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
})


export default async function translateText(inputText: any, languageId: any, practiceId: any, userId: any){

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
        if(languageId == "1") target = "en"
        if(languageId == "2") target = "tr"
        if(languageId == "3") target = "de"
        if(languageId == "4") target = "ru"
    }


    if(practice.name == 'writing')
    {
        //GET USER DEFAULT LANGUAGE
        const user = await prisma.user.findFirst({
            where: {
                userId: userId
            }
        })

        if(user.defaultLanguageId == 1) target = "en"
        if(user.defaultLanguageId == 2) target = "tr"
        if(user.defaultLanguageId == 3) target = "de"
        if(user.defaultLanguageId == 4) target = "ru"
    }

    let [translations] = await translate.translate(inputText, target)
    translations = Array.isArray(translations) ? translations[0] : translations

    return translations

}