// IMPORTS
import { injectable } from "inversify"
import { Language } from "@/src/generated/prisma/client"
import { ILanguageRepository, CreateLanguageData, UpdateLanguageData } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class LanguageRepository implements ILanguageRepository {

    async getLanguagesAsync(): Promise<Language[]> {
        
        return await prisma.language.findMany()
    }

    async existsByNameAsync(name: string): Promise<Language | null> {
        
        return await prisma.language.findFirst({
            where: { name }
        })
    }

    async getByNameAsync(name: string): Promise<Language | null> {

        const language = await prisma.language.findFirst({
            where: {
                name: name
            }
        })

        return language
    }

    async getAll(): Promise<Language[]> {
        
        return await prisma.language.findMany()
    }

    async createAsync(data: CreateLanguageData): Promise<number> {

        const created = await prisma.language.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<Language | null> {

        const language = await prisma.language.findUnique({
            where: {
                id: id
            }
        })

        return language
    }

    async update(id: number, data: UpdateLanguageData): Promise<number> {

        const updatedLanguage = await prisma.language.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedLanguage.id
    }

    delete(id: number): void {

        prisma.language.delete({
            where: {
                id: id
            }
        })
    }
}