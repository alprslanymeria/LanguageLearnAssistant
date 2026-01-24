// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { FlashcardCategoryDto, FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { GetAllFCategoriesWithPagingQuery } from "./Query"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"


@injectable()
export class GetAllFCategoriesWithPagingQueryHandler implements IQueryHandler<GetAllFCategoriesWithPagingQuery, PagedResult<FlashcardCategoryWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository

    ) {

        this.logger = logger
        this.flashcardCategoryRepository = flashcardCategoryRepository
        
    }


    async Handle(request: GetAllFCategoriesWithPagingQuery): Promise<PagedResult<FlashcardCategoryWithTotalCount>> {

        const userId = request.userId
        const page = request.request.page
        const pageSize = request.request.pageSize

        this.logger.info(`GetAllFCategoriesWithPagingQueryHandler: Fetching flashcard categories for UserId ${userId}, Page ${page}, PageSize ${pageSize}`)

        const { items, totalCount } = await this.flashcardCategoryRepository.getAllFCategoriesWithPagingAsync(userId, page, pageSize)
    
        this.logger.info(`GetAllFCategoriesWithPagingQueryHandler: Successfully fetched ${items.length} flashcard categories for UserId ${userId}`)
    
        // MAP ITEMS TO FLASHCARD CATEGORY DTO
        const flashcardCategoryDtos : FlashcardCategoryDto[] = items.map(fc => ({

            flashcardId: fc.flashcardId,
            name: fc.name
        }))

        const response: FlashcardCategoryWithTotalCount = {

            flashcardCategoryDtos,
            totalCount
        }

        const result = createPagedResult<FlashcardCategoryWithTotalCount>([response], request.request, totalCount)

        return result
    }
}