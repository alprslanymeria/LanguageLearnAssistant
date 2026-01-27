// IMPORTS
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"
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

    // HELPER
    getLCategoryCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<ListeningCategoryWithDeckVideos[]>
    getByIdWithDeckVideosAsync(id: number): Promise<ListeningCategoryWithDeckVideos | null>

    // CRUD
    createAsync(data: CreateListeningCategoryData): Promise<number>
    getByIdAsync(id: number): Promise<ListeningCategory | null>
    update(id: number, data: UpdateListeningCategoryData): Promise<number>
    delete(id: number): void
}