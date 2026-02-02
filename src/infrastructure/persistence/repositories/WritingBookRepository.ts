// IMPORTS
import { injectable } from "inversify"
import { WritingBook } from "@/src/generated/prisma/client"
import { IWritingBookRepository, CreateWritingBookData, UpdateWritingBookData, WritingBookWithLanguage } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"

@injectable()
export class WritingBookRepository implements IWritingBookRepository {

    async getWritingBookItemByIdAsync(id: number): Promise<WritingBookWithLanguage | null> {
        
        return await prisma.writingBook.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                leftColor: true,
                sourceUrl: true,
                writingId: true,
                writing: {
                    select: {
                        language: true
                    }
                }
            }
        })
    }

    async getAllWBooksWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: WritingBook[]; totalCount: number }> {
        
        const whereClause = {
            writing: {
                userId: userId
            }
        }

        const totalCount = await prisma.writingBook.count({
            where: whereClause
        })

        const items = await prisma.writingBook.findMany({
            where: whereClause,
            orderBy: { id: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return { items, totalCount }
    }

    async getWBookCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<WritingBook[]> {
        
        return await prisma.writingBook.findMany({
            where: {
                writing: {
                    userId,
                    languageId,
                    practiceId
                }
            }
        })
    }

    async createAsync(data: CreateWritingBookData): Promise<number> {
    
        const created = await prisma.writingBook.create({
            data: data
        })

        return created.id
    }

    async getByIdAsync(id: number): Promise<WritingBook | null> {

        const writingBook = await prisma.writingBook.findUnique({
            where: {
                id: id
            }
        })

        return writingBook
    }

    async update(id: number, data: UpdateWritingBookData): Promise<number> {

        const updatedWritingBook = await prisma.writingBook.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedWritingBook.id
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.writingBook.delete({
            where: {
                id: id
            }
        })
    }
}