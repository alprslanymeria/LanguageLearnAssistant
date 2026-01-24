// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { CreateFlashcardCategoryData, IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { CreateFlashcardCategoryCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { FlashcardResultNotSuccess } from "@/src/exceptions/NotSuccess"

@injectable()
export class CreateFlashcardCategoryCommandHandler implements ICommandHandler<CreateFlashcardCategoryCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly cacheService: ICacheService
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository
    private readonly entityVerificationService: IEntityVerificationService

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository,
        @inject(TYPES.EntityVerificationService) entityVerificationService: IEntityVerificationService
    
    ) {
        
        this.logger = logger;
        this.cacheService = cacheService;
        this.flashcardCategoryRepository = flashcardCategoryRepository;
        this.entityVerificationService = entityVerificationService;
    }

    async Handle(request: CreateFlashcardCategoryCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`CreateFlashcardCategoryCommandHandler: Creating flashcard category with name  ${request.request.name}`)
    
        const flashcardResult = await this.entityVerificationService.verifyOrCreateFlashcardAsync(

            request.request.flashcardId,
            request.request.userId,
            request.request.languageId
        )

        // FAST FAIL
        if (!flashcardResult.isSuccess) throw new FlashcardResultNotSuccess()
             
        const data : CreateFlashcardCategoryData = {

            name: request.request.name,
            flashcardId: flashcardResult.data!.id,
        }

        const flashcardCategoryId = await this.flashcardCategoryRepository.createAsync(data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.flashcardCategory.prefix)

        this.logger.info(`CreateFlashcardCategoryCommandHandler: Successfully created flashcard category with name  ${request.request.name}`)
    
        return flashcardCategoryId
    }
}