// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GetReadingBookByIdQuery, GET_READING_BOOK_BY_ID_QUERY } from "@/src/actions/ReadingBook/Queries/GetReadingBookById/Query"

export function getReadingBookByIdQuery(id: number): GetReadingBookByIdQuery 
{
  return {
    type: GET_READING_BOOK_BY_ID_QUERY,
    id,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.readingBook.ById(this.id)
        }
    }
}