"use server"

//LIBRARIES
import { prisma } from "../lib/prisma"

export async function GetReadingRowsById(language: string | null, practice: string | null, userId: string | null | undefined, id: any){

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

        // GET ROWS
        const infos = await prisma.readingOldSession.findFirst({
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

        const rows = infos.readingSessionRows
        const bookId = infos.bookId
        

        //GET BOOK INFO
        const book = await prisma.readingBook.findFirst({
            where: {
                id: bookId
            }
        })

        return {data: rows, book:book, status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Reading Session Rows verileri alınırken bir hata oluştu", details: error.message};
    }
}

export async function GetWritingRowsById(language: string | null, practice: string | null, userId: string | null | undefined, id: any){

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

        // GET ROWS
        const infos = await prisma.writingOldSession.findFirst({
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

        const rows = infos.writingSessionRows
        const bookId = infos.bookId
        

        //GET BOOK INFO
        const book = await prisma.writingBook.findFirst({
            where: {
                id: bookId
            }
        })

        return {data: rows, book:book, status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Writing Session Rows verileri alınırken bir hata oluştu", details: error.message};

    }
}

export async function GetListeningRowsById(language: string | null, practice: string | null, userId: string | null | undefined, id: any){

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

        // GET ROWS   
        const infos = await prisma.listeningOldSession.findFirst({
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

        const rows = infos.listeningSessionRows
        const filmId = infos.filmId
        

        //GET FILM INFO
        const film = await prisma.listeningFilm.findFirst({
            where: {
                id: filmId
            }
        })

        return {data: rows, film:film, status: 200}     

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Listening Session Rows verileri alınırken bir hata oluştu", details: error.message};

    }
}

export async function GetFlashcardRowsById(language: string | null, practice: string | null, userId: string | null | undefined, id: any){

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

        // GET ROWS   
        const infos = await prisma.flashcardOldSession.findFirst({
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

        const rows = infos.flashcardSessionRows
        const categoryId = infos.categoryId
        

        //GET FILM INFO
        const category = await prisma.flashcardCategory.findFirst({
            where: {
                id: categoryId
            }
        })

        return {data: rows, category:category, status: 200}
        

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Flashcard Session Rows verileri alınırken bir hata oluştu", details: error.message};

    }
}


export async function SaveFlashcardRows(rows : any){

    try {
        
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

        return {status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Flashcard Session Rows kaydedilirken bir hata oluştu", details: error.message};
    }
}

export async function SaveReadingRows(rows : any){

    try {
        
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

        return {status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Reading Session Rows kaydedilirken bir hata oluştu", details: error.message};
        
    }
}


export async function SaveWritingRows(rows : any){

    try {
        
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

        return {status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Writing Session Rows kaydedilirken bir hata oluştu", details: error.message};
        
    }
}