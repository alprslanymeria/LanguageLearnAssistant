// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { FlashcardOldSessionWithTotalCount } from "@/src/actions/FlashcardOldSession/Response"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_FOS_WITH_PAGING_QUERY = "GET_FOS_WITH_PAGING_QUERY"

export interface GetFOSWithPagingQuery extends IQuery<PagedResult<FlashcardOldSessionWithTotalCount>> {

    readonly type: typeof GET_FOS_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
    language: string
}