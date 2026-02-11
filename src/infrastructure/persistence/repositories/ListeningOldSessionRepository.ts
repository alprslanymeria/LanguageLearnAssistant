// IMPORTS
import { injectable } from "inversify"
import { IListeningOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IListeningOldSessionRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { ListeningOldSession, Prisma } from "@prisma/client"

@injectable()
export class ListeningOldSessionRepository implements IListeningOldSessionRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ListeningOldSessionCreateInput): Promise<void> {
    
        await prisma.listeningOldSession.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: string): Promise<ListeningOldSession | null> {

        const listeningOldSession = await prisma.listeningOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return listeningOldSession
    }

    async updateAsync(id: string, data: Prisma.ListeningOldSessionUpdateInput): Promise<void> {

        await prisma.listeningOldSession.update({

            where: {
                oldSessionId: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: string): Promise<void> {

        await prisma.listeningOldSession.delete({
            where: {
                oldSessionId: id
            }
        })

        return
    }

    // HELPER OPERATIONS
    
    async getListeningOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: ListeningOldSession[]; totalCount: number }> {
        
        const whereClause = {
            listening: {
                userId: userId,
                language: {
                    name: language
                }
            }
        }

        const totalCount = await prisma.listeningOldSession.count({
            where: whereClause
        })

        const items = await prisma.listeningOldSession.findMany({
            where: whereClause,
            orderBy: { oldSessionId: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }
}