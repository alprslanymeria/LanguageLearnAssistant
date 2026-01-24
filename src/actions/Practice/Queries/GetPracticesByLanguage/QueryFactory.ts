// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GetPracticesByLanguageQuery, GET_PRACTICES_BY_LANGUAGE_QUERY } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/Query"

export function getPracticesByLanguageQuery(language: string): GetPracticesByLanguageQuery 
{
  return {
    type: GET_PRACTICES_BY_LANGUAGE_QUERY,
    language,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.practice.ByLanguage(this.language)
        }
    }
}