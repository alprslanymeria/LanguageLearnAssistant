// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { FlashcardCategoryWithLanguageId } from "@/src/actions/FlashcardCategory/Response"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"

export const GET_FLASHCARD_CATEGORY_BY_ID_QUERY = "GET_FLASHCARD_CATEGORY_BY_ID_QUERY"

export interface GetFlashcardCategoryByIdQuery extends IQuery<FlashcardCategoryWithLanguageId>, ICacheableQuery {

    readonly type: typeof GET_FLASHCARD_CATEGORY_BY_ID_QUERY
    id: number
}