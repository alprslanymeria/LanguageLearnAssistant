// IMPORTS
import { injectable } from "inversify"
import { IWritingSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IWritingSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { Prisma, WritingSessionRow } from "@prisma/client"

@injectable()
export class WritingSessionRowRepository implements IWritingSessionRowRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.WritingSessionRowCreateInput): Promise<void> {
    
        await prisma.writingSessionRow.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<WritingSessionRow | null> {

        const writingSessionRow = await prisma.writingSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return writingSessionRow
    }

    async updateAsync(id: number, data: Prisma.WritingSessionRowUpdateInput): Promise<void> {

        await prisma.writingSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.writingSessionRow.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getWritingRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: WritingSessionRow[]; totalCount: number }> {
        
        const whereClause = { oldSessionId: sessionId };

        const totalCount = await prisma.writingSessionRow.count({
            where: whereClause
        })

        const items = await prisma.writingSessionRow.findMany({
            where: whereClause,
            orderBy: { id: 'asc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async createRangeAsync(rows: Prisma.WritingSessionRowCreateManyInput[]): Promise<void> {
        
        await prisma.writingSessionRow.createMany({
            data: rows
        })
    }
}