// IMPORTS
import { injectable } from "inversify"
import { Prisma, ReadingOldSession } from "@prisma/client"
import { IReadingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IReadingOldSessionRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ReadingOldSessionRepository implements IReadingOldSessionRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ReadingOldSessionCreateInput): Promise<void> {
    
        await prisma.readingOldSession.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: string): Promise<ReadingOldSession | null> {

        const readingOldSession = await prisma.readingOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return readingOldSession
    }

    async updateAsync(id: string, data: Prisma.ReadingOldSessionUpdateInput): Promise<void> {

        await prisma.readingOldSession.update({

            where: {
                oldSessionId: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: string): Promise<void> {

        await prisma.readingOldSession.delete({
            where: {
                oldSessionId: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getReadingOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: ReadingOldSession[]; totalCount: number }> {
        
        const whereClause = {
            reading: {
                userId: userId,
                language: {
                    name: language
                }
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
}