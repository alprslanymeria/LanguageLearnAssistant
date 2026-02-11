// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { FlashcardCategoryWithLanguageId } from "@/src/actions/FlashcardCategory/Response"
import { GetFlashcardCategoryByIdQuery } from "./Query"
import { FlashcardCategoryNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetFlashcardCategoryByIdQueryHandler implements IQueryHandler<GetFlashcardCategoryByIdQuery, FlashcardCategoryWithLanguageId> {

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

    async Handle(request: GetFlashcardCategoryByIdQuery): Promise<FlashcardCategoryWithLanguageId> {

        const id = request.id

        this.logger.info(`GetFlashcardCategoryByIdQueryHandler: Fetching flashcard category with Id ${id}`)

        const flashcardCategory =  await this.flashcardCategoryRepository.getFlashcardCategoryItemByIdAsync(id)

        if(!flashcardCategory) {

            this.logger.info(`GetFlashcardCategoryByIdQueryHandler: No flashcard category found with Id ${id}`)
            throw new FlashcardCategoryNotFound()
        }

        this.logger.info(`GetFlashcardCategoryByIdQueryHandler: Successfully fetched flashcard category with Id ${id}`)
    
        const response: FlashcardCategoryWithLanguageId = {

            id: flashcardCategory.id,
            flashcardId: flashcardCategory.flashcardId,
            name: flashcardCategory.name,
            languageId: flashcardCategory.languageId
        }

        return response
    }
}