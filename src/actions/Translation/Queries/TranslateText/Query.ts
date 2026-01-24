// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { TranslateTextRequest } from "@/src/actions/Translation/Request"
import { TranslateTextResponse } from "@/src/actions/Translation/Response"

export const TRANSLATE_TEXT_QUERY = "TRANSLATE_TEXT_QUERY"

export interface TranslateTextQuery extends IQuery<TranslateTextResponse> {

    readonly type: typeof TRANSLATE_TEXT_QUERY
    request: TranslateTextRequest
    userId: string
}