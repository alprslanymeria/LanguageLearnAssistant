// IMPORTS
import { Language } from "@/src/generated/prisma/client"

export interface CreateLanguageData {

    name: string
    imageUrl: string | null
}

export interface UpdateLanguageData {

    name?: string
    imageUrl?: string | null
}

export interface ILanguageRepository {

    // HELPER
    getLanguagesAsync(): Promise<Language[]>
    existsByNameAsync(name: string): Promise<Language | null>
    getByNameAsync(name: string): Promise<Language | null>
    
    // CRUD
    getAll(): Promise<Language[]>
    createAsync(data: CreateLanguageData): Promise<number>
    getByIdAsync(id: number): Promise<Language | null>
    update(id: number, data: UpdateLanguageData): Promise<number>
    delete(id: number): void
}