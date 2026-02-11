// IMPORTS
import { DeckWordWithLanguageId } from "@/src/actions/DeckWord/Response"
import { DeckWord, Prisma } from "@prisma/client"


export interface IDeckWordRepository {

    // CRUD
    createAsync(data: Prisma.DeckWordCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<DeckWord | null>
    updateAsync(id: number,data: Prisma.DeckWordUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getDeckWordItemByIdAsync(id: number): Promise<DeckWordWithLanguageId | null>
    getAllDWordsWithPagingAsync(userId: string, page: number, pageSize: number ): Promise<{items: DeckWord[], totalCount: number}>
}