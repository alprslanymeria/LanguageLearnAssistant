// IMPORTS
import { ListeningSessionRow, Prisma } from "@prisma/client"

export interface IListeningSessionRowRepository {

    // CRUD
    createAsync(data: Prisma.ListeningSessionRowCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<ListeningSessionRow | null>
    updateAsync(id: number, data: Prisma.ListeningSessionRowUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getListeningRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: ListeningSessionRow[]; totalCount: number }>
    createRangeAsync(rows: Prisma.ListeningSessionRowCreateManyInput[]): Promise<void>
}