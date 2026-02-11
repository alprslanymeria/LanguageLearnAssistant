// IMPORTS
import { ReadingBookWithLanguageId } from "@/src/actions/ReadingBook/Response"
import { Prisma, ReadingBook } from "@prisma/client"


export interface IReadingBookRepository {

    // CRUD
    createAsync(data: Prisma.ReadingBookCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<ReadingBook | null>
    updateAsync(id: number, data: Prisma.ReadingBookUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getReadingBookItemByIdAsync(id: number): Promise<ReadingBookWithLanguageId | null>
    getAllRBooksWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: ReadingBook[]; totalCount: number }>
    getRBookCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<ReadingBook[]>
}