// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ReadingOldSessionWithTotalCount } from "@/src/actions/ReadingOldSession/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_ROS_WITH_PAGING_QUERY = "GET_ROS_WITH_PAGING_QUERY"

export interface GetROSWithPagingQuery extends IQuery<PagedResult<ReadingOldSessionWithTotalCount>> {

    readonly type: typeof GET_ROS_WITH_PAGING_QUERY
    request: PagedRequest
    language: string
    userId: string
}