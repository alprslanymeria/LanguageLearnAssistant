// IMPORTS
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GET_FCATEGORY_CREATE_ITEMS_QUERY, GetFCategoryCreateItemsQuery } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/Query"
import { ICacheKey } from "@/src/infrastructure/caching/Cache"

export function getFCategoryCreateItemsQuery(userId: string, language: string, practice: string): GetFCategoryCreateItemsQuery 
{
  return {
    type: GET_FCATEGORY_CREATE_ITEMS_QUERY,
    userId,
    language,
    practice,
    getCacheKey: function (): ICacheKey {
        
        return CacheKeys.flashcardCategory.CreateItems(this.userId, this.language, this.practice)
        }
    }
}