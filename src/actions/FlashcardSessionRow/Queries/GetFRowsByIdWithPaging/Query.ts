// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { FlashcardRowsResponse } from "@/src/actions/FlashcardSessionRow/Response"

export const GET_FWORDS_BY_ID_WITH_PAGING_QUERY = "GET_FWORDS_BY_ID_WITH_PAGING_QUERY"

export interface GetFWordsByIdWithPagingQuery extends IQuery<FlashcardRowsResponse> {

    readonly type: typeof GET_FWORDS_BY_ID_WITH_PAGING_QUERY
    request: PagedRequest
    oldSessionId: string
}