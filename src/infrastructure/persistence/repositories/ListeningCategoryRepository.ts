// IMPORTS
import { injectable } from "inversify"
import { ListeningCategory, Prisma } from "@prisma/client"
import { IListeningCategoryRepository } from "@/src/infrastructure/persistence/contracts/IListeningCategoryRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"

@injectable()
export class ListeningCategoryRepository implements IListeningCategoryRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ListeningCategoryCreateInput): Promise<void> {
    
        await prisma.listeningCategory.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<ListeningCategory | null> {

        const listeningCategory = await prisma.listeningCategory.findUnique({
            where: {
                id: id
            }
        })

        return listeningCategory
    }

    async updateAsync(id: number, data: Prisma.ListeningCategoryUpdateInput): Promise<void> {

        await prisma.listeningCategory.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.listeningCategory.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getLCategoryCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<ListeningCategoryWithDeckVideos[]> {
            
        return await prisma.listeningCategory.findMany({
            where: {
                listening: {
                    userId,
                    languageId,
                    practiceId
                },
                deckVideos: { some: {} }
            },
            select: {
                id: true,
                name: true,
                listeningId: true,
                deckVideos: true,
            }
        })
    }

    async getByIdWithDeckVideosAsync(id: number): Promise<ListeningCategoryWithDeckVideos | null> {

        const listeningCategory = await prisma.listeningCategory.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                listeningId: true,
                deckVideos: true,
            }
        })

        return listeningCategory
    }
}