// IMPORTS
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ReadingBookWithLanguageId } from "@/src/actions/ReadingBook/Response"

export const GET_READING_BOOK_BY_ID_QUERY = "GET_READING_BOOK_BY_ID_QUERY"

export interface GetReadingBookByIdQuery extends IQuery<ReadingBookWithLanguageId>, ICacheableQuery {

    readonly type: typeof GET_READING_BOOK_BY_ID_QUERY
    id: number
}