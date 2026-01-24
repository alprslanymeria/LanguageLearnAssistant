// IMPORTS
import { injectable } from "inversify"
import { Listening } from "@/src/generated/prisma/client"
import { IListeningRepository, CreateListeningData, UpdateListeningData } from "@/src/infrastructure/persistence/contracts/IListeningRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ListeningRepository implements IListeningRepository {

    async createAsync(data: CreateListeningData): Promise<number> {
    
        const created = await prisma.listening.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<Listening | null> {

        const listening = await prisma.listening.findUnique({
            where: {
                id: id
            }
        })

        return listening
    }

    async update(id: number, data: UpdateListeningData): Promise<number> {

        const updatedListening = await prisma.listening.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedListening.id
    }

    delete(id: number): void {

        prisma.listening.delete({
            where: {
                id: id
            }
        })
    }
}