// IMPORTS
import { injectable } from "inversify"
import { FlashcardOldSession } from "@/src/generated/prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { CreateFlashcardOldSessionData, IFlashcardOldSessionRepository, UpdateFlashcardOldSessionData } from "@/src/infrastructure/persistence/contracts/IFlashcardOldSessionRepository"

@injectable()
export class FlashcardOldSessionRepository implements IFlashcardOldSessionRepository {


    async getFlashcardOldSessionsWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: FlashcardOldSession[]; totalCount: number }> {
        
        const whereClause = {
            flashcard: {
                userId: userId
            }
        }

        const totalCount = await prisma.flashcardOldSession.count({
            where: whereClause
        })

        const items = await prisma.flashcardOldSession.findMany({
            where: whereClause,
            orderBy: { oldSessionId: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async createAsync(data: CreateFlashcardOldSessionData): Promise<string> {

        const created = await prisma.flashcardOldSession.create({
            data: data
        })

        return created.oldSessionId
    }

    async getByIdAsync(id: string): Promise<FlashcardOldSession | null> {

        const flashcardOldSession = await prisma.flashcardOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return flashcardOldSession
    }

    async update(id: string, data: UpdateFlashcardOldSessionData): Promise<string> {

        const updatedFlashcardOldSession = await prisma.flashcardOldSession.update({
            where: {
                oldSessionId: id
            },
            data: data
        })

        return updatedFlashcardOldSession.oldSessionId
    }

    delete(id: string): void {

        prisma.flashcardOldSession.delete({
            where: {
                oldSessionId: id
            }
        })
    }

}