// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { ListeningRowsResponse } from "@/src/actions/ListeningSessionRow/Response"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"

export const GET_LROWS_BY_ID_WITH_PAGING_QUERY = "GET_LROWS_BY_ID_WITH_PAGING_QUERY"

export interface GetLRowsByIdWithPagingQuery extends IQuery<ListeningRowsResponse> {

    readonly type: typeof GET_LROWS_BY_ID_WITH_PAGING_QUERY
    request: PagedRequest
    oldSessionId: string
}