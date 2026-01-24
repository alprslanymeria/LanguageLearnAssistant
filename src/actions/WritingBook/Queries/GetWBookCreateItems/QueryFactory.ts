// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GetWBookCreateItemsQuery, GET_WBOOK_CREATE_ITEMS_QUERY } from "@/src/actions/WritingBook/Queries/GetWBookCreateItems/Query"

export function getWBookCreateItemsQuery(userId: string, language: string, practice: string): GetWBookCreateItemsQuery 
{
  return {
    type: GET_WBOOK_CREATE_ITEMS_QUERY,
    userId,
    language,
    practice,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.writingBook.CreateItems(this.userId, this.language, this.practice)
        }
    }
}