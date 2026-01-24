// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"

export const GET_RBOOK_CREATE_ITEMS_QUERY = "GET_RBOOK_CREATE_ITEMS_QUERY"

export interface GetRBookCreateItemsQuery extends IQuery<ReadingBookDto[]>, ICacheableQuery {

    readonly type: typeof GET_RBOOK_CREATE_ITEMS_QUERY
    userId: string
    language: string
    practice: string
}