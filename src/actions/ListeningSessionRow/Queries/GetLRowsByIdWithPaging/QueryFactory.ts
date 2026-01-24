// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GET_LROWS_BY_ID_WITH_PAGING_QUERY, GetLRowsByIdWithPagingQuery } from "@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/Query"

export function getLRowsByIdWithPagingQuery(oldSessionId: string, request: PagedRequest): GetLRowsByIdWithPagingQuery 
{
  return {
    type: GET_LROWS_BY_ID_WITH_PAGING_QUERY,
    oldSessionId,
    request
    }
}