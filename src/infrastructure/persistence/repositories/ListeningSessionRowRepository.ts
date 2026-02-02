// IMPORTS
import { injectable } from "inversify"
import { ListeningSessionRow } from "@/src/generated/prisma/client"
import { IListeningSessionRowRepository, CreateListeningSessionRowData, UpdateListeningSessionRowData } from "@/src/infrastructure/persistence/contracts/IListeningSessionRowRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ListeningSessionRowRepository implements IListeningSessionRowRepository {

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

    async createRangeAsync(rows: CreateListeningSessionRowData[]): Promise<void> {
        
        await prisma.listeningSessionRow.createMany({
            data: rows
        })
    }

    async createAsync(data: CreateListeningSessionRowData): Promise<number> {
    
        const created = await prisma.listeningSessionRow.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<ListeningSessionRow | null> {

        const listeningSessionRow = await prisma.listeningSessionRow.findUnique({
            where: {
                id: id
            }
        })

        return listeningSessionRow
    }

    async update(id: number, data: UpdateListeningSessionRowData): Promise<number> {

        const updatedListeningSessionRow = await prisma.listeningSessionRow.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedListeningSessionRow.id
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.listeningSessionRow.delete({
            where: {
                id: id
            }
        })
    }

}