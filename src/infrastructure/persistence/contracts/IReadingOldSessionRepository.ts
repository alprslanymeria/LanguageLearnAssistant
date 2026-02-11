// IMPORTS
import { Prisma, ReadingOldSession } from "@prisma/client"

export interface IReadingOldSessionRepository {

    // CRUD
    createAsync(data: Prisma.ReadingOldSessionCreateInput): Promise<void>
    getByIdAsync(id: string): Promise<ReadingOldSession | null>
    updateAsync(id: string, data: Prisma.ReadingOldSessionUpdateInput): Promise<void>
    deleteAsync(id: string): Promise<void>

    // HELPER
    getReadingOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: ReadingOldSession[]; totalCount: number }>
}