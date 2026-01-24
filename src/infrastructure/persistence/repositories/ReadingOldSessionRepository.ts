// IMPORTS
import { injectable } from "inversify"
import { ReadingOldSession } from "@/src/generated/prisma/client"
import { IReadingOldSessionRepository, CreateReadingOldSessionData, UpdateReadingOldSessionData} from "@/src/infrastructure/persistence/contracts/IReadingOldSessionRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ReadingOldSessionRepository implements IReadingOldSessionRepository {

    async getReadingOldSessionsWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: ReadingOldSession[]; totalCount: number }> {
        
        const whereClause = {
            reading: {
                userId: userId
            }
        }

        const totalCount = await prisma.readingOldSession.count({
            where: whereClause
        })

        const items = await prisma.readingOldSession.findMany({
            where: whereClause,
            orderBy: { oldSessionId: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async createAsync(data: CreateReadingOldSessionData): Promise<string> {
    
        const created = await prisma.readingOldSession.create({
            data: data
        })

        return created.oldSessionId
    }

    async getByIdAsync(id: string): Promise<ReadingOldSession | null> {

        const readingOldSession = await prisma.readingOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return readingOldSession
    }

    async update(id: string, data: UpdateReadingOldSessionData): Promise<string> {

        const updatedReadingOldSession = await prisma.readingOldSession.update({

            where: {
                oldSessionId: id
            },
            data: data
        })

        return updatedReadingOldSession.oldSessionId
    }

    delete(id: string): void {

        prisma.readingOldSession.delete({
            where: {
                oldSessionId: id
            }
        })
    }

}