// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { WritingOldSessionWithTotalCount } from "@/src/actions/WritingOldSession/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_WOS_WITH_PAGING_QUERY = "GET_WOS_WITH_PAGING_QUERY"

export interface GetWOSWithPagingQuery extends IQuery<PagedResult<WritingOldSessionWithTotalCount>> {

    readonly type: typeof GET_WOS_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
}