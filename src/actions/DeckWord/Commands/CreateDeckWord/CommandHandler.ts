// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { CreateDeckWordData, IDeckWordRepository } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { CreateDeckWordCommand } from "./Command"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"


@injectable()
export class CreateDeckWordCommandHandler implements ICommandHandler<CreateDeckWordCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly cacheService: ICacheService
    private readonly deckWordRepository : IDeckWordRepository
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.DeckWordRepository) deckWordRepository : IDeckWordRepository,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository
    ) {
        
        this.logger = logger;
        this.cacheService = cacheService;
        this.deckWordRepository = deckWordRepository;
        this.flashcardCategoryRepository = flashcardCategoryRepository;
    }

    async Handle(request: CreateDeckWordCommand): Promise<number> {

        // FORM DATA'S
        const categoryId = Number(request.formData.get("categoryId"))
        const word = request.formData.get("word")?.toString()!
        const answer = request.formData.get("answer")?.toString()!
        
        // LOG MESSAGE
        this.logger.info(`CreateDeckWordCommandHandler: Creating deck word for CategoryId ${categoryId}`)
    
        const category = await this.flashcardCategoryRepository.getByIdAsync(categoryId)

        const data : CreateDeckWordData = {

            categoryId: categoryId,
            question: word,
            answer: answer
        }

        const deckWordId = await this.deckWordRepository.createAsync(data)

        // INVALIDATE CACHE
        await this.cacheService.invalidateByPrefix(CacheKeys.deckWord.prefix)

        this.logger.info(`CreateDeckWordCommandHandler: Successfully created deck word for CategoryId ${categoryId}`)

        return deckWordId
    }
}