// IMPORTS
import { FlashcardOldSession } from "@/src/generated/prisma/client"

export interface CreateFlashcardOldSessionData {

    oldSessionId: string
    flashcardId: number
    categoryId: number
    rate: number
}

export interface UpdateFlashcardOldSessionData {

    flashcardId: number
    categoryId: number
    rate: number
}

export interface IFlashcardOldSessionRepository {

    // HELPER
    getFlashcardOldSessionsWithPagingAsync(userId: string, language: string, page: number, pageSize: number): Promise<{ items: FlashcardOldSession[]; totalCount: number }>

    // CRUD
    createAsync(data: CreateFlashcardOldSessionData): Promise<string>
    getByIdAsync(id: string): Promise<FlashcardOldSession | null>
    update(id: string, data: UpdateFlashcardOldSessionData): Promise<string>
    deleteAsync(id: string): Promise<void>
}