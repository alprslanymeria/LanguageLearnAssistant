"use server"

import { prisma } from "@/src/lib/prisma"
// TYPES
import {  GetAllFCategoriesProps, GetAllFCategoriesResponse, GetAllFCategoriesWithPagingProps, 
          GetAllFCategoriesWithPagingResponse, GetAllFWordsProps, GetAllFWordsResponse, GetAllRBooksProps, 
          GetAllRBooksResponse, GetAllWBooksProps, GetAllWBooksResponse } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// METHODS
import { createResponse } from "@/src/utils/response"
// ZOD
import { GetAllFCategoriesSchema, GetAllFCategoriesWithPagingSchema, GetAllFWordsSchema, GetAllRBooksSchema, GetAllWBooksSchema } from "@/src/zod/actionsSchema"


export async function GetAllRBooks(params : GetAllRBooksProps) : Promise<ApiResponse<GetAllRBooksResponse>> {

    try {

        await GetAllRBooksSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        const skip = (page - 1) * limit

        const [books, total] = await Promise.all([

            prisma.readingBook.findMany({
                where: {
                    reading : {
                        userId: userId
                    }
                },
                skip,
                take: limit
            }),

            prisma.readingBook.count({
                where: {
                    reading : {
                        userId: userId
                    }
                }
            })
        ])

        return createResponse(true, 200, {data: books, total: total} , "SUCCESS: GetAllRBooks")

    } catch (error) {

        console.log(`ERROR: GetAllRBooks: ${error}`)
        return createResponse<GetAllRBooksResponse>(false, 500, null, "ERROR: GetAllRBooks")
    }
}

export async function GetAllWBooks(params : GetAllWBooksProps) : Promise<ApiResponse<GetAllWBooksResponse>> {

    try {

        await GetAllWBooksSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        const skip = (page - 1) * limit

        const [books, total] = await Promise.all([

            prisma.writingBook.findMany({
                where: {
                    writing : {
                        userId: userId
                    }
                },
                skip,
                take: limit
            }),

            prisma.writingBook.count({
                where: {
                    writing : {
                        userId: userId
                    }
                }
            })
        ])

        return createResponse(true, 200, {data: books, total: total} , "SUCCESS: GetAllWBooks")

    } catch (error) {

       return createResponse<GetAllWBooksResponse>(false, 500, null, "ERROR: GetAllWBooks")
        
    }
}

export async function GetAllFCategories(params : GetAllFCategoriesProps) : Promise<ApiResponse<GetAllFCategoriesResponse>> {

    try {

        await GetAllFCategoriesSchema.parseAsync(params)

        const {userId} = params
        
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


        return createResponse(true, 200, {data: categories} , "SUCCESS: GetAllFCategories")

    } catch (error) {

        return createResponse<GetAllFCategoriesResponse>(false, 500, null, "ERROR: GetAllFCategories")
    }
}

export async function GetAllFCategoriesWithPaging(params : GetAllFCategoriesWithPagingProps) : Promise<ApiResponse<GetAllFCategoriesWithPagingResponse>> {

    try {

        await GetAllFCategoriesWithPagingSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        const skip = (page - 1) * limit

        const [categories, total] = await Promise.all([

            prisma.flashcardCategory.findMany({
                where: {
                    flashcard : {
                        userId: userId
                    }
                },
                skip,
                take: limit,
                include: {
                    flashcard: true
                }
            }),

            prisma.flashcardCategory.count({
                where: {
                    flashcard : {
                        userId: userId
                    }
                }
            })

        ])


        return createResponse(true, 200, {data: categories, total: total} , "SUCCESS: GetAllFCategoriesWithPaging")

    } catch (error) {

        return createResponse<GetAllFCategoriesWithPagingResponse>(false, 500, null, "ERROR: GetAllFCategoriesWithPaging")
    }
}

export async function GetAllFWords( params : GetAllFWordsProps) : Promise<ApiResponse<GetAllFWordsResponse>> {

    try {

        await GetAllFWordsSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        const skip = (page - 1) * limit

        const [deckWords, total] = await Promise.all([

            prisma.deckWord.findMany({
                where: {
                    category: {
                        flashcard: {
                            userId: userId
                        }
                    }
                },
                skip,
                take: limit
            }),

            prisma.deckWord.count({

                where: {
                    category: {
                        flashcard: {
                            userId: userId
                        }
                    }
                }
            })
        ])

        return createResponse(true, 200, {data: deckWords, total: total} , "SUCCESS: GetAllFWords")

    } catch (error) {

        return createResponse<GetAllFWordsResponse>(false, 500, null, "ERROR: GetAllFWords")
        
    }
}