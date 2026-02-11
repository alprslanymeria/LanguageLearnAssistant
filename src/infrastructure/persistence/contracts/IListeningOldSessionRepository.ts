// IMPORTS
import { ListeningOldSession, Prisma } from "@prisma/client"

export interface IListeningOldSessionRepository {

    // CRUD
    createAsync(data: Prisma.ListeningOldSessionCreateInput): Promise<void>
    getByIdAsync(id: string): Promise<ListeningOldSession | null>
    updateAsync(id: string, data: Prisma.ListeningOldSessionUpdateInput): Promise<void>
    deleteAsync(id: string): Promise<void>

    // HELPER
    getListeningOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: ListeningOldSession[]; totalCount: number }>
}