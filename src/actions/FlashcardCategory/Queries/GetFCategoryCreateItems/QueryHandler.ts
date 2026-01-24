// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { FlashcardCategoryDto } from "@/src/actions/FlashcardCategory/Response"
import { GetFCategoryCreateItemsQuery } from "./Query"
import { LanguageRepository } from "@/src/infrastructure/persistence/repositories/LanguageRepository"
import { PracticeRepository } from "@/src/infrastructure/persistence/repositories/PracticeRepository"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetFCategoryCreateItemsQueryHandler implements IQueryHandler<GetFCategoryCreateItemsQuery, FlashcardCategoryDto[]> {

    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository
    private readonly languageRepository : LanguageRepository
    private readonly practiceRepository : PracticeRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository,
        @inject(TYPES.LanguageRepository) languageRepository : LanguageRepository,
        @inject(TYPES.PracticeRepository) practiceRepository : PracticeRepository

    ) {

        this.logger = logger
        this.flashcardCategoryRepository = flashcardCategoryRepository
        this.languageRepository = languageRepository
        this.practiceRepository = practiceRepository
        
    }

    async Handle(request: GetFCategoryCreateItemsQuery): Promise<FlashcardCategoryDto[]> {

        // LOG MESSAGE
        this.logger.info(`GetFCategoryCreateItemsQueryHandler: Fetching flashcard categories for creating deck words`)
    
        // CHECK IF LANGUAGE EXISTS
        const languageExists = await this.languageRepository.existsByNameAsync(request.language)

        if(!languageExists) {

            this.logger.info(`GetFCategoryCreateItemsQueryHandler: No language found with name ${request.language}`)
            
            throw new NoLanguageFound()
        }

        // CHECK IF PRACTICE EXISTS
        const practiceExists = await this.practiceRepository.existsByNameAndLanguageIdAsync(request.practice, languageExists.id)
    
        if(!practiceExists) {

            this.logger.info(`GetFCategoryCreateItemsQueryHandler: No practice found with name ${request.practice} for language ${request.language}`)
            
            throw new NoPracticeFound()
        }

        const flashcardCategories = await this.flashcardCategoryRepository.getFCategoryCreateItemsAsync(request.userId, languageExists.id, practiceExists.id)
    
        const result : FlashcardCategoryDto[] = flashcardCategories.map(fc => ({

            flashcardId: fc.flashcardId,
            name: fc.name
        }))

        return result
    }
}