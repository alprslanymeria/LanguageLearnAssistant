// IMPORTS
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"
import { ListeningCategory, Prisma } from "@prisma/client"

export interface IListeningCategoryRepository {

    // CRUD
    createAsync(data: Prisma.ListeningCategoryCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<ListeningCategory | null>
    updateAsync(id: number, data: Prisma.ListeningCategoryUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getLCategoryCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<ListeningCategoryWithDeckVideos[]>
    getByIdWithDeckVideosAsync(id: number): Promise<ListeningCategoryWithDeckVideos | null>
}