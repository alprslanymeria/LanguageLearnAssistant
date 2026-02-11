// IMPORTS
import { injectable } from "inversify"
import { Prisma, ReadingBook } from "@prisma/client"
import { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { ReadingBookWithLanguageId } from "@/src/actions/ReadingBook/Response"

@injectable()
export class ReadingBookRepository implements IReadingBookRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.ReadingBookCreateInput): Promise<void> {
    
        await prisma.readingBook.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<ReadingBook | null> {

        const readingBook = await prisma.readingBook.findUnique({
            where: {
                id: id
            }
        })

        return readingBook
    }

    async updateAsync(id: number, data: Prisma.ReadingBookUpdateInput): Promise<void> {

        await prisma.readingBook.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.readingBook.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getReadingBookItemByIdAsync(id: number): Promise<ReadingBookWithLanguageId | null> {
        
        const readingBook = await prisma.readingBook.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                leftColor: true,
                sourceUrl: true,
                readingId: true,
                reading: {
                    select: {
                        language: true
                    }
                }
            }
        })

        if (!readingBook) return null

        const result : ReadingBookWithLanguageId = {

            id: readingBook.id,
            readingId: readingBook.readingId,
            name: readingBook.name,
            imageUrl: readingBook.imageUrl,
            leftColor: readingBook.leftColor,
            sourceUrl: readingBook.sourceUrl,
            languageId: readingBook.reading.language.id
        }

        return result
    }

    async getAllRBooksWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: ReadingBook[]; totalCount: number }> {
        
        const whereClause = {
            reading: {
                userId: userId
            }
        }

        const totalCount = await prisma.readingBook.count({
            where: whereClause
        })

        const items = await prisma.readingBook.findMany({
            where: whereClause,
            orderBy: { id: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async getRBookCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<ReadingBook[]> {
        
        return await prisma.readingBook.findMany({
            where: {
                reading: {
                    userId,
                    languageId,
                    practiceId
                }
            }
        })
    }
}