"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// TYPES
import { GetOldSessionsProps, GetOldSessionsResponse, SaveOldSessionProps, SaveOldSessionResponse } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
// UTILS
import { createResponse } from "@/src/utils/response"
// ZOD
import { GetOldSessionsSchema } from "@/src/zod/actionsSchema"


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

        if(!lang) throw new Error("Language Not Found!")

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

        if(!prac) throw new Error("Practice Not Found!")

        const skip = (page - 1) * limit

        switch (practice) {
            case "flashcard":
                
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

                if(flashcardOldSessions.length === 0) return createResponse<GetOldSessionsResponse>(true, 200, {data: {data: [], total: 0}}, "ERROR: GetOldSessions")

                return createResponse(true, 200, {data: {data: flashcardOldSessions, total: flashcardOldSessionsTotal}}, "SUCCESS: GetOldSessions!")

            case "reading":
                
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

                if(readingOldSessions.length === 0) return createResponse<GetOldSessionsResponse>(true, 200, {data: {data: [], total: 0}}, "ERROR: GetOldSessions")

                return createResponse(true, 200, {data: {data: readingOldSessions, total: readingOldSessionsTotal}}, "SUCCESS: GetOldSessions!")

            case "writing":
                
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

                if(writingOldSessions.length === 0) return createResponse<GetOldSessionsResponse>(true, 200, {data: {data: [], total: 0}}, "ERROR: GetOldSessions")

                return createResponse(true, 200, {data: {data: writingOldSessions, total: writingOldSessionsTotal}}, "SUCCESS: GetOldSessions!")

            case "listening":

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

                if(listeningOldSessions.length === 0) return createResponse<GetOldSessionsResponse>(true, 200, {data: {data: [], total: 0}}, "ERROR: GetOldSessions")

                return createResponse(true, 200, {data: {data: listeningOldSessions, total: listeningOldSessionsTotal } }, "SUCCESS: GetOldSessions!")

            default:
                return createResponse<GetOldSessionsResponse>(false, 500, null, "ERROR: GetOldSessions")
        }

    } catch (error) {

        console.log(`ERROR: GetOldSessions: ${error}`)
        return createResponse<GetOldSessionsResponse>(false, 500, null, "ERROR: GetOldSessions")

    }
}


export async function SaveOldSession(params : SaveOldSessionProps) : Promise<ApiResponse<SaveOldSessionResponse>>  {

    try {

        const {oldSessionRow} = params

        // BURASI ZOR OLDUĞU ZOD İLE YAPMADIM. BÖYLE KALSIN
        if (!oldSessionRow) return createResponse<SaveOldSessionResponse>(false, 400, null, "INVALID PARAMETERS")
        
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

                return createResponse(true, 201, {data: listeningOldSession}, "Oldsession saved successfully!")

            default: 
                return createResponse<SaveOldSessionResponse>(false, 500, null, "ERROR: SaveOldSession!")
        }

    } catch (error) {

        console.log(`ERROR: SaveOldSession: ${error}`)
        return createResponse<SaveOldSessionResponse>(false, 500, null, "ERROR: SaveOldSession!")

    }
}