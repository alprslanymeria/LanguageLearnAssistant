// IMPORTS
import { injectable } from "inversify"
import { Flashcard } from "@/src/generated/prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IFlashcardRepository, CreateFlashcardData, UpdateFlashcardData } from "@/src/infrastructure/persistence/contracts/IFlashcardRepository"

@injectable()
export class FlashcardRepository implements IFlashcardRepository {

    async createAsync(data: CreateFlashcardData): Promise<number> {
    
        const created = await prisma.flashcard.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<Flashcard | null> {

        const flashcard = await prisma.flashcard.findUnique({
            where: {
                id: id
            }
        })

        return flashcard
    }

    async update(id: number, data: UpdateFlashcardData): Promise<number> {

        const updatedFlashcard = await prisma.flashcard.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedFlashcard.id
    }

    delete(id: number): void {

        prisma.flashcard.delete({
            where: {
                id: id
            }
        })
    }

}