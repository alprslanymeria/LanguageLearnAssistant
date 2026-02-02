// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GetROSWithPagingQuery, GET_ROS_WITH_PAGING_QUERY } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/Query"

export function getROSWithPagingQuery(userId: string, language: string, request: PagedRequest): GetROSWithPagingQuery 
{
  return {
    type: GET_ROS_WITH_PAGING_QUERY,
    userId,
    language,
    request
    }
}