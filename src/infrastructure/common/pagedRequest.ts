export class PagedRequest {

    private static readonly DEFAULT_PAGE_SIZE = 10
    private static readonly MAX_PAGE_SIZE = 100
    private static readonly MIN_PAGE = 1

    page: number
    pageSize: number

    constructor(page?: number, pageSize?: number) 
    {
        this.page = page && page >= PagedRequest.MIN_PAGE ? page : PagedRequest.MIN_PAGE

        this.pageSize = Math.max(

            PagedRequest.DEFAULT_PAGE_SIZE,
            Math.min(pageSize || PagedRequest.DEFAULT_PAGE_SIZE, PagedRequest.MAX_PAGE_SIZE)
        )
    }
}