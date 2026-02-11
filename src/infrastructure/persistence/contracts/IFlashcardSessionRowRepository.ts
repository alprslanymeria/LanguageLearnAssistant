// IMPORTS
import { FlashcardSessionRow, Prisma } from "@prisma/client"


export interface IFlashcardSessionRowRepository {

    // CRUD
    createAsync(data: Prisma.FlashcardSessionRowCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<FlashcardSessionRow | null>
    updateAsync(id: number, data: Prisma.FlashcardSessionRowUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getFlashcardRowsByIdWithPagingAsync(sessionId: string, page: number, pageSize: number): Promise<{ items: FlashcardSessionRow[]; totalCount: number }>
    createRangeAsync(rows: Prisma.FlashcardSessionRowCreateManyInput[]): Promise<void>
}