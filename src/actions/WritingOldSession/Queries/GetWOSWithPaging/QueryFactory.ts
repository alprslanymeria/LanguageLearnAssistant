// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GetWOSWithPagingQuery, GET_WOS_WITH_PAGING_QUERY } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/Query"

export function getWOSWithPagingQuery(userId: string, language: string, request: PagedRequest): GetWOSWithPagingQuery 
{
  return {
    type: GET_WOS_WITH_PAGING_QUERY,
    userId,
    language,
    request
    }
}