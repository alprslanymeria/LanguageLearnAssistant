// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { DeckWordWithTotalCount } from "@/src/actions/DeckWord/Response"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_ALL_DWORDS_WITH_PAGING_QUERY = "GET_ALL_DWORDS_WITH_PAGING_QUERY"

export interface GetAllDWordsWithPagingQuery extends IQuery<PagedResult<DeckWordWithTotalCount>> {

    readonly type: typeof GET_ALL_DWORDS_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
}