// IMPORTS
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { LanguageDto } from "@/src/actions/Language/Response"

export const GET_LANGUAGES_QUERY = "GET_LANGUAGES_QUERY"

export interface GetLanguagesQuery extends IQuery<LanguageDto[]> , ICacheableQuery {

    readonly type: typeof GET_LANGUAGES_QUERY
}