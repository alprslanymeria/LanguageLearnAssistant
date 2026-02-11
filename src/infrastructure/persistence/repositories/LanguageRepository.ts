// IMPORTS
import { injectable } from "inversify"
import { Language, Prisma } from "@prisma/client"
import { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class LanguageRepository implements ILanguageRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.LanguageCreateInput): Promise<void> {

        await prisma.language.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<Language | null> {

        const language = await prisma.language.findUnique({
            where: {
                id: id
            }
        })

        return language
    }

    async updateAsync(id: number, data: Prisma.LanguageUpdateInput): Promise<void> {

        await prisma.language.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.language.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

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

    async getAllAsync(): Promise<Language[]> {
        
        return await prisma.language.findMany()
    }
}