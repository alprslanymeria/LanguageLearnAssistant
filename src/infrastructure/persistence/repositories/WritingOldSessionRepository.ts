// IMPORTS
import { injectable } from "inversify"
import { IWritingOldSessionRepository, CreateWritingOldSessionData, UpdateWritingOldSessionData } from "@/src/infrastructure/persistence/contracts/IWritingOldSessionRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { WritingOldSession } from "@/src/generated/prisma/client"

@injectable()
export class WritingOldSessionRepository implements IWritingOldSessionRepository {

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

    async createAsync(data: CreateWritingOldSessionData): Promise<string> {
    
        const created = await prisma.writingOldSession.create({
            data: data
        })

        return created.oldSessionId
    }

    async getByIdAsync(id: string): Promise<WritingOldSession | null> {

        const writingOldSession = await prisma.writingOldSession.findUnique({
            where: {
                oldSessionId: id
            }
        })

        return writingOldSession
    }

    async update(id: string, data: UpdateWritingOldSessionData): Promise<string> {

        const updatedWritingOldSession = await prisma.writingOldSession.update({

            where: {
                oldSessionId: id
            },
            data: data
        })

        return updatedWritingOldSession.oldSessionId
    }

    async deleteAsync(id: string): Promise<void> {

        await prisma.writingOldSession.delete({
            where: {
                oldSessionId: id
            }
        })
    }

}