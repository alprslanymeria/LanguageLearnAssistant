// IMPORTS
import { injectable } from "inversify"
import { IDeckVideoRepository } from "@/src/infrastructure/persistence/contracts/IDeckVideoRepository"
import { DeckVideo, Prisma } from "@prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class DeckVideoRepository implements IDeckVideoRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.DeckVideoCreateInput): Promise<void> {
        
        await prisma.deckVideo.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<DeckVideo | null> {
        
        const deckVideo =  await prisma.deckVideo.findUnique({
            where: { id }
        })

        return deckVideo
    }

    async updateAsync(id: number, data: Prisma.DeckVideoUpdateInput): Promise<void> {
        
        await prisma.deckVideo.update({
            where: { id },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {
        
        await prisma.deckVideo.delete({
            where: { id }
        })

        return
    }
}