"use server"

//LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { GetRowsByIdProps, GetRowsByIdResponse, SaveRowsProps } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// METHODS
import { createResponse } from "@/src/utils/response"
// ZOD
import { GetRowsByIdSchema } from "@/src/zod/actionsSchema"
// UTLS
import { getOrSetCache, invalidateCacheByPrefix } from "@/src/utils/redisHelper"
import { CacheKeys } from "@/src/utils/cache_keys"


export async function GetRowsById(params : GetRowsByIdProps) : Promise<ApiResponse<GetRowsByIdResponse>> {

    try {

        await GetRowsByIdSchema.parseAsync(params)

        const {userId, language, practice, oldSessionId, page = 1, limit= 10} = params

        
        //GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                name: language!
            },
            select: {
                id: true
            }
        })

        if(!lang) throw new Error("LANGUAGE NOT FOUND")

        //GET PRACTICE ID
        const prac = await prisma.practice.findFirst({
            where: {
                languageId: lang!.id,
                name: practice!
            },
            select: {
                id: true
            }
        })

        if(!prac) throw new Error("PRACTICE NOT FOUND")

        const skip = (page - 1) * limit

        switch(practice){

            case "reading":

                // GET CACHE KEY AND TTL
                const { key: readingKey, ttl: readingTTL } = CacheKeys.rows.reading(userId!, lang.id, prac.id, oldSessionId!, page, limit)

                const readingCachedData = await getOrSetCache(readingKey, async () => {

                    //GET OLD SESSION
                    const readingOldSession = await prisma.readingOldSession.findFirst({
                        where: {
                            oldSessionId: oldSessionId!,
                            reading: {
                                userId: userId,
                                practiceId: prac!.id,  
                                languageId: lang!.id
                            }  
                        },
                        select: {
                            oldSessionId: true,
                            bookId: true
                        }
                    })

                    if(!readingOldSession) throw new Error("READING OLD SESSION NOT FOUND")


                    //GET ROWS
                    const [readingRows, readingTotal] = await Promise.all([

                        prisma.readingSessionRow.findMany({
                            where: {
                                oldSessionId: readingOldSession?.oldSessionId
                            },
                            skip,
                            take: limit
                        }),

                        prisma.readingSessionRow.count({
                            where: {
                                oldSessionId: readingOldSession?.oldSessionId
                            }
                        })

                    ])

                    //GET ITEM
                    const readingItem = await prisma.readingBook.findFirst({
                        where: {
                            id: readingOldSession!.bookId
                        }
                    })

                    if(!readingItem) throw new Error("READING ITEM NOT FOUND")

                    return {data: {type: "reading" ,  reading: {item: readingItem! , contents: readingRows, total: readingTotal}}}

                }, readingTTL)

                return createResponse(true , 200 , readingCachedData , "SUCCESS: GetRowsById")

            case "writing":

                // GET CACHE KEY AND TTL
                const { key: writingKey, ttl: writingTTL } = CacheKeys.rows.writing(userId!, lang.id, prac.id, oldSessionId!, page, limit)
                
                const writingCachedData = await getOrSetCache(writingKey, async () => {

                    //GET OLD SESSION
                    const writingOldSession = await prisma.writingOldSession.findFirst({
                        where: {
                            oldSessionId: oldSessionId!,
                            writing: {
                                userId: userId,
                                practiceId: prac!.id,  
                                languageId: lang!.id
                            }  
                        },
                        select: {
                            oldSessionId: true,
                            bookId: true
                        }
                    })

                    if(!writingOldSession) throw new Error("WRITING OLD SESSION NOT FOUND")

                    //GET ROWS
                    const [writingRows, writingTotal] = await Promise.all([

                        prisma.writingSessionRow.findMany({
                            where: {
                                oldSessionId: writingOldSession?.oldSessionId
                            },
                            skip,
                            take: limit
                        }),

                        prisma.writingSessionRow.count({
                            where: {
                                oldSessionId: writingOldSession?.oldSessionId
                            }
                        })
                    ])

                    //GET ITEM
                    const writingItem = await prisma.writingBook.findFirst({
                        where: {
                            id: writingOldSession!.bookId
                        }
                    })

                    if(!writingItem) throw new Error("WRITING ITEM NOT FOUND")

                    return {data: {type: "writing" , writing: {item: writingItem! , contents: writingRows , total: writingTotal}}}
                
                }, writingTTL)

                return createResponse(true , 200 , writingCachedData , "SUCCESS: GetRowsById")

            case "listening":

                // GET CACHE KEY AND TTL
                const { key: listeningKey, ttl: listeningTTL } = CacheKeys.rows.listening(userId!, lang.id, prac.id, oldSessionId!, page, limit)
                
                const listeningCachedData = await getOrSetCache(listeningKey, async () => {

                    //GET OLD SESSION
                    const listeningOldSession = await prisma.listeningOldSession.findFirst({
                        where: {
                            oldSessionId: oldSessionId!,
                            listening: {
                                userId: userId,
                                practiceId: prac!.id,  
                                languageId: lang!.id
                            }  
                        },
                        select: {
                            oldSessionId: true,
                            categoryId: true
                        }
                    })

                    if(!listeningOldSession) throw new Error("LISTENING OLD SESSION NOT FOUND")

                    //GET ROWS
                    const [listeningRows , listeningTotal] = await Promise.all([

                        prisma.listeningSessionRow.findMany({
                            where: {
                                oldSessionId: listeningOldSession?.oldSessionId
                            },
                            skip,
                            take: limit
                        }),

                        prisma.listeningSessionRow.count({
                            where: {
                                oldSessionId: listeningOldSession?.oldSessionId
                            }
                        })
                    ])

                    //GET ITEM
                    const listeningItem = await prisma.listeningCategory.findFirst({
                        where: {
                            id: listeningOldSession!.categoryId
                        }
                    })

                    if(!listeningItem) throw new Error("LISTENING ITEM NOT FOUND")

                    return {data: {type: "listening" , listening: {item: listeningItem! , contents: listeningRows , total: listeningTotal}}}
                
                }, listeningTTL)

                return createResponse(true , 200 , listeningCachedData , "SUCCESS: GetRowsById")

            case "flashcard":

                // GET CACHE KEY AND TTL
                const { key: flashcardKey, ttl: flashcardTTL } = CacheKeys.rows.flashcard(userId!, lang.id, prac.id, oldSessionId!, page, limit)
                
                const flashcardCachedData = await getOrSetCache(flashcardKey, async () => {

                    // GET OLD SESSION  
                    const flashcardOldSession = await prisma.flashcardOldSession.findFirst({
                        where: {
                            oldSessionId: oldSessionId!,
                            flashcard: {
                                userId: userId,
                                practiceId: prac!.id,  
                                languageId: lang!.id
                            }  
                        },
                        select: {
                            oldSessionId: true,
                            categoryId: true
                        }
                    })

                    if(!flashcardOldSession) throw new Error("FLASHCARD OLD SESSION NOT FOUND")

                    //GET ROWS
                    const [flashcardRows , flashcardTotal] = await Promise.all([

                        prisma.flashcardSessionRow.findMany({
                            where: {
                                oldSessionId: flashcardOldSession?.oldSessionId
                            },
                            skip,
                            take: limit
                        }),

                        prisma.flashcardSessionRow.count({
                            where: {
                                oldSessionId: flashcardOldSession?.oldSessionId
                            }
                        })
                    ])


                    //GET ITEM
                    const flashcardItem = await prisma.flashcardCategory.findFirst({
                        where: {
                            id: flashcardOldSession!.categoryId
                        }
                    })

                    if(!flashcardItem) throw new Error("FLASHCARD ITEM NOT FOUND")

                    return {data: {type: "flashcard" , flashcard: {item: flashcardItem! , contents: flashcardRows , total: flashcardTotal}}}
                
                }, flashcardTTL)

                return createResponse(true , 200 , flashcardCachedData , "SUCCESS: GetRowsById")

            default:
                return createResponse<GetRowsByIdResponse>(false, 500, null, "ERROR: GetRowsById")
        }

    } catch (error) {
        
        console.log(`ERROR: GetRowsById: ${error}`)
        return createResponse<GetRowsByIdResponse>(false, 500, null, "ERROR: GetRowsById")
    }
}

export async function SaveRows({rows} : SaveRowsProps) : Promise<ApiResponse<undefined>> {

    try {

        if(!rows) return createResponse<undefined>(false, 400, null, "INVALID PARAMETERS")

        if(rows.length === 0) return createResponse<undefined>(false, 400, null, "EMPTY ARRAY")
        
        for(const row of rows) {

            switch(row.from) {

                case "reading":
                    await prisma.readingSessionRow.create({
                        data: {
                            oldSessionId: row.oldSessionId,
                            selectedSentence: row.selectedSentence,
                            answer: row.answer,
                            answerTranslate: row.answerTranslate,
                            similarity: row.similarity
                        }
                    })

                    await invalidateCacheByPrefix("get_reading_rows")

                    break

                case "writing":
                    await prisma.writingSessionRow.create({
                        data: {
                            oldSessionId: row.oldSessionId,
                            selectedSentence: row.selectedSentence,
                            answer: row.answer,
                            answerTranslate: row.answerTranslate,
                            similarity: row.similarity
                        }
                    })

                    await invalidateCacheByPrefix("get_writing_rows")

                    break

                case "listening":
                    await prisma.listeningSessionRow.create({
                        data: {
                            oldSessionId: row.oldSessionId,
                            listenedSentence: row.listenedSentence,
                            answer: row.answer,
                            similarity: row.similarity
                        }
                    })

                    await invalidateCacheByPrefix("get_listening_rows")

                    break

                case "flashcard":
                    await prisma.flashcardSessionRow.create({
                        data: {
                            oldSessionId: row.oldSessionId,
                            question: row.question,
                            answer: row.answer,
                            status: row.status
                        }
                    })

                    await invalidateCacheByPrefix("get_flashcard_rows")

                    break

                default:
                    return createResponse<undefined>(false, 500, null, "ERR: SaveRows!")

            }
        }

        return createResponse(true, 201, undefined, "Rows saved successfully!")

    } catch (error) {
        
        console.log(`ERROR: SaveRows: ${error}`)
        return createResponse<undefined>(false, 500, null, "ERROR: SaveRows!")
    }

}