// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GET_FWORDS_BY_ID_WITH_PAGING_QUERY, GetFWordsByIdWithPagingQuery } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/Query"

export function getFWordsByIdWithPagingQuery(oldSessionId: string, request: PagedRequest): GetFWordsByIdWithPagingQuery 
{
  return {
    type: GET_FWORDS_BY_ID_WITH_PAGING_QUERY,
    oldSessionId,
    request
    }
}