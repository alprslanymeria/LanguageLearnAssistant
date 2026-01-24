// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export const GET_ALL_FCATEGORIES_WITH_PAGING_QUERY = "GET_ALL_FCATEGORIES_WITH_PAGING_QUERY"

export interface GetAllFCategoriesWithPagingQuery extends IQuery<PagedResult<FlashcardCategoryWithTotalCount>> {

    readonly type: typeof GET_ALL_FCATEGORIES_WITH_PAGING_QUERY
    request: PagedRequest
    userId: string
}