// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { WritingBookWithLanguageId } from "@/src/actions/WritingBook/Response"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"

export const GET_WRITING_BOOK_BY_ID_QUERY = "GET_WRITING_BOOK_BY_ID_QUERY"

export interface GetWritingBookByIdQuery extends IQuery<WritingBookWithLanguageId>, ICacheableQuery {

    readonly type: typeof GET_WRITING_BOOK_BY_ID_QUERY
    id: number
}