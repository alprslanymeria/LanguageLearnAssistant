// IMPORTS
import { injectable } from "inversify"
import { DeckWord } from "@/src/generated/prisma/client"
import { CreateDeckWordData, DeckWordWithLanguage, IDeckWordRepository, UpdateDeckWordData } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class DeckWordRepository implements IDeckWordRepository {

    
    async getDeckWordItemByIdAsync(id: number): Promise<DeckWordWithLanguage | null> {

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

        return deckWord
    }

    async getAllDWordsWithPagingAsync(categoryId: number, page: number, pageSize: number): Promise<{ items: DeckWord[]; totalCount: number }> {

        const whereClause = { categoryId: categoryId };

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

     async createAsync(data: CreateDeckWordData): Promise<number> {
    
        const createdDeckWord = await prisma.deckWord.create({
            data: data
        })

        return createdDeckWord.id
    }

    async getByIdAsync(id: number): Promise<DeckWord | null> {

        const deckWord = await prisma.deckWord.findUnique({
            where: {
                id: id
            }
        })

        return deckWord
    }

    async update(id: number, data: UpdateDeckWordData): Promise<number> {

        const updatedDeckWord = await prisma.deckWord.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedDeckWord.id
    }

    delete(id: number): void {

        prisma.deckWord.delete({
            where: {
                id: id
            }
        })
    }

}