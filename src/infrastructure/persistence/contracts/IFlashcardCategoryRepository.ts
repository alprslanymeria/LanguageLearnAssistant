// IMPORTS
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
import { FlashcardCategory, Language } from "@/src/generated/prisma/client"

export type FlashcardCategoryWithLanguage = {

    id: number
    name: string
    flashcardId: number
    flashcard: {
        language: Language
    }
}

export interface CreateFlashcardCategoryData {

    name: string
    flashcardId: number
}

export interface UpdateFlashcardCategoryData {

    name?: string
    flashcardId?: number
}

export interface IFlashcardCategoryRepository {

    // HELPER
    getFlashcardCategoryItemByIdAsync(id: number): Promise<FlashcardCategoryWithLanguage | null>
    getAllFCategoriesWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: FlashcardCategory[], totalCount: number}>
    getAllFCategoriesAsync(userId: string): Promise<{ items: FlashcardCategory[], totalCount: number}>
    getFCategoryCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<FlashcardCategoryWithDeckWords[]>
    getByIdWithDeckWordsAsync(id: number): Promise<FlashcardCategoryWithDeckWords | null>

    // CRUD
    createAsync(data: CreateFlashcardCategoryData): Promise<number>
    getByIdAsync(id: number): Promise<FlashcardCategory | null>
    update(id: number, data: UpdateFlashcardCategoryData): Promise<number>
    delete(id: number): void
}