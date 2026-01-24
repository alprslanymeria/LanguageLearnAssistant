// IMPORTS
import { injectable } from "inversify"
import { FlashcardSessionRow } from "@/src/generated/prisma/client"
import { IFlashcardSessionRowRepository, CreateFlashcardSessionRowData, UpdateFlashcardSessionRowData } from "@/src/infrastructure/persistence/contracts/IFlashcardSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class FlashcardSessionRowRepository implements IFlashcardSessionRowRepository {

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

    async createRangeAsync(rows: CreateFlashcardSessionRowData[]): Promise<void> {
        
        await prisma.flashcardSessionRow.createMany({
            data: rows
        })
    }

     async createAsync(data: CreateFlashcardSessionRowData): Promise<number> {
    
        const created = await prisma.flashcardSessionRow.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<FlashcardSessionRow | null> {

        const flashcardSessionRow = await prisma.flashcardSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return flashcardSessionRow
    }

    async update(id: number, data: UpdateFlashcardSessionRowData): Promise<number> {

        const updatedFlashcardSessionRow = await prisma.flashcardSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedFlashcardSessionRow.id
    }

    delete(id: number): void {

        prisma.flashcardSessionRow.delete({
            where: {
                id: id
            }
        })
    }
}