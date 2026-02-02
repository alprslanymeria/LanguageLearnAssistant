// IMPORTS
import { injectable } from "inversify"
import { IListeningOldSessionRepository , CreateListeningOldSessionData, UpdateListeningOldSessionData} from "@/src/infrastructure/persistence/contracts/IListeningOldSessionRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { ListeningOldSession } from "@/src/generated/prisma/client"

@injectable()
export class ListeningOldSessionRepository implements IListeningOldSessionRepository {

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

    async createAsync(data: CreateListeningOldSessionData): Promise<string> {
    
        const created = await prisma.listeningOldSession.create({
            data: data
        })

        return created.oldSessionId
    }

    async getByIdAsync(id: string): Promise<ListeningOldSession | null> {

        const listeningOldSession = await prisma.listeningOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return listeningOldSession
    }

    async update(id: string, data: UpdateListeningOldSessionData): Promise<string> {

        const updatedListeningOldSession = await prisma.listeningOldSession.update({

            where: {
                oldSessionId: id
            },
            data: data
        })

        return updatedListeningOldSession.oldSessionId
    }

    async deleteAsync(id: string): Promise<void> {

        await prisma.listeningOldSession.delete({
            where: {
                oldSessionId: id
            }
        })
    }
}