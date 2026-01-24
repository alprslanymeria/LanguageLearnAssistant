// IMPORTS
import { CompareLanguageIdRequest } from "@/src/actions/User/Request"
import { COMPARE_LANGUAGE_ID_QUERY, CompareLanguageIdQuery } from "./Query"

export function compareLanguageIdQuery(request: CompareLanguageIdRequest): CompareLanguageIdQuery {

    return {
        type: COMPARE_LANGUAGE_ID_QUERY,
        request
    }
}