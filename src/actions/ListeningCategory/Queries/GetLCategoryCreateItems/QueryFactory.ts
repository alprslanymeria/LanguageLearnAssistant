// IMPORTS
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GET_LCATEGORY_CREATE_ITEMS_QUERY, GetLCategoryCreateItemsQuery } from "./Query"
import { ICacheKey } from "@/src/infrastructure/caching/Cache"

export function getLCategoryCreateItemsQuery(userId: string, language: string, practice: string) : GetLCategoryCreateItemsQuery {

    return {

        type: GET_LCATEGORY_CREATE_ITEMS_QUERY,
        userId,
        language,
        practice,
        getCacheKey: function () : ICacheKey {

            return CacheKeys.listeningCategory.CreateItems(this.userId, this.language, this.practice)
        }
    }
}