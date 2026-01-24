// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { GET_ALL_FCATEGORIES_WITH_PAGING_QUERY, GetAllFCategoriesWithPagingQuery } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/Query"

export function getAllFCategoriesWithPagingQuery(userId: string, request: PagedRequest): GetAllFCategoriesWithPagingQuery 
{
  return {
    type: GET_ALL_FCATEGORIES_WITH_PAGING_QUERY,
    userId,
    request
    }
}