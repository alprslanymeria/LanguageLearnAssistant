// IMPORTS
import { PagedRequest } from "./pagedRequest"

export interface PagedResult<T> {

    items: T[]
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

export function createPagedResult<T> (

    items: T[],
    request: PagedRequest,
    totalCount: number
  
) : PagedResult<T> {

    const totalPages = Math.ceil(totalCount / request.pageSize)

    return {

        items,
        page: request.page,
        pageSize: request.pageSize,
        totalCount,
        totalPages,
        hasPreviousPage: request.page > 1,
        hasNextPage: request.page < totalPages,
        }
    }