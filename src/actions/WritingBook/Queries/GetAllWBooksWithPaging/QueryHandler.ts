// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { GetAllWBooksWithPagingQuery } from "./Query"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { WritingBookDto, WritingBookWithTotalCount } from "@/src/actions/WritingBook/Response"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"
import { WritingBookNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetAllWBooksWithPagingQueryHandler implements IQueryHandler<GetAllWBooksWithPagingQuery, PagedResult<WritingBookWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository

    ) {

        this.logger = logger
        this.writingBookRepository = writingBookRepository
        
    }
    
    async Handle(request: GetAllWBooksWithPagingQuery): Promise<PagedResult<WritingBookWithTotalCount>> {
        
        const userId = request.userId
        const page = request.request.page
        const pageSize = request.request.pageSize

        this.logger.info(`GetAllWBooksWithPagingQueryHandler: Fetching writing books for UserId ${userId}, Page ${page}, PageSize ${pageSize}`)

        const { items, totalCount } = await this.writingBookRepository.getAllWBooksWithPagingAsync(userId, page, pageSize)

        this.logger.info(`GetAllWBooksWithPagingQueryHandler: Successfully fetched ${items.length} writing books for UserId ${userId}`)

        // MAP ITEMS TO WRITING BOOK DTO
        const writingBookDtos : WritingBookDto[] = items.map(wb => ({

            id: wb.id,
            writingId: wb.writingId,
            name: wb.name,
            imageUrl: wb.imageUrl,
            sourceUrl: wb.sourceUrl,
            leftColor: wb.leftColor
        }))

        const response : WritingBookWithTotalCount = {

            writingBookDtos,
            totalCount
        }

        const result = createPagedResult<WritingBookWithTotalCount>([response], request.request, totalCount)

        return result
    }
}