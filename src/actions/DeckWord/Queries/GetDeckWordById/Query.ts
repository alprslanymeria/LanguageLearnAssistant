// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { DeckWordWithLanguageId } from "@/src/actions/DeckWord/Response"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"

export const GET_DECK_WORD_BY_ID_QUERY = "GET_DECK_WORD_BY_ID_QUERY"

export interface GetDeckWordByIdQuery extends IQuery<DeckWordWithLanguageId>, ICacheableQuery {

    readonly type: typeof GET_DECK_WORD_BY_ID_QUERY
    id: number
}