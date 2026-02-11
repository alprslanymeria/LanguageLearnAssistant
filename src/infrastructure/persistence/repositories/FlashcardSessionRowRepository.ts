// IMPORTS
import { injectable } from "inversify"
import { FlashcardSessionRow, Prisma } from "@prisma/client"
import { IFlashcardSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class FlashcardSessionRowRepository implements IFlashcardSessionRowRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.FlashcardSessionRowCreateInput): Promise<void> {
    
        await prisma.flashcardSessionRow.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<FlashcardSessionRow | null> {

        const flashcardSessionRow = await prisma.flashcardSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return flashcardSessionRow
    }

    async updateAsync(id: number, data: Prisma.FlashcardSessionRowUpdateInput): Promise<void> {

        await prisma.flashcardSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.flashcardSessionRow.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getFlashcardRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: FlashcardSessionRow[]; totalCount: number }> {
        
        const whereClause = { oldSessionId : sessionId };

        const totalCount = await prisma.flashcardSessionRow.count({
            where: whereClause
        })

        const items = await prisma.flashcardSessionRow.findMany({
            where: whereClause,
            orderBy: { id: 'asc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async createRangeAsync(rows: Prisma.FlashcardSessionRowCreateManyInput[]): Promise<void> {
        
        await prisma.flashcardSessionRow.createMany({
            data: rows
        })
    }
}