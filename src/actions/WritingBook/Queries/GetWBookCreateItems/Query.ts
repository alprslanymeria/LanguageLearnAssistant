// IMPORTS
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"

export const GET_WBOOK_CREATE_ITEMS_QUERY = "GET_WBOOK_CREATE_ITEMS_QUERY"

export interface GetWBookCreateItemsQuery extends IQuery<WritingBookDto[]>, ICacheableQuery {

    readonly type: typeof GET_WBOOK_CREATE_ITEMS_QUERY
    userId: string
    language: string
    practice: string
}