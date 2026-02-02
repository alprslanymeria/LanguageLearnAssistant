// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { ReadingBookDto, ReadingBookWithTotalCount } from "@/src/actions/ReadingBook/Response"
import { GetAllRBooksWithPagingQuery } from "./Query"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"
import { ReadingBookNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetAllRBooksWithPagingQueryHandler implements IQueryHandler<GetAllRBooksWithPagingQuery, PagedResult<ReadingBookWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository

    ) {

        this.logger = logger
        this.readingBookRepository = readingBookRepository
        
    }

    async Handle(request: GetAllRBooksWithPagingQuery): Promise<PagedResult<ReadingBookWithTotalCount>> {
        
        const userId = request.userId
        const page = request.request.page
        const pageSize = request.request.pageSize

        this.logger.info(`GetAllRBooksWithPagingQueryHandler: Fetching reading books for UserId ${userId}, Page ${page}, PageSize ${pageSize}`)

        const { items, totalCount } = await this.readingBookRepository.getAllRBooksWithPagingAsync(userId, page, pageSize)
    
        this.logger.info(`GetAllRBooksWithPagingQueryHandler: Successfully fetched ${items.length} reading books for UserId ${userId}`)

        // MAP ITEMS TO READING BOOK DTO
        const readingBookDtos: ReadingBookDto[] = items.map(rb => ({

            id: rb.id,
            readingId: rb.readingId,
            name: rb.name,
            imageUrl: rb.imageUrl,
            sourceUrl: rb.sourceUrl,
            leftColor: rb.leftColor
        }))

        const response: ReadingBookWithTotalCount = {

            readingBookDtos,
            totalCount
        }

        const result = createPagedResult<ReadingBookWithTotalCount>([response], request.request, totalCount)

        return result
    }
}