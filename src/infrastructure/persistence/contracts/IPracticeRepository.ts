// IMPORTS
import { Practice } from "@/src/generated/prisma/client"

export interface CreatePracticeData {

    name: string
    languageId: number
}

export interface UpdatePracticeData {

    name?: string
    languageId: number
}

export interface IPracticeRepository {

    // HELPER
    getPracticesByLanguageAsync(language: string): Promise<Practice[]>
    existsByLanguageIdAsync(languageId: number): Promise<Practice | null>
    existsByNameAndLanguageIdAsync(name: string, languageId: number): Promise<Practice | null>

    // CRUD
    createAsync(data: CreatePracticeData): Promise<number>
    getByIdAsync(id: number): Promise<Practice | null>
    update(id: number, data: UpdatePracticeData): Promise<number>
    delete(id: number): void
}