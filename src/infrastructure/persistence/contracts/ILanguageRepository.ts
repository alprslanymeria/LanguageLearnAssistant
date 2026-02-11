// IMPORTS
import { Language, Prisma } from "@prisma/client"

export interface ILanguageRepository {

    // CRUD
    createAsync(data: Prisma.LanguageCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<Language | null>
    updateAsync(id: number, data: Prisma.LanguageUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getLanguagesAsync(): Promise<Language[]>
    existsByNameAsync(name: string): Promise<Language | null>
    getByNameAsync(name: string): Promise<Language | null>
    getAllAsync(): Promise<Language[]>
}