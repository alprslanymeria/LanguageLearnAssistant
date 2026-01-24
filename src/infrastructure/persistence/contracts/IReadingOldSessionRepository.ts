// IMPORTS
import { ReadingOldSession } from "@/src/generated/prisma/client"

export interface CreateReadingOldSessionData {

    oldSessionId: string
    readingId: number
    bookId: number
    rate: number
}

export interface UpdateReadingOldSessionData {

    readingId?: number
    bookId?: number
    rate?: number
}

export interface IReadingOldSessionRepository {

    // HELPER
    getReadingOldSessionsWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: ReadingOldSession[]; totalCount: number }>
    
    // CRUD
    createAsync(data: CreateReadingOldSessionData): Promise<string>
    getByIdAsync(id: string): Promise<ReadingOldSession | null>
    update(id: string, data: UpdateReadingOldSessionData): Promise<string>
    delete(id: string): void
}