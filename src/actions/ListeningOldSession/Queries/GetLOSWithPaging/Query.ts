// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ListeningOldSessionWithTotalCount } from "@/src/actions/ListeningOldSession/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_LOS_WITH_PAGING_QUERY = "GET_LOS_WITH_PAGING_QUERY"

export interface GetLOSWithPagingQuery extends IQuery<PagedResult<ListeningOldSessionWithTotalCount>> {

    readonly type: typeof GET_LOS_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
}