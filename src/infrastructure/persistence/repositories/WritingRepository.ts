// IMPORTS
import { injectable } from "inversify"
import { Prisma, Writing } from "@prisma/client"
import { IWritingRepository } from "@/src/infrastructure/persistence/contracts/IWritingRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class WritingRepository implements IWritingRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.WritingCreateInput): Promise<void> {
    
        await prisma.writing.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<Writing | null> {

        const writing = await prisma.writing.findUnique({
            where: {
                id: id
            }
        })

        return writing
    }

    async updateAsync(id: number, data: Prisma.WritingUpdateInput): Promise<void> {

        await prisma.writing.update({

            where: {
                id: id
            },
            data: data
        })

        return 
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.writing.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getByPracticeIdUserIdLanguageIdAsync(practiceId: number, userId: string, languageId: number): Promise<Writing | null> {
        
        const writing = await prisma.writing.findFirst({
            where: {
                practiceId: practiceId,
                userId: userId,
                languageId: languageId
            }
        })

        return writing
    }
}