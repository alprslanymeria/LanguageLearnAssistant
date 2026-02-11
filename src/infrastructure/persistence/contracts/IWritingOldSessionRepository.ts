// IMPORTS
import { Prisma, WritingOldSession } from "@prisma/client"

export interface IWritingOldSessionRepository {

    // CRUD
    createAsync(data: Prisma.WritingOldSessionCreateInput): Promise<void>
    getByIdAsync(id: string): Promise<WritingOldSession | null>
    updateAsync(id: string, data: Prisma.WritingOldSessionUpdateInput): Promise<void>
    deleteAsync(id: string): Promise<void>

    // HELPER
    getWritingOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: WritingOldSession[]; totalCount: number }>
}