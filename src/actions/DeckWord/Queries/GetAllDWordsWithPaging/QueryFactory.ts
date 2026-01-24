// IMPORTS
import { GET_ALL_DWORDS_WITH_PAGING_QUERY, GetAllDWordsWithPagingQuery } from "@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/Query"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"

export function getAllDWordsWithPagingQuery(categoryId: number, request: PagedRequest): GetAllDWordsWithPagingQuery 
{
  return {
    type: GET_ALL_DWORDS_WITH_PAGING_QUERY,
    categoryId,
    request
    }
}