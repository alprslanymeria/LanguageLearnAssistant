// IMPORTS
import { injectable } from "inversify"
import { ReadingSessionRow } from "@/src/generated/prisma/client"
import { IReadingSessionRowRepository, CreateReadingSessionRowData, UpdateReadingSessionRowData } from "@/src/infrastructure/persistence/contracts/IReadingSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ReadingSessionRowRepository implements IReadingSessionRowRepository {

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

    async createRangeAsync(rows: CreateReadingSessionRowData[]): Promise<void> {
        
        await prisma.readingSessionRow.createMany({
            data: rows
        })
    }

    async createAsync(data: CreateReadingSessionRowData): Promise<number> {
    
        const created = await prisma.readingSessionRow.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<ReadingSessionRow | null> {

        const readingSessionRow = await prisma.readingSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return  readingSessionRow
    }

    async update(id: number, data: UpdateReadingSessionRowData): Promise<number> {

        const updatedReadingSessionRow = await prisma.readingSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedReadingSessionRow.id
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.readingSessionRow.delete({
            where: {
                id: id
            }
        })
    }

}