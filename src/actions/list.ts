"use server"

// LIBRARIES
import { prisma } from "../lib/prisma"

export async function GetAllRBooks(userId : string | null | undefined) {

    try {
        
        const books = await prisma.readingBook.findMany({
            where: {
                reading : {
                    userId: userId
                }
            }
        })

        return {data: books, status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Reading Books verileri alınırken bir hata oluştu", details: error.message};
        
    }
}

export async function GetAllWBooks(userId : string | null | undefined) {

    try {
        
        const books = await prisma.writingBook.findMany({
            where: {
                writing : {
                    userId: userId
                }
            }
        })

        return {data: books, status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Writing Books verileri alınırken bir hata oluştu", details: error.message};
        
    }
}

export async function GetAllLFilms(userId : string | null | undefined) {

    try {
        
        const films = await prisma.listeningFilm.findMany({
            where: {
                listening : {
                    userId: userId
                }
            }
        })

        return {data: films, status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Listening Films verileri alınırken bir hata oluştu", details: error.message};
        
    }
}

export async function GetAllFCategories(userId : string | null | undefined) {

    try {
        
        const categories = await prisma.flashcardCategory.findMany({
            where: {
                flashcard : {
                    userId: userId
                }
            },
            include: {
                flashcard: true
            }
        })

        return {data: categories, status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Flashcard Categories verileri alınırken bir hata oluştu", details: error.message};
        
    }
}

export async function GetAllFWords(userId : string | null | undefined) {

    try {

        const deckWords = await prisma.deckWord.findMany({
            where: {
                category: {
                    flashcard: {
                        userId: userId
                    }
                }
            },
            select: {
                id: true,
                question: true,
                answer: true
            }
        });

        return {data: deckWords, status: 200}

    } catch (error) {

        if(error instanceof Error) return {status: 500, message: "Flashcard Words verileri alınırken bir hata oluştu", details: error.message};
        
    }
}