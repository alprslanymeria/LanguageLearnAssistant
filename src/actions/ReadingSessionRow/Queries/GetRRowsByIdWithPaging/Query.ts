// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { ReadingRowsResponse } from "@/src/actions/ReadingSessionRow/Response"

export const GET_RROWS_BY_ID_WITH_PAGING_QUERY = "GET_RROWS_BY_ID_WITH_PAGING_QUERY"

export interface GetRRowsByIdWithPagingQuery extends IQuery<ReadingRowsResponse> {

    readonly type: typeof GET_RROWS_BY_ID_WITH_PAGING_QUERY
    request: PagedRequest
    oldSessionId: string
}