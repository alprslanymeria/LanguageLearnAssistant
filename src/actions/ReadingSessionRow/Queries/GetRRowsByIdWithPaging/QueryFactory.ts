// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GetRRowsByIdWithPagingQuery, GET_RROWS_BY_ID_WITH_PAGING_QUERY } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/Query"

export function getRRowsByIdWithPagingQuery(oldSessionId: string, request: PagedRequest): GetRRowsByIdWithPagingQuery 
{
  return {
    type: GET_RROWS_BY_ID_WITH_PAGING_QUERY,
    oldSessionId,
    request
    }
}