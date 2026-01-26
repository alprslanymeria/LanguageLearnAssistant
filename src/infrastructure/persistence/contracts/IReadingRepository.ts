// IMPORTS
import { Reading } from "@/src/generated/prisma/client"

export interface CreateReadingData {

    userId: string
    languageId: number
    practiceId: number
}

export interface UpdateReadingData {

    userId?: string
    languageId?: number
    practiceId?: number
}

export interface IReadingRepository {

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Reading | null>

    // CRUD
    createAsync(data: CreateReadingData): Promise<number>
    getByIdAsync(id: number): Promise<Reading | null>
    update(id: number, data: UpdateReadingData): Promise<number>
    delete(id: number): void
}