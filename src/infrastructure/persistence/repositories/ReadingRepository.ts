// IMPORTS
import { injectable } from "inversify"
import { Reading } from "@/src/generated/prisma/client"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IReadingRepository, CreateReadingData, UpdateReadingData } from "@/src/infrastructure/persistence/contracts/IReadingRepository"

@injectable()
export class ReadingRepository implements IReadingRepository {

    async createAsync(data: CreateReadingData): Promise<number> {
    
        const created = await prisma.reading.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<Reading | null> {

        const reading = await prisma.reading.findUnique({
            where: {
                id: id
            }
        })

        return reading
    }

    async update(id: number, data: UpdateReadingData): Promise<number> {

        const updatedReading = await prisma.reading.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedReading.id
    }

    delete(id: number): void {

        prisma.reading.delete({
            where: {
                id: id
            }
        })
    }
}