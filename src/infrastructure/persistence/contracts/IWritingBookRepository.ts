// IMPORTS
import { WritingBookWithLanguageId } from "@/src/actions/WritingBook/Response"
import { Prisma, WritingBook } from "@prisma/client"


export interface IWritingBookRepository {

    // CRUD
    createAsync(data: Prisma.WritingBookCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<WritingBook | null>
    updateAsync(id: number, data: Prisma.WritingBookUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>

    // HELPER
    getWritingBookItemByIdAsync(id: number): Promise<WritingBookWithLanguageId | null>
    getAllWBooksWithPagingAsync(userId: string, page: number, pageSize: number): Promise<{ items: WritingBook[]; totalCount: number }>
    getWBookCreateItemsAsync(userId: string, languageId: number, practiceId: number): Promise<WritingBook[]>
}