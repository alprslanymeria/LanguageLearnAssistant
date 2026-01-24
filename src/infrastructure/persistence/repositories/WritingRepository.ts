// IMPORTS
import { injectable } from "inversify"
import { Writing } from "@/src/generated/prisma/client"
import { IWritingRepository, CreateWritingData, UpdateWritingData } from "@/src/infrastructure/persistence/contracts/IWritingRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class WritingRepository implements IWritingRepository {

    async createAsync(data: CreateWritingData): Promise<number> {
    
        const created = await prisma.writing.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<Writing | null> {

        const writing = await prisma.writing.findUnique({
            where: {
                id: id
            }
        })

        return writing
    }

    async update(id: number, data: UpdateWritingData): Promise<number> {

        const updatedWriting = await prisma.writing.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedWriting.id
    }

    delete(id: number): void {

        prisma.writing.delete({
            where: {
                id: id
            }
        })
    }
}