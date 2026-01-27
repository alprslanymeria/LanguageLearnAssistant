// IMPORTS
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"

export const GET_LCATEGORY_CREATE_ITEMS_QUERY = "GET_LCATEGORY_CREATE_ITEMS_QUERY"

export interface GetLCategoryCreateItemsQuery extends IQuery<ListeningCategoryWithDeckVideos[]>, ICacheableQuery {

    readonly type: typeof GET_LCATEGORY_CREATE_ITEMS_QUERY
    userId: string
    language: string
    practice: string
}