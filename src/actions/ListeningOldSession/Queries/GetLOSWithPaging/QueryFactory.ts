// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GET_LOS_WITH_PAGING_QUERY, GetLOSWithPagingQuery } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/Query"

export function getLOSWithPagingQuery(userId: string, language: string, request: PagedRequest): GetLOSWithPagingQuery 
{
  return {
    type: GET_LOS_WITH_PAGING_QUERY,
    userId,
    language,
    request
    }
}