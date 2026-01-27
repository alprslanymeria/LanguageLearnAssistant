// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IWritingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IWritingOldSessionRepository"
import { WritingOldSessionDto, WritingOldSessionWithTotalCount } from "@/src/actions/WritingOldSession/Response"
import { GetWOSWithPagingQuery } from "./Query"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"


@injectable()
export class GetWOSWithPagingQueryHandler implements IQueryHandler<GetWOSWithPagingQuery, PagedResult<WritingOldSessionWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly writingOldSessionRepository : IWritingOldSessionRepository
    
    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingOldSessionRepository) writingOldSessionRepository : IWritingOldSessionRepository

    ) {

        this.logger = logger
        this.writingOldSessionRepository = writingOldSessionRepository
        
    }

    async Handle(request: GetWOSWithPagingQuery): Promise<PagedResult<WritingOldSessionWithTotalCount>> {
        
        // LOG MESSAGE
        this.logger.info(`GetWOSWithPagingQueryHandler: Fetching writing old sessions with paging for user!`)

        const {items, totalCount} = await this.writingOldSessionRepository.getWritingOldSessionsWithPagingAsync(request.userId, request.request.page, request.request.pageSize)

        // MAP ITEMS TO WRITING OLDSESSION DTO
        const writingOldSessionDtos : WritingOldSessionDto[] = items.map(wos => ({

            id: wos.oldSessionId,
            writingId: wos.writingId,
            writingBookId: wos.bookId,
            rate: wos.rate.toNumber(),
            createdAt: wos.createdAt
        }))

        const response : WritingOldSessionWithTotalCount = {

            writingOldSessionDtos,
            totalCount
        }

        const result = createPagedResult<WritingOldSessionWithTotalCount>([response], request.request, totalCount)

        return result
    }
}