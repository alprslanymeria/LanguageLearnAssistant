// IMPORTS
import { injectable } from "inversify"
import { Listening, Prisma } from "@prisma/client"
import { IListeningRepository } from "@/src/infrastructure/persistence/contracts/IListeningRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ListeningRepository implements IListeningRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ListeningCreateInput): Promise<void> {
    
        await prisma.listening.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<Listening | null> {

        const listening = await prisma.listening.findUnique({
            where: {
                id: id
            }
        })

        return listening
    }

    async updateAsync(id: number, data: Prisma.ListeningUpdateInput): Promise<void> {

        await prisma.listening.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.listening.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Listening | null> {
            
        const listening = await prisma.listening.findFirst({

            where: {
                practiceId: practiceId,
                userId: userId,
                languageId: languageId
            }
        })

        return listening
    }
}