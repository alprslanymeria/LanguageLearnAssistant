// IMPORTS
import { FlashcardSessionRow } from "@/src/generated/prisma/client"

export interface CreateFlashcardSessionRowData {

    oldSessionId: string
    question: string
    answer: string
    status: boolean
}

export interface UpdateFlashcardSessionRowData {

    oldSessionId?: string
    question?: string
    answer?: string
    status?: boolean
}

export interface IFlashcardSessionRowRepository {

    // HELPER
    getFlashcardRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: FlashcardSessionRow[]; totalCount: number }>
    createRangeAsync(rows: CreateFlashcardSessionRowData[]): Promise<void>

    // CRUD
    createAsync(data: CreateFlashcardSessionRowData): Promise<number>
    getByIdAsync(id: number): Promise<FlashcardSessionRow | null>
    update(id: number, data: UpdateFlashcardSessionRowData): Promise<number>
    deleteAsync(id: number): Promise<void>
}