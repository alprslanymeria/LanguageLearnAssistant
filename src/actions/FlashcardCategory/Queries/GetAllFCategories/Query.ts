// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"

export const GET_ALL_FCATEGORIES_QUERY = "GET_ALL_FCATEGORIES_QUERY"

export interface GetAllFCategoriesQuery extends IQuery<FlashcardCategoryWithTotalCount> {

    readonly type: typeof GET_ALL_FCATEGORIES_QUERY
    userId: string
}