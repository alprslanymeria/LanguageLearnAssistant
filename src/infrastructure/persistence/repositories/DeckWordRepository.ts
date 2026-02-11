// IMPORTS
import { injectable } from "inversify"
import { DeckWord, Prisma } from "@prisma/client"
import { IDeckWordRepository } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { DeckWordWithLanguageId } from "@/src/actions/DeckWord/Response"

@injectable()
export class DeckWordRepository implements IDeckWordRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.DeckWordCreateInput): Promise<void> {
    
        await prisma.deckWord.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<DeckWord | null> {

        const deckWord = await prisma.deckWord.findUnique({
            where: {
                id: id
            }
        })

        return deckWord
    }

    async updateAsync(id: number, data: Prisma.DeckWordUpdateInput): Promise<void> {

        await prisma.deckWord.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.deckWord.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS
    
    async getDeckWordItemByIdAsync(id: number): Promise<DeckWordWithLanguageId | null> {

        const deckWord = await prisma.deckWord.findUnique({
            where: { id },
            select: {
                id: true,
                question: true,
                answer: true,
                categoryId: true,
                category: {
                    select: {
                        flashcard: {
                            select: {
                                language: true
                            }
                        }
                    }
                }
            }
        })

        if (!deckWord) return null

        const result: DeckWordWithLanguageId = {

            id: deckWord!.id,
            categoryId: deckWord.categoryId,
            question: deckWord.question,
            answer: deckWord.answer,
            languageId: deckWord.category.flashcard.language.id
        }

        return result
    }

    async getAllDWordsWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: DeckWord[]; totalCount: number }> {

        const whereClause = {
                category: {
                    flashcard: {
                        userId: userId
                    }
                }
            };

        const totalCount = await prisma.deckWord.count({

            where: whereClause
        })

        const items = await prisma.deckWord.findMany({

            where: whereClause,
            orderBy: { id: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }
}