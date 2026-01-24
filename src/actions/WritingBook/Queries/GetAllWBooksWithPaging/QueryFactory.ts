// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GetAllWBooksWithPagingQuery, GET_ALL_WBOOKS_WITH_PAGING_QUERY } from "@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/Query"

export function getAllWBooksWithPagingQuery(userId: string, request: PagedRequest): GetAllWBooksWithPagingQuery 
{
  return {
    type: GET_ALL_WBOOKS_WITH_PAGING_QUERY,
    userId,
    request
    }
}