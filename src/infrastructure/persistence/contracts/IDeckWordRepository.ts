// IMPORTS
import { DeckWord, Language } from "@/src/generated/prisma/client"

export type DeckWordWithLanguage = {

    id: number
    question: string
    answer: string
    categoryId: number
    category: {
        flashcard: {
            language: Language
        }
    }
}

export interface CreateDeckWordData {

    categoryId: number
    question: string
    answer: string
}

export interface UpdateDeckWordData {

    categoryId?: number
    question?: string
    answer?: string
}

export interface IDeckWordRepository {

    // HELPER
    getDeckWordItemByIdAsync(id: number): Promise<DeckWordWithLanguage | null>
    getAllDWordsWithPagingAsync(userId: string, page: number, pageSize: number ): Promise<{items: DeckWord[], totalCount: number}>

    // CRUD
    createAsync(data: CreateDeckWordData): Promise<number>
    getByIdAsync(id: number): Promise<DeckWord | null>
    update(id: number,data: UpdateDeckWordData): Promise<number>
    deleteAsync(id: number): Promise<void>
}