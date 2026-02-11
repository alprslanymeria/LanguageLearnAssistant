// IMPORTS
import { Listening, Prisma } from "@prisma/client"

export interface IListeningRepository {

    // CRUD
    createAsync(data: Prisma.ListeningCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<Listening | null>
    updateAsync(id: number, data: Prisma.ListeningUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Listening | null>
}