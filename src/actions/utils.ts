"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { GetCreateItemsProps, GetCreateItemsResponse } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// UTILS
import { createResponse } from "@/src/utils/response"
// ZOD
import { GetCreateItemsSchema } from "@/src/zod/actionsSchema"
import { CacheKeys } from "../utils/cache_keys"
import { getOrSetCache } from "../utils/redisHelper"


export default async function GetCreateItems(params : GetCreateItemsProps) : Promise<ApiResponse<GetCreateItemsResponse>>{

    try {

        await GetCreateItemsSchema.parseAsync(params)

        const {userId, language, practice} = params

        
        // GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                name: language!
            },
            select: {
                id: true
            }
        })

        if(!lang) throw new Error("LANGUAGE NOT FOUND")

        // GET PRACTICE ID
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
    

        switch (practice) {
            case "flashcard":

                const {key: flashcardKey, ttl: flashcardTTL} = CacheKeys.createItems.flashcard(userId!, lang.id, prac.id)

                await getOrSetCache(flashcardKey, async () => {

                    const flashcardCreateItems = await prisma.flashcardCategory.findMany({
                        where: {
                            flashcard: {
                                userId: userId,
                                practiceId: prac!.id,
                                languageId: lang!.id
                            }
                        },
                        include : {
                            deckWords: true
                        }
                    })

                    const filteredFlashcardItems = flashcardCreateItems.filter(item => item.deckWords.length > 0)

                    if(filteredFlashcardItems.length === 0) return createResponse<GetCreateItemsResponse>(true, 200, {data: []}, "ERROR: GetCreateItems")

                    return createResponse(true , 200 , {data: filteredFlashcardItems} , "SUCCESS: GetCreateItems")
                
                }, flashcardTTL)

            case "reading":

                const {key: readingKey, ttl: readingTTL} = CacheKeys.createItems.reading(userId!, lang.id, prac.id)

                await getOrSetCache(readingKey, async () => {

                    const readingCreateItems = await prisma.readingBook.findMany({
                        where: {
                            reading: {
                                userId: userId,
                                practiceId: prac!.id,
                                languageId: lang!.id
                            }
                        }
                    })

                    if(readingCreateItems.length === 0) return createResponse<GetCreateItemsResponse>(true, 200, {data: []}, "ERROR: GetCreateItems")

                    return createResponse(true , 200 , {data: readingCreateItems} , "SUCCESS: GetCreateItems")
                }, readingTTL)

            case "writing":

                const {key: writingKey, ttl: writingTTL} = CacheKeys.createItems.writing(userId!, lang.id, prac.id)

                await getOrSetCache(writingKey, async () => {

                    const writingCreateItems = await prisma.writingBook.findMany({
                        where: {
                            writing: {
                                userId: userId,
                                practiceId: prac!.id,
                                languageId: lang!.id
                            }
                        }
                    })

                    if(writingCreateItems.length === 0) return createResponse<GetCreateItemsResponse>(true, 200, {data: []}, "ERROR: GetCreateItems")

                    return createResponse(true , 200 , {data: writingCreateItems} , "SUCCESS: GetCreateItems")
                }, writingTTL)

            case "listening":

                const {key: listeningKey, ttl: listeningTTL} = CacheKeys.createItems.listening(userId!, lang.id, prac.id)

                await getOrSetCache(listeningKey, async () => {

                    const listeningCreateItems = await prisma.listeningCategory.findMany({
                        where: {
                            listening: {
                                userId: userId,
                                practiceId: prac!.id,
                                languageId: lang!.id
                            }
                        },
                        include: {
                            deckVideos: true
                        }
                    })

                    const filteredListeningItems = listeningCreateItems.filter(item => item.deckVideos.length > 0)

                    if(filteredListeningItems.length === 0) return createResponse<GetCreateItemsResponse>(true, 200, {data: []}, "ERROR: GetCreateItems")

                    return createResponse(true , 200 , {data: filteredListeningItems} , "SUCCESS: GetCreateItems")
                }, listeningTTL)

            default:
                return createResponse<GetCreateItemsResponse>(false, 500, null, "ERROR: GetCreateItems")
        }

    } catch (error) {
        
        console.log(`ERROR: GetCreateItems: ${error}`)
        return createResponse<GetCreateItemsResponse>(false, 500, null, "ERROR: GetCreateItems")
    }
}