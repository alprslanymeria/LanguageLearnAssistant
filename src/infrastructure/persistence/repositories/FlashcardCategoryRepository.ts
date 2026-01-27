// IMPORTS
import { injectable } from "inversify"
import { FlashcardCategory } from "@/src/generated/prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { CreateFlashcardCategoryData, FlashcardCategoryWithLanguage, IFlashcardCategoryRepository, UpdateFlashcardCategoryData } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"

@injectable()
export class FlashcardCategoryRepository implements IFlashcardCategoryRepository {
    

    async getFlashcardCategoryItemByIdAsync(id: number): Promise<FlashcardCategoryWithLanguage | null> {


        return await prisma.flashcardCategory.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                flashcardId: true,
                flashcard: {
                    select: {
                        language: true
                    }
                }
            }
        })
    }

    async getAllFCategoriesAsync(userId: string): Promise<{ items: FlashcardCategory[]; totalCount: number }> {
        
        const whereClause = {
            flashcard: {
                userId: userId
            }
        }

        const totalCount = await prisma.flashcardCategory.count({
            where: whereClause
        })

        const items = await prisma.flashcardCategory.findMany({
            where: whereClause,
            orderBy: { id: 'desc' }
        })

        return { items, totalCount }
    }

    async getAllFCategoriesWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: FlashcardCategory[]; totalCount: number }> {
        
        const whereClause = {
            flashcard: {
                userId: userId
            }
        }

        const totalCount = await prisma.flashcardCategory.count({
            where: whereClause
        })

        const items = await prisma.flashcardCategory.findMany({
            where: whereClause,
            orderBy: { id: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async getFCategoryCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<FlashcardCategoryWithDeckWords[]> {
        
        return await prisma.flashcardCategory.findMany({
            
            where: {
                flashcard: {
                    userId,
                    languageId,
                    practiceId
                }
            },
            select: {
                id: true,
                name: true,
                flashcardId: true,
                deckWords: true
            }
        })
    }

    async getByIdWithDeckWordsAsync(id: number): Promise<FlashcardCategoryWithDeckWords | null> {

        const flashcardCategory = await prisma.flashcardCategory.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                flashcardId: true,
                deckWords: true
            }
        })

        return flashcardCategory
    }

     async createAsync(data: CreateFlashcardCategoryData): Promise<number> {
    
        const created = await prisma.flashcardCategory.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<FlashcardCategory | null> {

        const flashcardCategory = await prisma.flashcardCategory.findUnique({
            where: {
                id: id
            }
        })

        return flashcardCategory
    }

    async update(id: number, data: UpdateFlashcardCategoryData): Promise<number> {

        const updatedFlashcardCategory = await prisma.flashcardCategory.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedFlashcardCategory.id
    }

    delete(id: number): void {

        prisma.flashcardCategory.delete({
            where: {
                id: id
            }
        })
    }

}