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

    // CRUD
    createAsync(data: CreateWritingData): Promise<number>
    getByIdAsync(id: number): Promise<Writing | null>
    update(id: number, data: UpdateWritingData): Promise<number>
    delete(id: number): void
}