// IMPORTS
import { FlashcardCategoryWithDeckWords, FlashcardCategoryWithLanguageId } from "@/src/actions/FlashcardCategory/Response"
import { FlashcardCategory, Prisma } from "@prisma/client"


export interface IFlashcardCategoryRepository {

    // CRUD
    createAsync(data: Prisma.FlashcardCategoryCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<FlashcardCategory | null>
    updateAsync(id: number, data: Prisma.FlashcardCategoryUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getFlashcardCategoryItemByIdAsync(id: number): Promise<FlashcardCategoryWithLanguageId | null>
    getAllFCategoriesWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: FlashcardCategory[], totalCount: number}>
    getAllFCategoriesAsync(userId: string): Promise<{ items: FlashcardCategoryWithLanguageId[], totalCount: number}>
    getFCategoryCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<FlashcardCategoryWithDeckWords[]>
    getByIdWithDeckWordsAsync(id: number): Promise<FlashcardCategoryWithDeckWords | null>
}