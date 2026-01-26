// IMPORTS
import { Flashcard } from "@/src/generated/prisma/client"

export interface CreateFlashcardData {

    userId: string
    languageId: number
    practiceId: number
}

export interface UpdateFlashcardData {

    userId?: string
    languageId?: number
    practiceId?: number
}

export interface IFlashcardRepository {

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Flashcard | null>

    // CRUD
    createAsync(data: CreateFlashcardData): Promise<number>
    getByIdAsync(id: number): Promise<Flashcard | null>
    update(id: number, data: UpdateFlashcardData): Promise<number>
    delete(id: number): void
}