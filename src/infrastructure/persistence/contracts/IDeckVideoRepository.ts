// IMPORTS
import { DeckVideo } from "@/src/generated/prisma/client"

export interface CreateDeckVideoData {

    categoryId: number
    correct: string
    sourceUrl: string
}

export interface UpdateDeckVideoData {

    categoryId?: number
    correct?: string
    sourceUrl?: string
}

export interface IDeckVideoRepository {

    // CRUD
    createAsync(data: CreateDeckVideoData): Promise<number>
    getByIdAsync(id: number): Promise<DeckVideo | null>
    update(id: number,data: UpdateDeckVideoData): Promise<number>
    deleteAsync(id: number): Promise<void>
}