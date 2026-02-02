// IMPORTS
import { Language, WritingBook } from "@/src/generated/prisma/client"

export type WritingBookWithLanguage = {

    id: number
    name: string
    writingId: number
    imageUrl: string
    leftColor: string
    sourceUrl: string
    writing: {
        language: Language
    }
}

export interface CreateWritingBookData {

    name: string
    writingId: number
    imageUrl: string
    leftColor: string
    sourceUrl: string
}

export interface UpdateWritingBookData {

    name?: string
    writingId?: number
    imageUrl?: string
    leftColor?: string
    sourceUrl?: string
}

export interface IWritingBookRepository {

    // HELPER
    getWritingBookItemByIdAsync(id: number): Promise<WritingBookWithLanguage | null>
    getAllWBooksWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: WritingBook[]; totalCount: number }>
    getWBookCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<WritingBook[]>

    // CRUD
    createAsync(data: CreateWritingBookData): Promise<number>
    getByIdAsync(id: number): Promise<WritingBook | null>
    update(id: number, data: UpdateWritingBookData): Promise<number>
    deleteAsync(id: number): Promise<void>
}