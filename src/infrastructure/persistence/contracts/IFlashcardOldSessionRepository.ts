// IMPORTS
import { FlashcardOldSession, Prisma } from "@prisma/client"

export interface IFlashcardOldSessionRepository {

    // CRUD
    createAsync(data: Prisma.FlashcardOldSessionCreateInput): Promise<void>
    getByIdAsync(id: string): Promise<FlashcardOldSession | null>
    updateAsync(id: string, data: Prisma.FlashcardOldSessionUpdateInput): Promise<void>
    deleteAsync(id: string): Promise<void>

    // HELPER
    getFlashcardOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: FlashcardOldSession[]; totalCount: number }>
}