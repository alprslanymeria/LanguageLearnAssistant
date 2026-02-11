// IMPORTS
import { Prisma, ReadingSessionRow } from "@prisma/client"

export interface IReadingSessionRowRepository {

    // CRUD
    createAsync(data: Prisma.ReadingSessionRowCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<ReadingSessionRow | null>
    updateAsync(id: number, data: Prisma.ReadingSessionRowUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getReadingRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: ReadingSessionRow[]; totalCount: number }>
    createRangeAsync(rows: Prisma.ReadingSessionRowCreateManyInput[]): Promise<void>
}