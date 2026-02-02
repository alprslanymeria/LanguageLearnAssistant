// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { FlashcardCategoryWithLanguageIds } from "@/src/actions/FlashcardCategory/Response"

export const GET_ALL_FCATEGORIES_QUERY = "GET_ALL_FCATEGORIES_QUERY"

export interface GetAllFCategoriesQuery extends IQuery<FlashcardCategoryWithLanguageIds> {

    readonly type: typeof GET_ALL_FCATEGORIES_QUERY
    userId: string
}