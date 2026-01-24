// IMPORTS
import { GET_DECK_WORD_BY_ID_QUERY, GetDeckWordByIdQuery } from "@/src/actions/DeckWord/Queries/GetDeckWordById/Query"
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"

export function getDeckWordByIdQuery(id: number): GetDeckWordByIdQuery 
{
  return {
    type: GET_DECK_WORD_BY_ID_QUERY,
    id,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.deckWord.ById(this.id)
        }
    }
}