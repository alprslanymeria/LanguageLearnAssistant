// IMPORTS
import { ReadingSessionRow } from "@/src/generated/prisma/client"

export interface CreateReadingSessionRowData {

    oldSessionId: string
    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export interface UpdateReadingSessionRowData {

    oldSessionId?: string
    selectedSentence?: string
    answer?: string
    answerTranslate?: string
    similarity?: number
}

export interface IReadingSessionRowRepository {

    // HELPER
    getReadingRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: ReadingSessionRow[]; totalCount: number }>
    createRangeAsync(rows: CreateReadingSessionRowData[]): Promise<void>

    // CRUD
    createAsync(data: CreateReadingSessionRowData): Promise<number>
    getByIdAsync(id: number): Promise<ReadingSessionRow | null>
    update(id: number, data: UpdateReadingSessionRowData): Promise<number>
    deleteAsync(id: number): Promise<void>
}