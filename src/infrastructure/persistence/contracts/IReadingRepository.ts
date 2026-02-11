// IMPORTS
import { Prisma, Reading } from "@prisma/client"

export interface IReadingRepository {

    // CRUD
    createAsync(data: Prisma.ReadingCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<Reading | null>
    updateAsync(id: number, data: Prisma.ReadingUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Reading | null>
}