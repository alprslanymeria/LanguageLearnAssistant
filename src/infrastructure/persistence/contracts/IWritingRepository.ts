// IMPORTS
import { Prisma, Writing } from "@prisma/client"

export interface IWritingRepository {

    // CRUD
    createAsync(data: Prisma.WritingCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<Writing | null>
    updateAsync(id: number, data: Prisma.WritingUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Writing | null>
}