// IMPORTS
import { injectable } from "inversify"
import { Practice, Prisma } from "@prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"

@injectable()
export class PracticeRepository implements IPracticeRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.PracticeCreateInput): Promise<void> {
    
        await prisma.practice.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<Practice | null> {

        const practice = await prisma.practice.findUnique({
            where: {
                id: id
            }
        })

        return practice
    }

    async updateAsync(id: number, data: Prisma.PracticeUpdateInput): Promise<void> {

        await prisma.practice.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.practice.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getPracticeByLanguageIdAndNameAsync(languageId: number, name: string): Promise<Practice | null> {
        
        return await prisma.practice.findFirst({
            where: {
                languageId,
                name
            }
        })
    }

    async getPracticesByLanguageAsync(language: string): Promise<Practice[]> {
        
        return await prisma.practice.findMany({
            where: {
                language: {
                    name: language
                }
            }
        })
    }

    async existsByLanguageIdAsync(languageId: number): Promise<Practice | null> {
        
        return await prisma.practice.findFirst({
            where: { languageId }
        })
    }

    async existsByNameAndLanguageIdAsync(name: string, languageId: number): Promise<Practice | null> {
        
        return await prisma.practice.findFirst({
            where: {
                name,
                languageId
            }
        })
    }

}