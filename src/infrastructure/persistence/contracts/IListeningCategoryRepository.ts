// IMPORTS
import { ListeningCategory } from "@/src/generated/prisma/client"

export interface CreateListeningCategoryData {

    name: string
    listeningId: number
}

export interface UpdateListeningCategoryData {

    name?: string
    listeningId?: number
}

export interface IListeningCategoryRepository {

    // CRUD
    createAsync(data: CreateListeningCategoryData): Promise<number>
    getByIdAsync(id: number): Promise<ListeningCategory | null>
    update(id: number, data: UpdateListeningCategoryData): Promise<number>
    delete(id: number): void
}