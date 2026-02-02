// IMPORTS
import { injectable } from "inversify"
import { IWritingSessionRowRepository, CreateWritingSessionRowData, UpdateWritingSessionRowData } from "@/src/infrastructure/persistence/contracts/IWritingSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { WritingSessionRow } from "@/src/generated/prisma/client"

@injectable()
export class WritingSessionRowRepository implements IWritingSessionRowRepository {

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

    async createRangeAsync(rows: CreateWritingSessionRowData[]): Promise<void> {
        
        await prisma.writingSessionRow.createMany({
            data: rows
        })
    }

    async createAsync(data: CreateWritingSessionRowData): Promise<number> {
    
        const created = await prisma.writingSessionRow.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<WritingSessionRow | null> {

        const writingSessionRow = await prisma.writingSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return writingSessionRow
    }

    async update(id: number, data: UpdateWritingSessionRowData): Promise<number> {

        const updatedWritingSessionRow = await prisma.writingSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedWritingSessionRow.id
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.writingSessionRow.delete({
            where: {
                id: id
            }
        })
    }

}