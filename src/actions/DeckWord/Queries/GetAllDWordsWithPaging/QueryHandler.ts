// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IDeckWordRepository } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { DeckWordDto, DeckWordWithTotalCount } from "@/src/actions/DeckWord/Response"
import { GetAllDWordsWithPagingQuery } from "./Query"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"

@injectable()
export class GetAllDWordsWithPagingQueryHandler implements IQueryHandler<GetAllDWordsWithPagingQuery, PagedResult<DeckWordWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly deckWordRepository : IDeckWordRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.DeckWordRepository) deckWordRepository : IDeckWordRepository

    ) {

        this.logger = logger
        this.deckWordRepository = deckWordRepository
        
    }

    async Handle(request: GetAllDWordsWithPagingQuery): Promise<PagedResult<DeckWordWithTotalCount>> {

        const userId = request.userId
        const page = request.request.page
        const pageSize = request.request.pageSize

        this.logger.info(`GetAllDWordsWithPagingQueryHandler: Fetching deck words for UserId ${userId}, Page ${page}, PageSize ${pageSize}`)
        
        const { items, totalCount } = await this.deckWordRepository.getAllDWordsWithPagingAsync(userId, page, pageSize)

        this.logger.info(`GetAllDWordsWithPagingQueryHandler: Successfully fetched ${items.length} deck words for UserId ${userId}`)
    
        // MAP ITMES TO DECK WORD DTO
        const deckWordDtos : DeckWordDto[] = items.map(dw => ({

            flashcardCategoryId: dw.categoryId,
            question: dw.question,
            answer: dw.answer
        }))

        const response: DeckWordWithTotalCount = {

            deckWordDtos,
            totalCount
        }

        const result = createPagedResult<DeckWordWithTotalCount>([response], request.request, totalCount)

        return result
    }
}