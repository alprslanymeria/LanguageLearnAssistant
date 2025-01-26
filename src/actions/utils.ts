"use server"

// LIBRARIES
import { prisma } from "../lib/prisma"

export default async function GetCreateItems(language: string | null, practice: string | null, userId: string | null | undefined){

    try {
        
        // GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                name: language
            }
        })

        // GET PRACTICE ID
        const prac = await prisma.practice.findFirst({
            where: {
                name: practice
            }
        })

        let CreateItems = null

        switch (practice) {
            case "flashcard":
                CreateItems = await prisma.flashcard.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        flashcardCategories : true
                    }
                })
                break;
            case "reading":
                CreateItems = await prisma.reading.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        readingBooks : true
                    }
                })
                break;
            case "writing":
                CreateItems = await prisma.writing.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        writingBooks : true
                    }
                })
                break;
            case "listening":
                CreateItems = await prisma.listening.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        listeningFilms : true
                    }
                })
                break;
        }

        return {data: CreateItems, status: 200};

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Create Items verileri alınırken bir hata oluştu", details: error.message};
        
    }

}