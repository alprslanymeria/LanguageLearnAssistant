// IMPORTS
import { TranslateTextRequest } from "@/src/actions/Translation/Request"
import { TranslateTextQuery, TRANSLATE_TEXT_QUERY } from "@/src/actions/Translation/Queries/TranslateText/Query"

export function translateTextQuery(userId: string, request: TranslateTextRequest): TranslateTextQuery 
{
  return {
    type: TRANSLATE_TEXT_QUERY,
    userId,
    request
    }
}