// IMPORTS
import { injectable } from "inversify"
import { ListeningSessionRow, Prisma } from "@prisma/client"
import { IListeningSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IListeningSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ListeningSessionRowRepository implements IListeningSessionRowRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ListeningSessionRowCreateInput): Promise<void> {
    
        await prisma.listeningSessionRow.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<ListeningSessionRow | null> {

        const listeningSessionRow = await prisma.listeningSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return listeningSessionRow
    }

    async updateAsync(id: number, data: Prisma.ListeningSessionRowUpdateInput): Promise<void> {

        await prisma.listeningSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.listeningSessionRow.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getListeningRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: ListeningSessionRow[]; totalCount: number }> {
        
        const whereClause = { oldSessionId: sessionId };

        const totalCount = await prisma.listeningSessionRow.count({
            where: whereClause
        })

        const items = await prisma.listeningSessionRow.findMany({
            where: whereClause,
            orderBy: { id: 'asc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async createRangeAsync(rows: Prisma.ListeningSessionRowCreateManyInput[]): Promise<void> {
        
        await prisma.listeningSessionRow.createMany({
            data: rows
        })
    }
}