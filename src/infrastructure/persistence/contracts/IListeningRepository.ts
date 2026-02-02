// IMPORTS
import { Listening } from "@/src/generated/prisma/client"

export interface CreateListeningData {

    userId: string
    languageId: number
    practiceId: number
}

export interface UpdateListeningData {

    userId?: string
    languageId?: number
    practiceId?: number
}

export interface IListeningRepository {

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Listening | null>

    // CRUD
    createAsync(data: CreateListeningData): Promise<number>
    getByIdAsync(id: number): Promise<Listening | null>
    update(id: number, data: UpdateListeningData): Promise<number>
    deleteAsync(id: number): Promise<void>
}