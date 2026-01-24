// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { CompareLanguageIdRequest } from "@/src/actions/User/Request"

export const COMPARE_LANGUAGE_ID_QUERY = "COMPARE_LANGUAGE_ID_QUERY"

export interface CompareLanguageIdQuery extends IQuery<boolean> {

    readonly type: typeof COMPARE_LANGUAGE_ID_QUERY
    request: CompareLanguageIdRequest
}