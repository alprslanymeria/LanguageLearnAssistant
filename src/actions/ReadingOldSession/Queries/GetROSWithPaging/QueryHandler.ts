// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IReadingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IReadingOldSessionRepository"
import { GetROSWithPagingQuery } from "./Query"
import { ReadingOldSessionDto, ReadingOldSessionWithTotalCount } from "@/src/actions/ReadingOldSession/Response"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"


@injectable()
export class GetROSWithPagingQueryHandler implements IQueryHandler<GetROSWithPagingQuery, PagedResult<ReadingOldSessionWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly readingOldSessionRepository : IReadingOldSessionRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingOldSessionRepository) readingOldSessionRepository : IReadingOldSessionRepository

    ) {

        this.logger = logger
        this.readingOldSessionRepository = readingOldSessionRepository
        
    }
    
    async Handle(request: GetROSWithPagingQuery): Promise<PagedResult<ReadingOldSessionWithTotalCount>> {
        
        // LOG MESSAGE
        this.logger.info(`GetROSWithPagingQueryHandler: Fetching reading old sessions with paging for user!`)

        const {items, totalCount} = await this.readingOldSessionRepository.getReadingOldSessionsWithPagingAsync(request.userId, request.request.page, request.request.pageSize)

        // MAP ITEMS TO READING OLDSESSION DTO
        const readingOldSessionDtos : ReadingOldSessionDto[] = items.map(ros => ({

            readingId: ros.readingId,
            readingBookId: ros.bookId,
            rate: ros.rate.toNumber(),
            createdAt: ros.createdAt
        }))

        const response : ReadingOldSessionWithTotalCount = {

            readingOldSessionDtos,
            totalCount
        }

        const result = createPagedResult<ReadingOldSessionWithTotalCount>([response], request.request, totalCount)
    
        return result
    }

}