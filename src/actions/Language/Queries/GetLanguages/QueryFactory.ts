// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { GET_LANGUAGES_QUERY, GetLanguagesQuery } from "@/src/actions/Language/Queries/GetLanguages/Query"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"

export function createGetLanguagesQuery(): GetLanguagesQuery 
{
  return {
    type: GET_LANGUAGES_QUERY,
    getCacheKey: function (): ICacheKey {

        return CacheKeys.language.All()
        }
    }
}