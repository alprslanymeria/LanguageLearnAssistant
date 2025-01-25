"use server"

//LIBRARIES
import { prisma } from "../lib/prisma"

export default async function GetPractices(language : string | null) {

    try {
        
        const lang = await prisma.language.findFirst({
            where: {
                name: language
            }
        })

        const practices = await prisma.practice.findMany({
            where: {
                languageId: lang.id
            }
        });

        return {data: practices, status: 200};

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Practice verileri alınırken bir hata oluştu", details: error.message};
    }
}