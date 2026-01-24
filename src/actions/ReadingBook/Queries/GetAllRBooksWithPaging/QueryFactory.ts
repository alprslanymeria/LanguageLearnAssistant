// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GetAllRBooksWithPagingQuery, GET_ALL_RBOOKS_WITH_PAGING_QUERY } from "@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/Query"

export function getAllRBooksWithPagingQuery(userId: string, request: PagedRequest): GetAllRBooksWithPagingQuery 
{
  return {
    type: GET_ALL_RBOOKS_WITH_PAGING_QUERY,
    userId,
    request
    }
}