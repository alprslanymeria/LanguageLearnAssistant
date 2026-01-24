// IMPORTS
import { WritingSessionRow } from "@/src/generated/prisma/client"

export interface CreateWritingSessionRowData {

    oldSessionId: string
    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export interface UpdateWritingSessionRowData {

    oldSessionId?: string
    selectedSentence?: string
    answer?: string
    answerTranslate?: string
    similarity?: number
}

export interface IWritingSessionRowRepository {

    // HELPER
    getWritingRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: WritingSessionRow[]; totalCount: number }>
    createRangeAsync(rows: CreateWritingSessionRowData[]): Promise<void>

    // CRUD
    createAsync(data: CreateWritingSessionRowData): Promise<number>
    getByIdAsync(id: number): Promise<WritingSessionRow | null>
    update(id: number, data: UpdateWritingSessionRowData): Promise<number>
    delete(id: number): void
}