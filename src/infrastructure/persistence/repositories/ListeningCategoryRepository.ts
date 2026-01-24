// IMPORTS
import { injectable } from "inversify"
import { ListeningCategory } from "@/src/generated/prisma/client"
import { IListeningCategoryRepository, CreateListeningCategoryData, UpdateListeningCategoryData } from "@/src/infrastructure/persistence/contracts/IListeningCategoryRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ListeningCategoryRepository implements IListeningCategoryRepository {

    async createAsync(data: CreateListeningCategoryData): Promise<number> {
    
        const created = await prisma.listeningCategory.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<ListeningCategory | null> {

        const listeningCategory = await prisma.listeningCategory.findUnique({
            where: {
                id: id
            }
        })

        return listeningCategory
    }

    async update(id: number, data: UpdateListeningCategoryData): Promise<number> {

        const updatedListeningCategory = await prisma.listeningCategory.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedListeningCategory.id
    }

    delete(id: number): void {

        prisma.listeningCategory.delete({
            where: {
                id: id
            }
        })
    }
}