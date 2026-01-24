// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ReadingBookWithTotalCount } from "@/src/actions/ReadingBook/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_ALL_RBOOKS_WITH_PAGING_QUERY = "GET_ALL_RBOOKS_WITH_PAGING_QUERY"

export interface GetAllRBooksWithPagingQuery extends IQuery<PagedResult<ReadingBookWithTotalCount>> {

    readonly type: typeof GET_ALL_RBOOKS_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
}