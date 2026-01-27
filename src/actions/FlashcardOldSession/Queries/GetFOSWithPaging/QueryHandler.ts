// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IFlashcardOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardOldSessionRepository"
import { FlashcardOldSessionDto, FlashcardOldSessionWithTotalCount } from "@/src/actions/FlashcardOldSession/Response"
import { GetFOSWithPagingQuery } from "./Query"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"

@injectable()
export class GetFOSWithPagingQueryHandler implements IQueryHandler<GetFOSWithPagingQuery, PagedResult<FlashcardOldSessionWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardOldSessionRepository : IFlashcardOldSessionRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.FlashcardOldSessionRepository) flashcardOldSessionRepository : IFlashcardOldSessionRepository

    ) {

        this.logger = logger
        this.flashcardOldSessionRepository = flashcardOldSessionRepository
        
    }

    async Handle(request: GetFOSWithPagingQuery): Promise<PagedResult<FlashcardOldSessionWithTotalCount>> {

        // LOG MESSAGE
        this.logger.info(`GetFOSWithPagingQueryHandler: Fetching flashcard old sessions with paging for user!`)

        const {items, totalCount} = await this.flashcardOldSessionRepository.getFlashcardOldSessionsWithPagingAsync(request.userId, request.request.page, request.request.pageSize)
    
        // MAP ITEMS TO FLASHCARD OLDSESSION DTO
        const flashcardOldSessionDtos: FlashcardOldSessionDto[] = items.map(fos => ({

            id: fos.oldSessionId,
            flashcardId: fos.flashcardId,
            flashcardCategoryId: fos.categoryId,
            rate: fos.rate.toNumber(),
            createdAt: fos.createdAt
        }))
    
        const response: FlashcardOldSessionWithTotalCount = {

            flashcardOldSessionDtos,
            totalCount
        }

        const result = createPagedResult<FlashcardOldSessionWithTotalCount>([response], request.request, totalCount)

        return result
    }
}