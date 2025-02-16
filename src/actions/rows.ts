"use server"

//LIBRARIES
import { prisma } from "../lib/prisma"

export async function GetRowsById(language: string | null, practice: string | null, userId: string | null | undefined, id: any){

    try {
        
        //GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                name: language
            }
        })

        //GET PRACTICE ID
        const prac = await prisma.practice.findFirst({
            where: {
                languageId: lang.id,
                name: practice
            }
        })


        let oldSession = null
        let item = null
        let rows = null

        switch(practice){

            case "reading":
                //GET OLD SESSION
                oldSession = await prisma.readingOldSession.findFirst({
                    where: {
                        oldSessionId: id,
                        reading: {
                            userId: userId,
                            practiceId: prac.id,  
                            languageId: lang.id
                        }  
                    },
                    select: {
                        readingSessionRows: true,
                        bookId: true
                    }
                })

                //GET ROWS
                rows = oldSession.readingSessionRows

                //GET ITEM
                item = await prisma.readingBook.findFirst({
                    where: {
                        id: oldSession.bookId
                    }
                })

                break;
            case "writing":
                //GET OLD SESSION
                oldSession = await prisma.writingOldSession.findFirst({
                    where: {
                        oldSessionId: id,
                        writing: {
                            userId: userId,
                            practiceId: prac.id,  
                            languageId: lang.id
                        }  
                    },
                    select: {
                        writingSessionRows: true,
                        bookId: true
                    }
                })
        
                //GET ROWS
                rows = oldSession.writingSessionRows

                //GET ITEM
                item = await prisma.writingBook.findFirst({
                    where: {
                        id: oldSession.bookId
                    }
                })
                break;
            case "listening":
                //GET OLD SESSION
                oldSession = await prisma.listeningOldSession.findFirst({
                    where: {
                        oldSessionId: id,
                        listening: {
                            userId: userId,
                            practiceId: prac.id,  
                            languageId: lang.id
                        }  
                    },
                    select: {
                        listeningSessionRows: true,
                        filmId: true
                    }
                })
        
                //GET ROWS
                rows = oldSession.listeningSessionRows

                //GET ITEM
                item = await prisma.listeningFilm.findFirst({
                    where: {
                        id: oldSession.filmId
                    }
                })

                break;
            case "flashcard":
                // GET OLD SESSION  
                oldSession = await prisma.flashcardOldSession.findFirst({
                    where: {
                        oldSessionId: id,
                        flashcard: {
                            userId: userId,
                            practiceId: prac.id,  
                            languageId: lang.id
                        }  
                    },
                    select: {
                        flashcardSessionRows: true,
                        categoryId: true
                    }
                })

                //GET ROWS
                rows = oldSession.flashcardSessionRows

                //GET ITEM
                item = await prisma.flashcardCategory.findFirst({
                    where: {
                        id: oldSession.categoryId
                    }
                })
                break;
        }

        return {data: rows, item:item, status: 200}


    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Session Rows verileri alınırken bir hata oluştu", details: error.message};
    }
}

export async function SaveRows(rows: any) {

    try {
        
        const practice = rows[0].from

        switch(practice){

            case "reading":
                for(const row of rows){
            
                    await prisma.readingSessionRow.create({
                        data: {
                            oldSessionId: row.OldSessionId,
                            selectedSentence: row.selectedSentence,
                            answer: row.answer,
                            answerTranslate: row.answerTranslate,
                            similarity: row.similarity
                        }
                    })
                }
                break;
            case "writing":
                for(const row of rows){
            
                    await prisma.writingSessionRow.create({
                        data: {
                            oldSessionId: row.OldSessionId,
                            selectedSentence: row.selectedSentence,
                            answer: row.answer,
                            answerTranslate: row.answerTranslate,
                            similarity: row.similarity
                        }
                    })
                }
                break;
            case "listening":
                for(const row of rows){
            
                    await prisma.listeningSessionRow.create({
                        data: {
                            oldSessionId: row.OldSessionId,
                            listenedSentence: row.listenedSentence,
                            answer: row.answer,
                            similarity: row.similarity
                        }
                    })
                }
                break;
            case "flashcard":
                for(const row of rows){

                    await prisma.flashcardSessionRow.create({
                        data: {
                            oldSessionId: row.OldSessionId,
                            question: row.question,
                            answer: row.answer,
                            status: row.status
                        }
                    })
                }
                break;
        }


    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Session Rows kaydedilirken bir hata oluştu", details: error.message}
    }

}