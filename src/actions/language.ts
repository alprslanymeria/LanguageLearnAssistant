"use server"

// LIBRARIES
import {prisma} from "@/src/lib/prisma";

export async function GetLanguages() {

    try {

        const languages = await prisma.language.findMany();

        return {data: languages, status: 200};
        
    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Language verileri alınırken bir hata oluştu", details: error.message};
    }
}


export async function GetLanguageName(flashcardId : any) {

    try {
        
        const flashcard = await prisma.flashcard.findUnique({

            where:{
                id: flashcardId
            }

        })

        const language = await prisma.language.findUnique({

            where:{
                id: flashcard?.languageId
            }

        })

        return {data: language.name, status: 200};

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Language ismi verisi alınırken bir hata oluştu", details: error.message}
    }
}