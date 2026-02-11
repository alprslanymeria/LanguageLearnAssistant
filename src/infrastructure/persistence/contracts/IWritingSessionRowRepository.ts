// IMPORTS
import { Prisma, WritingSessionRow } from "@prisma/client"

export interface IWritingSessionRowRepository {

    // CRUD
    createAsync(data: Prisma.WritingSessionRowCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<WritingSessionRow | null>
    updateAsync(id: number, data: Prisma.WritingSessionRowUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getWritingRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: WritingSessionRow[]; totalCount: number }>
    createRangeAsync(rows: Prisma.WritingSessionRowCreateManyInput[]): Promise<void>
}