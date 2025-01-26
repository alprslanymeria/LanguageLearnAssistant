"use server"

// LIBRARIES
import { prisma } from "../lib/prisma"

export default async function GetOldSessions(language: string | null, practice: string | null, userId: string | null | undefined) {

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

        let OldSessions = null

        switch (practice) {
            case "flashcard":
                OldSessions = await prisma.flashcard.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        flashcardOldSessions : true
                    }
                })
                break;
            case "reading":
                OldSessions = await prisma.reading.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        readingOldSessions : true
                    }
                })
                break;
            case "writing":
                OldSessions = await prisma.writing.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        writingOldSessions : true
                    }
                })
                break;
            case "listening":
                OldSessions = await prisma.listening.findMany({
                    where: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    },
                    include: {
                        listeningOldSessions : true
                    }
                })
                break;
        }

        return {data: OldSessions, status: 200};

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "OldSessions verileri alınırken bir hata oluştu", details: error.message};

    }
}