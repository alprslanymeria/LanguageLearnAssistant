// IMPORTS
import { Writing } from "@/src/generated/prisma/client"

export interface CreateWritingData {

    userId: string
    languageId: number
    practiceId: number
}

export interface UpdateWritingData {

    userId?: string
    languageId?: number
    practiceId?: number
}

export interface IWritingRepository {

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Writing | null>

    // CRUD
    createAsync(data: CreateWritingData): Promise<number>
    getByIdAsync(id: number): Promise<Writing | null>
    update(id: number, data: UpdateWritingData): Promise<number>
    deleteAsync(id: number): Promise<void>
}