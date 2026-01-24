// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { FlashcardCategoryDto } from "@/src/actions/FlashcardCategory/Response"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"

export const GET_FCATEGORY_CREATE_ITEMS_QUERY = "GET_FCATEGORY_CREATE_ITEMS_QUERY"

export interface GetFCategoryCreateItemsQuery extends IQuery<FlashcardCategoryDto[]>, ICacheableQuery {

    readonly type: typeof GET_FCATEGORY_CREATE_ITEMS_QUERY
    userId: string
    language: string
    practice: string
}