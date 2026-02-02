// IMPORTS
import { injectable } from "inversify"
import { ListeningCategory } from "@/src/generated/prisma/client"
import { IListeningCategoryRepository, CreateListeningCategoryData, UpdateListeningCategoryData } from "@/src/infrastructure/persistence/contracts/IListeningCategoryRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"

@injectable()
export class ListeningCategoryRepository implements IListeningCategoryRepository {

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

    async deleteAsync(id: number): Promise<void> {

        await prisma.listeningCategory.delete({
            where: {
                id: id
            }
        })
    }
}