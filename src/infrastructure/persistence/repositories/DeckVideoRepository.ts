// IMPORTS
import { injectable } from "inversify"
import { CreateDeckVideoData, IDeckVideoRepository, UpdateDeckVideoData } from "../contracts/IDeckVideoRepository"
import { DeckVideo } from "@/src/generated/prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class DeckVideoRepository implements IDeckVideoRepository {

    async createAsync(data: CreateDeckVideoData): Promise<number> {
        
        const createdDeckVideo = await prisma.deckVideo.create({
            data: data
        })

        return createdDeckVideo.id
    }


    async getByIdAsync(id: number): Promise<DeckVideo | null> {
        
        const deckVideo =  await prisma.deckVideo.findUnique({
            where: { id }
        })

        return deckVideo
    }


    async update(id: number, data: UpdateDeckVideoData): Promise<number> {
        
        const updatedDeckVideo = await prisma.deckVideo.update({
            where: { id },
            data: data
        })

        return updatedDeckVideo.id
    }


    async deleteAsync(id: number): Promise<void> {
        
        await prisma.deckVideo.delete({
            where: { id }
        })
    }
}