// IMPORTS
import { injectable } from "inversify"
import { IWritingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IWritingOldSessionRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { Prisma, WritingOldSession } from "@prisma/client"

@injectable()
export class WritingOldSessionRepository implements IWritingOldSessionRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.WritingOldSessionCreateInput): Promise<void> {
    
        await prisma.writingOldSession.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: string): Promise<WritingOldSession | null> {

        const writingOldSession = await prisma.writingOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return writingOldSession
    }

    async updateAsync(id: string, data: Prisma.WritingOldSessionUpdateInput): Promise<void> {

        await prisma.writingOldSession.update({

            where: {
                oldSessionId: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: string): Promise<void> {

        await prisma.writingOldSession.delete({
            where: {
                oldSessionId: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getWritingOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: WritingOldSession[]; totalCount: number }> {
        
        const whereClause = {
            writing: {
                userId: userId,
                language: {
                    name: language
                }
            }
        }

        const totalCount = await prisma.writingOldSession.count({
            where: whereClause
        })

        const items = await prisma.writingOldSession.findMany({
            where: whereClause,
            orderBy: { oldSessionId: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }
}