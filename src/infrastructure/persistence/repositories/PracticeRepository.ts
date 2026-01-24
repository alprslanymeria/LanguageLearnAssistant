// IMPORTS
import { injectable } from "inversify"
import { Practice } from "@/src/generated/prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IPracticeRepository, CreatePracticeData, UpdatePracticeData } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"

@injectable()
export class PracticeRepository implements IPracticeRepository {

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

     async createAsync(data: CreatePracticeData): Promise<number> {
    
        const created = await prisma.practice.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<Practice | null> {

        const practice = await prisma.practice.findUnique({
            where: {
                id: id
            }
        })

        return practice
    }

    async update(id: number, data: UpdatePracticeData): Promise<number> {

        const updatedPractice = await prisma.practice.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedPractice.id
    }

    delete(id: number): void {

        prisma.practice.delete({
            where: {
                id: id
            }
        })
    }

}