// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { WritingRowsResponse } from "@/src/actions/WritingSessionRow/Response"

export const GET_WROWS_BY_ID_WITH_PAGING_QUERY = "GET_WROWS_BY_ID_WITH_PAGING_QUERY"

export interface GetWRowsByIdWithPagingQuery extends IQuery<WritingRowsResponse> {

    readonly type: typeof GET_WROWS_BY_ID_WITH_PAGING_QUERY
    request: PagedRequest
    oldSessionId: string
}