// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GetWRowsByIdWithPagingQuery, GET_WROWS_BY_ID_WITH_PAGING_QUERY } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/Query"

export function getWRowsByIdWithPagingQuery(oldSessionId: string, request: PagedRequest): GetWRowsByIdWithPagingQuery 
{
  return {
    type: GET_WROWS_BY_ID_WITH_PAGING_QUERY,
    oldSessionId,
    request
    }
}