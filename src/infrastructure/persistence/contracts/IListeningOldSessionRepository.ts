// IMPORTS
import { ListeningOldSession } from "@/src/generated/prisma/client"

export interface CreateListeningOldSessionData {

    oldSessionId: string
    listeningId: number
    categoryId: number
    rate: number
}

export interface UpdateListeningOldSessionData {

    listeningId?: number
    categoryId?: number
    rate?: number
}

export interface IListeningOldSessionRepository {

    // HELPER
    getListeningOldSessionsWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: ListeningOldSession[]; totalCount: number }>

    // CRUD
    createAsync(data: CreateListeningOldSessionData): Promise<string>
    getByIdAsync(id: string): Promise<ListeningOldSession | null>
    update(id: string, data: UpdateListeningOldSessionData): Promise<string>
    delete(id: string): void
}