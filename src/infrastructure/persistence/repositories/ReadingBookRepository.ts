// IMPORTS
import { injectable } from "inversify"
import { ReadingBook } from "@/src/generated/prisma/client"
import { IReadingBookRepository, CreateReadingBookData, UpdateReadingBookData, ReadingBookWithLanguage } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class ReadingBookRepository implements IReadingBookRepository {

    async getReadingBookItemByIdAsync(id: number): Promise<ReadingBookWithLanguage | null> {
        
        return await prisma.readingBook.findUnique({
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

    async createAsync(data: CreateReadingBookData): Promise<number> {
    
        const created = await prisma.readingBook.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<ReadingBook | null> {

        const readingBook = await prisma.readingBook.findUnique({
            where: {
                id: id
            }
        })

        return readingBook
    }

    async update(id: number, data: UpdateReadingBookData): Promise<number> {

        const updatedReadingBook = await prisma.readingBook.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedReadingBook.id
    }

    delete(id: number): void {

        prisma.readingBook.delete({
            where: {
                id: id
            }
        })
    }

}