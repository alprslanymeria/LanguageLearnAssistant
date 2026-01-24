// IMPORTS
import { WritingOldSession } from "@/src/generated/prisma/client"

export interface CreateWritingOldSessionData {

    oldSessionId: string
    writingId: number
    bookId: number
    rate: number
}

export interface UpdateWritingOldSessionData {

    writingId: number
    bookId: number
    rate: number
}

export interface IWritingOldSessionRepository {

    // HELPER
    getWritingOldSessionsWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: WritingOldSession[]; totalCount: number }>

    // CRUD
    createAsync(data: CreateWritingOldSessionData): Promise<string>
    getByIdAsync(id: string): Promise<WritingOldSession | null>
    update(id: string, data: UpdateWritingOldSessionData): Promise<string>
    delete(id: string): void
}