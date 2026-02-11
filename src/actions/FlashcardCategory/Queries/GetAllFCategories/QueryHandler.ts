// IMPORTS
import { inject, injectable } from "inversify"
import { FlashcardCategoryWithLanguageId, FlashcardCategoryWithLanguageIds } from "@/src/actions/FlashcardCategory/Response"
import { GetAllFCategoriesQuery } from "./Query"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { TYPES } from "@/src/di/type"

@injectable()
export class GetAllFCategoriesQueryHandler implements IQueryHandler<GetAllFCategoriesQuery, FlashcardCategoryWithLanguageIds> {

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

    async Handle(request: GetAllFCategoriesQuery): Promise<FlashcardCategoryWithLanguageIds> {
        
        const userId = request.userId

        this.logger.info(`GetAllFCategoriesQueryHandler: Fetching all flashcard categories for UserId ${userId}`)

        const { items, totalCount } = await this.flashcardCategoryRepository.getAllFCategoriesAsync(userId)

        this.logger.info(`GetAllFCategoriesQueryHandler: Successfully fetched ${items.length} flashcard categories for UserId ${userId}`)

        const response: FlashcardCategoryWithLanguageIds = {

            flashcardCategoryDtos: items,
            totalCount
        }

        return response
    }
}