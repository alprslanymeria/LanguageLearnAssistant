// IMPORTS
import { ICacheKey } from "@/src/infrastructure/caching/Cache"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { GetWritingBookByIdQuery, GET_WRITING_BOOK_BY_ID_QUERY } from "@/src/actions/WritingBook/Queries/GetWritingBookById/Query"

export function getWritingBookByIdQuery(id: number): GetWritingBookByIdQuery 
{
  return {
    type: GET_WRITING_BOOK_BY_ID_QUERY,
    id,
    getCacheKey: function (): ICacheKey {
    
        return CacheKeys.writingBook.ById(this.id)
        }
    }
}