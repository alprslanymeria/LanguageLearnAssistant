// IMPORTS
import { injectable } from "inversify"
import { Prisma, Reading } from "@prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IReadingRepository } from "@/src/infrastructure/persistence/contracts/IReadingRepository"

@injectable()
export class ReadingRepository implements IReadingRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ReadingCreateInput): Promise<void> {
    
        await prisma.reading.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<Reading | null> {

        const reading = await prisma.reading.findUnique({
            where: {
                id: id
            }
        })

        return reading
    }

    async updateAsync(id: number, data: Prisma.ReadingUpdateInput): Promise<void> {

        await prisma.reading.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.reading.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Reading | null> {
        
        const reading = await prisma.reading.findFirst({
            where: {
                practiceId: practiceId,
                userId: userId,
                languageId: languageId
            }
        })

        return reading
    }
}