// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GetRBookCreateItemsQuery, GET_RBOOK_CREATE_ITEMS_QUERY } from "@/src/actions/ReadingBook/Queries/GetRBookCreateItems/Query"

export function getRBookCreateItemsQuery(userId: string, language: string, practice: string): GetRBookCreateItemsQuery 
{
  return {
    type: GET_RBOOK_CREATE_ITEMS_QUERY,
    userId,
    language,
    practice,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.readingBook.CreateItems(this.userId, this.language, this.practice)
        }
    }
}