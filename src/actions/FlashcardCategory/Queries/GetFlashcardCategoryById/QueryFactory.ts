// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GET_FLASHCARD_CATEGORY_BY_ID_QUERY, GetFlashcardCategoryByIdQuery } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/Query"

export function getFlashcardCategoryByIdQuery(id: number): GetFlashcardCategoryByIdQuery 
{
  return {
    type: GET_FLASHCARD_CATEGORY_BY_ID_QUERY,
    id,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.flashcardCategory.ById(this.id)
        }
    }
}