// IMPORTS
import { Flashcard, Prisma } from "@prisma/client"

export interface IFlashcardRepository {

    // CRUD
    createAsync(data: Prisma.FlashcardCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<Flashcard | null>
    updateAsync(id: number, data: Prisma.FlashcardUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Flashcard | null>
}