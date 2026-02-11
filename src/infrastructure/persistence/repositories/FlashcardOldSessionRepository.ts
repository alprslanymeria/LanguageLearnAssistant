// IMPORTS
import { injectable } from "inversify"
import { FlashcardOldSession, Prisma } from "@prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IFlashcardOldSessionRepository} from "@/src/infrastructure/persistence/contracts/IFlashcardOldSessionRepository"

@injectable()
export class FlashcardOldSessionRepository implements IFlashcardOldSessionRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.FlashcardOldSessionCreateInput): Promise<void> {

        await prisma.flashcardOldSession.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: string): Promise<FlashcardOldSession | null> {

        const flashcardOldSession = await prisma.flashcardOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return flashcardOldSession
    }

    async updateAsync(id: string, data: Prisma.FlashcardOldSessionUpdateInput): Promise<void> {

        await prisma.flashcardOldSession.update({
            where: {
                oldSessionId: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: string): Promise<void> {

        await prisma.flashcardOldSession.delete({
            where: {
                oldSessionId: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getFlashcardOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: FlashcardOldSession[]; totalCount: number }> {
        
        const whereClause = {
            flashcard: {
                userId: userId,
                language: {
                    name: language
                }
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
}