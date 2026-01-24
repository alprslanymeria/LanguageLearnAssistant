// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { UpdateFlashcardCategoryCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import type { IFlashcardCategoryRepository, UpdateFlashcardCategoryData } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import { FlashcardCategoryNotFound } from "@/src/exceptions/NotFound"
import { FlashcardResultNotSuccess } from "@/src/exceptions/NotSuccess"

@injectable()
export class UpdateFlashcardCategoryCommandHandler implements ICommandHandler<UpdateFlashcardCategoryCommand, number> {
    
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

    async Handle(request: UpdateFlashcardCategoryCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`UpdateFlashcardCategoryCommandHandler: Updating flashcard category with Id ${request.request.id}`)

        const existingFlashcardCategory = await this.flashcardCategoryRepository.getByIdAsync(request.request.id)

        if(!existingFlashcardCategory) {

            this.logger.error(`UpdateFlashcardCategoryCommandHandler: Flashcard category with Id ${request.request.id} not found!`)
            throw new FlashcardCategoryNotFound()
        }

        // VERIFY OR CREATE FLASHCARD
        const flashcardResult = await this.entityVerificationService.verifyOrCreateFlashcardAsync(

            request.request.flashcardId,
            request.request.userId,
            request.request.languageId
        )

        // FAST FAIL
        if (!flashcardResult.isSuccess) throw new FlashcardResultNotSuccess()

        const data : UpdateFlashcardCategoryData = {

            name: request.request.name,
            flashcardId: flashcardResult.data!.id            
        }

        const updatedId = await this.flashcardCategoryRepository.update(request.request.id, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.flashcardCategory.prefix)

        this.logger.info(`UpdateFlashcardCategoryCommandHandler: Successfully updated flashcard category with Id ${request.request.id}`)

        return updatedId
    }
}