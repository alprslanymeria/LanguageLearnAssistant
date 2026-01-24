// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { WritingBookWithTotalCount } from "@/src/actions/WritingBook/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_ALL_WBOOKS_WITH_PAGING_QUERY = "GET_ALL_WBOOKS_WITH_PAGING_QUERY"

export interface GetAllWBooksWithPagingQuery extends IQuery<PagedResult<WritingBookWithTotalCount>> {

    readonly type: typeof GET_ALL_WBOOKS_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
}