// IMPORTS
import { injectable } from "inversify"
import { Prisma, WritingBook } from "@prisma/client"
import { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { WritingBookWithLanguageId } from "@/src/actions/WritingBook/Response"

@injectable()
export class WritingBookRepository implements IWritingBookRepository {

    // CRUD OPERATIONS

    async createAsync(data: Prisma.WritingBookCreateInput): Promise<void> {
    
        await prisma.writingBook.create({
            data: data
        })

        return
    }

    async getByIdAsync(id: number): Promise<WritingBook | null> {

        const writingBook = await prisma.writingBook.findUnique({
            where: {
                id: id
            }
        })

        return writingBook
    }

    async updateAsync(id: number, data: Prisma.WritingBookUpdateInput): Promise<void> {

        await prisma.writingBook.update({

            where: {
                id: id
            },
            data: data
        })

        return
    }

    async deleteAsync(id: number): Promise<void> {

        await prisma.writingBook.delete({
            where: {
                id: id
            }
        })

        return
    }

    // HELPER OPERATIONS

    async getWritingBookItemByIdAsync(id: number): Promise<WritingBookWithLanguageId | null> {
        
        const writingBook = await prisma.writingBook.findUnique({
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

        if (!writingBook) return null

        const result : WritingBookWithLanguageId = {

            id: writingBook.id,
            writingId: writingBook.writingId,
            name: writingBook.name,
            imageUrl: writingBook.imageUrl,
            leftColor: writingBook.leftColor,
            sourceUrl: writingBook.sourceUrl,
            languageId: writingBook.writing.language.id
        }

        return result
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
}