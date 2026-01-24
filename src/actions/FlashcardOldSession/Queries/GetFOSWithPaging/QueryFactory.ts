// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GET_FOS_WITH_PAGING_QUERY, GetFOSWithPagingQuery } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/Query"

export function getFOSWithPagingQuery(userId: string, request: PagedRequest): GetFOSWithPagingQuery 
{
  return {
    type: GET_FOS_WITH_PAGING_QUERY,
    userId,
    request
    }
}