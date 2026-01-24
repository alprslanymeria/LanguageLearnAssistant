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

    // CRUD
    createAsync(data: CreateListeningData): Promise<number>
    getByIdAsync(id: number): Promise<Listening | null>
    update(id: number, data: UpdateListeningData): Promise<number>
    delete(id: number): void
}