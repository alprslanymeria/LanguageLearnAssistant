// IMPORTS
import { injectable } from "inversify"
import { Flashcard, Prisma } from "@prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IFlashcardRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardRepository"

@injectable()
export class FlashcardRepository implements IFlashcardRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.FlashcardCreateInput): Promise<void> {
    
        await prisma.flashcard.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<Flashcard | null> {

        const flashcard = await prisma.flashcard.findUnique({
            where: {
                id: id
            }
        })

        return flashcard
    }

    async updateAsync(id: number, data: Prisma.FlashcardUpdateInput): Promise<void> {

        await prisma.flashcard.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.flashcard.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Flashcard | null> {
        
        const flashcard = await prisma.flashcard.findFirst({
            where: {
                practiceId: practiceId,
                userId: userId,
                languageId: languageId
            }
        })

        return flashcard
    }
}