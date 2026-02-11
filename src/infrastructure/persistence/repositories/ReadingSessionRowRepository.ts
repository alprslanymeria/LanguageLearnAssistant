// IMPORTS
import { injectable } from "inversify"
import { Prisma, ReadingSessionRow } from "@prisma/client"
import { IReadingSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IReadingSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ReadingSessionRowRepository implements IReadingSessionRowRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ReadingSessionRowCreateInput): Promise<void> {
    
        await prisma.readingSessionRow.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<ReadingSessionRow | null> {

        const readingSessionRow = await prisma.readingSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return  readingSessionRow
    }

    async updateAsync(id: number, data: Prisma.ReadingSessionRowUpdateInput): Promise<void> {

        await prisma.readingSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.readingSessionRow.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getReadingRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: ReadingSessionRow[]; totalCount: number }> {
        
        const whereClause = { oldSessionId: sessionId };

        const totalCount = await prisma.readingSessionRow.count({
            where: whereClause
        })

        const items = await prisma.readingSessionRow.findMany({
            where: whereClause,
            orderBy: { id: 'asc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async createRangeAsync(rows: Prisma.ReadingSessionRowCreateManyInput[]): Promise<void> {
        
        await prisma.readingSessionRow.createMany({
            data: rows
        })
    }
}