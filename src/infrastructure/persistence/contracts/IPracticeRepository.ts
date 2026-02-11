// IMPORTS
import { Practice, Prisma } from "@prisma/client"

export interface IPracticeRepository {

    // CRUD
    createAsync(data: Prisma.PracticeCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<Practice | null>
    updateAsync(id: number, data: Prisma.PracticeUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getPracticesByLanguageAsync(language: string): Promise<Practice[]>
    getPracticeByLanguageIdAndNameAsync(languageId: number, name: string): Promise<Practice | null>
    existsByLanguageIdAsync(languageId: number): Promise<Practice | null>
    existsByNameAndLanguageIdAsync(name: string, languageId: number): Promise<Practice | null>
}