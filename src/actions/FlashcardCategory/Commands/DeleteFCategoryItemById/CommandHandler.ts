// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { DeleteFCategoryItemByIdCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { FlashcardCategoryNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class DeleteFCategoryItemByIdCommandHandler implements ICommandHandler<DeleteFCategoryItemByIdCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository
    private readonly cacheService: ICacheService

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository
    
    ) {
        
        this.logger = logger;
        this.flashcardCategoryRepository = flashcardCategoryRepository;
        this.cacheService = cacheService;
    }
    
    async Handle(request: DeleteFCategoryItemByIdCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`DeleteFCategoryItemByIdCommandHandler: Deleting flashcard category item with Id ${request.id}`)
    
        const flashcardCategory = await this.flashcardCategoryRepository.getByIdAsync(request.id)

        // FAST FAIL
        if(!flashcardCategory) {

            this.logger.warn(`DeleteFCategoryItemByIdCommandHandler: Flashcard category item with Id ${request.id} not found!`)
            throw new FlashcardCategoryNotFound()
        }

        this.flashcardCategoryRepository.delete(request.id)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.flashcardCategory.prefix)

        this.logger.info(`DeleteFCategoryItemByIdCommandHandler: Successfully deleted flashcard category item with Id ${request.id}`)

        return
    }
}