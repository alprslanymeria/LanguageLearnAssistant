"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { GetOldSessionsProps, GetOldSessionsResponse, SaveOldSessionProps, SaveOldSessionResponse } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// UTILS
import { createResponse } from "@/src/utils/response"
import { CacheKeys } from "@/src/utils/cache_keys"
import { getOrSetCache, invalidateCacheByPrefix } from "@/src/utils/redisHelper"
// ZOD
import { GetOldSessionsSchema } from "@/src/zod/actionsSchema"
// LIBRARY
import { logger } from "@/src/lib/logger"


export async function GetOldSessions(params : GetOldSessionsProps) : Promise<ApiResponse<GetOldSessionsResponse>> {

    try {

        await GetOldSessionsSchema.parseAsync(params)

        const {userId, language, practice, page = 1, limit= 10} = params

        // GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                name: language!
            }, 
            select: {
                id: true
            }
        })

        if(!lang) {

            logger.error("GET OLD SESSIONS --> LANGUAGE NOT FOUND!")
            throw new Error("Language Not Found!")
        } 

        // GET PRACTICE ID
        const prac = await prisma.practice.findFirst({
            where: {
                languageId: lang!.id,
                name: practice
            },
            select: {
                id: true
            }
        })

        if(!prac) {

            logger.error("GET OLD SESSIONS --> PRACTICE NOT FOUND!")
            throw new Error("Practice Not Found!")
        } 

        const skip = (page - 1) * limit

        switch (practice) {
            case "flashcard":

                // GET CACHE KEY AND TTL
                const { key: flashcardCacheKey , ttl: flashcardTTL } = CacheKeys.flashcardOldSessions.paging(userId!, lang.id, prac.id, page, limit)

                const flashcardCachedData = await getOrSetCache(flashcardCacheKey, async () => {

                    const [flashcardOldSessions, flashcardOldSessionsTotal] = await Promise.all([

                        prisma.flashcardOldSession.findMany({
                            where: {
                                flashcard: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            },
                            skip,
                            take: limit,
                            orderBy: {
                                createdAt: "desc"
                            }
                        }),

                        prisma.flashcardOldSession.count({
                            where: {
                                flashcard: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            }
                        })

                    ])

                    if(flashcardOldSessions.length === 0) {

                        logger.info("GET OLD SESSIONS --> FLASHCARD OLDSESSIONS UZUNLUĞU 0")
                        return {data: [], total: 0}
                    } 

                    return {data: flashcardOldSessions, total: flashcardOldSessionsTotal}
                    
                }, flashcardTTL)

                logger.info("GET OLD SESSIONS --> FLASHCARD OLDSESSIONS FETCHED SUCCESSFULLY!")
                return createResponse(true, 200, {data: flashcardCachedData}, "SUCCESS: GetOldSessions!")

            case "reading":

                // GET CACHE KEY AND TTL
                const { key: readingCacheKey, ttl: readingTTL } = CacheKeys.readingOldSessions.paging(userId!, lang.id, prac.id, page, limit)
                
                const readingCachedData = await getOrSetCache(readingCacheKey, async () => {

                    const [readingOldSessions, readingOldSessionsTotal] = await Promise.all([

                        prisma.readingOldSession.findMany({
                            where: {
                                reading: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            },
                            skip,
                            take: limit,
                            orderBy: {
                                createdAt: "desc"
                            }
                        }),

                        prisma.readingOldSession.count({
                            where: {
                                reading: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            }
                        })
                    ])

                    if(readingOldSessions.length === 0) {

                        logger.info("GET OLD SESSIONS --> READING OLDSESSIONS UZUNLUĞU 0")
                        return {data: [], total: 0}
                    } 

                    return {data: readingOldSessions, total: readingOldSessionsTotal}

                }, readingTTL)

                logger.info("GET OLD SESSIONS --> READING OLDSESSIONS FETCHED SUCCESSFULLY!")
                return createResponse(true, 200, {data: readingCachedData}, "SUCCESS: GetOldSessions!")

            case "writing":

                // GET CACHE KEY AND TTL
                const { key: writingCacheKey, ttl: writingTTL } = CacheKeys.writingOldSessions.paging(userId!, lang.id, prac.id, page, limit)
                
                const writingCachedData = await getOrSetCache(writingCacheKey, async () => {

                    const [writingOldSessions, writingOldSessionsTotal] = await Promise.all([

                        prisma.writingOldSession.findMany({
                            where: {
                                writing: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            },
                            skip,
                            take: limit,
                            orderBy: {
                                createdAt: "desc"
                            }
                        }),

                        prisma.writingOldSession.count({
                            where: {
                                writing: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            }
                        })

                    ])

                    if(writingOldSessions.length === 0) {

                        logger.info("GET OLD SESSIONS --> WRITING OLDSESSIONS UZUNLUĞU 0")
                        return {data: [], total: 0}
                    } 

                    return {data: writingOldSessions, total: writingOldSessionsTotal}

                }, writingTTL)

                logger.info("GET OLD SESSIONS --> WRITING OLDSESSIONS FETCHED SUCCESSFULLY!")
                return createResponse(true, 200, {data: writingCachedData}, "SUCCESS: GetOldSessions!")

            case "listening":

                // GET CACHE KEY AND TTL
                const { key: listeningCacheKey, ttl: listeningTTL } = CacheKeys.listeningOldSessions.paging(userId!, lang.id, prac.id, page, limit)

                const listeningCachedData = await getOrSetCache(listeningCacheKey, async () => {

                    const [listeningOldSessions, listeningOldSessionsTotal] = await Promise.all([

                        prisma.listeningOldSession.findMany({
                            where: {
                                listening: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            },
                            skip,
                            take: limit,
                            orderBy: {
                                createdAt: "desc"
                            }
                        }),

                        prisma.listeningOldSession.count({
                            where: {
                                listening: {
                                    userId: userId,
                                    practiceId: prac!.id,
                                    languageId: lang!.id
                                }
                            }
                        })
                    ])

                    if(listeningOldSessions.length === 0) {

                        logger.info("GET OLD SESSIONS --> LISTENING OLDSESSIONS UZUNLUĞU 0")
                        return {data: [], total: 0}
                    } 

                    return {data: listeningOldSessions, total: listeningOldSessionsTotal}
                }, listeningTTL)

                logger.info("GET OLD SESSIONS --> LISTENING OLDSESSIONS FETCHED SUCCESSFULLY!")
                return createResponse(true, 200, {data: listeningCachedData }, "SUCCESS: GetOldSessions!")

            default:
                logger.error("GET OLD SESSIONS --> switch case eşleşmedi!")
                return createResponse<GetOldSessionsResponse>(false, 500, null, "ERROR: GetOldSessions")
        }

    } catch (error) {

        console.log(`ERROR: GetOldSessions: ${error}`)
        logger.error("ERROR: GetOldSessions", {error})

        return createResponse<GetOldSessionsResponse>(false, 500, null, "ERROR: GetOldSessions")

    }
}


export async function SaveOldSession(params : SaveOldSessionProps) : Promise<ApiResponse<SaveOldSessionResponse>>  {

    try {

        const {oldSessionRow} = params

        // BURASI ZOR OLDUĞU ZOD İLE YAPMADIM. BÖYLE KALSIN
        if (!oldSessionRow) {

            logger.error("SAVE OLD SESSIONS --> INVALID PARAMETERS!")
            return createResponse<SaveOldSessionResponse>(false, 400, null, "INVALID PARAMETERS")
        } 
        
        const from = oldSessionRow.from

        switch(from){

            case "flashcard":

                const flashcardOldSession = await prisma.flashcardOldSession.create({
                    data: {
                        oldSessionId: oldSessionRow.oldSessionId,
                        flashcardId: oldSessionRow.flashcardId,
                        categoryId: oldSessionRow.categoryId,
                        rate: oldSessionRow.rate
                    }
                })

                if(!flashcardOldSession) throw new Error("Flashcard OldSession Not Found!")

                await invalidateCacheByPrefix("get_all_flashcard_oldSessions_with_paging")
                
                logger.info("SAVE OLD SESSIONS --> FLASHCARD OLD SESSION SAVED SUCCESSFULLY!")
                return createResponse(true, 201, {data: flashcardOldSession}, "Oldsession saved successfully!")

            case "reading":

                const readingOldSession = await prisma.readingOldSession.create({
                    data: {
                        oldSessionId: oldSessionRow.oldSessionId,
                        readingId: oldSessionRow.readingId,
                        bookId: oldSessionRow.bookId,
                        rate: oldSessionRow.rate
                    }
                })

                if(!readingOldSession) throw new Error("Reading OldSession Not Found!")

                await invalidateCacheByPrefix("get_all_reading_oldSessions_with_paging")
                
                logger.info("SAVE OLD SESSIONS --> READING OLD SESSION SAVED SUCCESSFULLY!")
                return createResponse(true, 201, {data: readingOldSession}, "Oldsession saved successfully!")

            case "writing":

                const writingOldSession = await prisma.writingOldSession.create({
                    data: {
                        oldSessionId: oldSessionRow.oldSessionId,
                        writingId: oldSessionRow.writingId,
                        bookId: oldSessionRow.bookId,
                        rate: oldSessionRow.rate
                    }
                })

                if(!writingOldSession) throw new Error("Writing OldSession Not Found!")

                await invalidateCacheByPrefix("get_all_writing_oldSessions_with_paging")
                
                logger.info("SAVE OLD SESSIONS --> WRITING OLD SESSION SAVED SUCCESSFULLY!")
                return createResponse(true, 201, {data: writingOldSession}, "Oldsession saved successfully!")

            case "listening":

                const listeningOldSession = await prisma.listeningOldSession.create({
                    data: {
                        oldSessionId: oldSessionRow.oldSessionId,
                        listeningId: oldSessionRow.listeningId,
                        categoryId: oldSessionRow.categoryId,
                        rate: oldSessionRow.rate
                    }
                })

                if(!listeningOldSession) throw new Error("Listening OldSession Not Found!")

                await invalidateCacheByPrefix("get_all_listening_oldSessions_with_paging")

                logger.info("SAVE OLD SESSIONS --> LISTENING OLD SESSION SAVED SUCCESSFULLY!")
                return createResponse(true, 201, {data: listeningOldSession}, "Oldsession saved successfully!")

            default: 
                logger.error("ERROR: SaveOldSession --> switch case eşleşmedi ")
                return createResponse<SaveOldSessionResponse>(false, 500, null, "ERROR: SaveOldSession!")
        }

    } catch (error) {

        console.log(`ERROR: SaveOldSession: ${error}`)
        logger.error("ERROR: SaveOldSession!", {error})
        
        return createResponse<SaveOldSessionResponse>(false, 500, null, "ERROR: SaveOldSession!")

    }
}