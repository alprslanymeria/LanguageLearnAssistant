// IMPORTS
import { Language, ReadingBook } from "@/src/generated/prisma/client"

export type ReadingBookWithLanguage = {

    id: number
    name: string
    readingId: number
    imageUrl: string
    leftColor: string
    sourceUrl: string
    reading: {
        language: Language
    }
}

export interface CreateReadingBookData {

    name: string
    readingId: number
    imageUrl: string
    leftColor: string
    sourceUrl: string
}

export interface UpdateReadingBookData {

    name?: string
    readingId?: number
    imageUrl?: string
    leftColor?: string
    sourceUrl?: string
}

export interface IReadingBookRepository {

    // HELPER
    getReadingBookItemByIdAsync(id: number): Promise<ReadingBookWithLanguage | null>
    getAllRBooksWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: ReadingBook[]; totalCount: number }>
    getRBookCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<ReadingBook[]>

    // CRUD
    createAsync(data: CreateReadingBookData): Promise<number>
    getByIdAsync(id: number): Promise<ReadingBook | null>
    update(id: number, data: UpdateReadingBookData): Promise<number>
    deleteAsync(id: number): Promise<void>
}