// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { PracticeDto } from "@/src/actions/Practice/Response"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"

export const GET_PRACTICES_BY_LANGUAGE_QUERY = "GET_PRACTICES_BY_LANGUAGE_QUERY"

export interface GetPracticesByLanguageQuery extends IQuery<PracticeDto[]>, ICacheableQuery {

    readonly type: typeof GET_PRACTICES_BY_LANGUAGE_QUERY
    language: string
}