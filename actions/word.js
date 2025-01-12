"use server"
import { prisma } from "@/app/lib/prisma"

export async function GetWords(language)
{
    try {
        
        //GET LANGUAGE ID
        const lang = await prisma.language.FindFirst({
            where: {
                language: language
            }
        })

        const words = await prisma.word.FindMany({
            where: {
                languageId: lang.id
            }
        })

        return {data: words, status: 200}

    } catch (error) {
        
        return {data: null,  status: 500, message:"Kelimeler alınırken bir hata oluştu" , details: error.message}
    }
}