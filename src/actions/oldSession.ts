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
                languageId: lang.id,
                name: practice
            }
        })

        let OldSessions = null

        switch (practice) {
            case "flashcard":
                OldSessions = await prisma.flashcardOldSession.findMany({
                    where: {
                        flashcard: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
                break;
            case "reading":
                OldSessions = await prisma.readingOldSession.findMany({
                    where: {
                        reading: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
                break;
            case "writing":
                OldSessions = await prisma.writingOldSession.findMany({
                    where: {
                        writing: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
                break;
            case "listening":
                OldSessions = await prisma.listeningOldSession.findMany({
                    where: {
                        listening: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
                break;
        }

        return {data: OldSessions, status: 200};

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "OldSessions verileri alınırken bir hata oluştu", details: error.message};

    }
}


export async function SaveOldSession(row: any){

    try {
        
        const from = row.from

        switch(from){

            case "flashcard":
                await prisma.flashcardOldSession.create({
                    data: {
                        oldSessionId: row.OldSessionId,
                        flashcardId: row.flashcardId,
                        categoryId: row.categoryId,
                        rate: row.rate
                    }
                })
                break;
            case "reading":
                await prisma.readingOldSession.create({
                    data: {
                        oldSessionId: row.OldSessionId,
                        readingId: row.readingId,
                        bookId: row.bookId,
                        rate: row.rate
                    }
                })
                break;
            case "writing":
                await prisma.writingOldSession.create({
                    data: {
                        oldSessionId: row.OldSessionId,
                        writingId: row.writingId,
                        bookId: row.bookId,
                        rate: row.rate
                    }
                })
                break;
            case "listening":
                await prisma.listeningOldSession.create({
                    data: {
                        oldSessionId: row.OldSessionId,
                        listeningId: row.listeningId,
                        filmId: row.filmId,
                        rate: row.rate
                    }
                })
        }

    } catch (error) {

        if(error instanceof Error) console.log(error.message)
        
        if(error instanceof Error) return {status: 500, message: "OldSessions verileri kaydedilirken bir hata oluştu", details: error.message};

        
    }
}