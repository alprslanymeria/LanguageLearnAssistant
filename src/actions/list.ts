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
// UTILS
import { CacheKeys } from "@/src/utils/cache_keys"
import { getOrSetCache } from "@/src/utils/redisHelper"
// LIBRARY
import { logger } from "@/src/lib/logger"


export async function GetAllRBooks(params : GetAllRBooksProps) : Promise<ApiResponse<GetAllRBooksResponse>> {

    try {

        await GetAllRBooksSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.readingBook.paging(userId!, page, limit)

        const skip = (page - 1) * limit

        const cachedData = await getOrSetCache(key, async () => {

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

            return {data: books, total}

        }, ttl)

        logger.info("ALL READING BOOKS SUCCESSFULLY FETCHED!")
        return createResponse(true, 200, cachedData , "SUCCESS: GetAllRBooks")

    } catch (error) {

        console.log(`ERROR: GetAllRBooks: ${error}`)
        logger.error("ERROR: GetAllRBooks", {error})

        return createResponse<GetAllRBooksResponse>(false, 500, null, "ERROR: GetAllRBooks")
    }
}

export async function GetAllWBooks(params : GetAllWBooksProps) : Promise<ApiResponse<GetAllWBooksResponse>> {

    try {

        await GetAllWBooksSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.writingBook.paging(userId!, page, limit)

        const skip = (page - 1) * limit

        const cachedData = await getOrSetCache(key, async () => {

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

            return {data: books, total}

        }, ttl)

        logger.info("ALL WRITING BOOKS SUCCESSFULLY FETCHED!")
        return createResponse(true, 200, cachedData , "SUCCESS: GetAllWBooks")

    } catch (error) {

        console.log(`ERROR: GetAllWBooks: ${error}`)
        logger.error("ERROR: GetAllWBooks", {error})

        return createResponse<GetAllWBooksResponse>(false, 500, null, "ERROR: GetAllWBooks")
        
    }
}

export async function GetAllFCategories(params : GetAllFCategoriesProps) : Promise<ApiResponse<GetAllFCategoriesResponse>> {

    try {

        await GetAllFCategoriesSchema.parseAsync(params)

        const {userId} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.flashcardCategory.all(userId!)
        
        const categories = await getOrSetCache(key, async () => {

            const result = await prisma.flashcardCategory.findMany({
                where: {
                    flashcard : {
                        userId: userId
                    }
                },
                include: {
                    flashcard: true
                }
            })

            return result

        }, ttl)

        logger.info("ALL FLASHCARD CATEGORIES SUCCESSFULLY FETCHED!")
        return createResponse(true, 200, {data: categories} , "SUCCESS: GetAllFCategories")

    } catch (error) {

        console.log(`ERROR: GetAllFCategories: ${error}`)
        logger.error("ERROR: GetAllFCategories", {error})

        return createResponse<GetAllFCategoriesResponse>(false, 500, null, "ERROR: GetAllFCategories")
    }
}

export async function GetAllFCategoriesWithPaging(params : GetAllFCategoriesWithPagingProps) : Promise<ApiResponse<GetAllFCategoriesWithPagingResponse>> {

    try {

        await GetAllFCategoriesWithPagingSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.flashcardCategory.paging(userId!, page, limit)

        const skip = (page - 1) * limit

        const cachedData = await getOrSetCache(key, async () => {

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

            return {data: categories, total}

        }, ttl)

        logger.info("ALL FLASHCARD CATEGORIES (WITH PAGING) SUCCESSFULLY FETCHED!")
        return createResponse(true, 200, cachedData , "SUCCESS: GetAllFCategoriesWithPaging")

    } catch (error) {

        console.log(`ERROR: GetAllFCategoriesWithPaging: ${error}`)
        logger.error("ERROR: GetAllFCategoriesWithPaging", {error})

        return createResponse<GetAllFCategoriesWithPagingResponse>(false, 500, null, "ERROR: GetAllFCategoriesWithPaging")
    }
}

export async function GetAllFWords( params : GetAllFWordsProps) : Promise<ApiResponse<GetAllFWordsResponse>> {

    try {

        await GetAllFWordsSchema.parseAsync(params)

        const {userId, page=1 , limit= 10} = params

        // GET CACHE KEY AND TTL
        const { key, ttl } = CacheKeys.deckWord.paging(userId!, page, limit)

        const skip = (page - 1) * limit

        const cachedData = await getOrSetCache(key, async () => {

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

            return {data: deckWords, total}

        }, ttl)

        logger.info("ALL FLASHCARD WORDS SUCCESSFULLY FETCHED!")
        return createResponse(true, 200, cachedData , "SUCCESS: GetAllFWords")

    } catch (error) {

        console.log(`ERROR: GetAllFWords: ${error}`)
        logger.error("ERROR: GetAllFWords", {error})

        return createResponse<GetAllFWordsResponse>(false, 500, null, "ERROR: GetAllFWords")
        
    }
}