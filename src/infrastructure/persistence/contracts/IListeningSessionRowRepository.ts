// IMPORTS
import { ListeningSessionRow } from "@/src/generated/prisma/client"

export interface CreateListeningSessionRowData {

    oldSessionId: string
    listenedSentence: string
    answer: string
    similarity: number
}

export interface UpdateListeningSessionRowData {

    oldSessionId?: string
    listenedSentence?: string
    answer?: string
    similarity?: number
}

export interface IListeningSessionRowRepository {

    // HELPER
    getListeningRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: ListeningSessionRow[]; totalCount: number }>
    createRangeAsync(rows: CreateListeningSessionRowData[]): Promise<void>

    // CRUD
    createAsync(data: CreateListeningSessionRowData): Promise<number>
    getByIdAsync(id: number): Promise<ListeningSessionRow | null>
    update(id: number, data: UpdateListeningSessionRowData): Promise<number>
    delete(id: number): void
}