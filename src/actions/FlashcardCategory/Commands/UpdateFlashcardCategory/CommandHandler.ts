// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { UpdateFlashcardCategoryCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import { FlashcardCategoryNotFound, NoPracticeFound } from "@/src/exceptions/NotFound"
import { FlashcardResultNotSuccess } from "@/src/exceptions/NotSuccess"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { connect } from "http2"

@injectable()
export class UpdateFlashcardCategoryCommandHandler implements ICommandHandler<UpdateFlashcardCategoryCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly cacheService: ICacheService
    private readonly practiceRepository : IPracticeRepository
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository
    private readonly entityVerificationService: IEntityVerificationService

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.PracticeRepository) practiceRepository : IPracticeRepository,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository,
        @inject(TYPES.EntityVerificationService) entityVerificationService: IEntityVerificationService
    
    ) {
        
        this.logger = logger;
        this.cacheService = cacheService;
        this.practiceRepository = practiceRepository;
        this.flashcardCategoryRepository = flashcardCategoryRepository;
        this.entityVerificationService = entityVerificationService;
    }

    async Handle(request: UpdateFlashcardCategoryCommand): Promise<void> {

        // FORM DATA'S
        const itemId = Number(request.formData.get("itemId"))
        const categoryName = request.formData.get("categoryName")?.toString()!
        const userId = request.formData.get("userId")?.toString()!
        const languageId = Number(request.formData.get("languageId"))
        const practice = request.formData.get("practice")?.toString()!
        
        // LOG MESSAGE
        this.logger.info(`UpdateFlashcardCategoryCommandHandler: Updating flashcard category with Id ${itemId}`)

        const isPracticeExists = await this.practiceRepository.getPracticeByLanguageIdAndNameAsync(languageId, practice)
                
        if (!isPracticeExists) throw new NoPracticeFound()
                    
        const existingFlashcardCategory = await this.flashcardCategoryRepository.getByIdAsync(itemId)

        if(!existingFlashcardCategory) {

            this.logger.error(`UpdateFlashcardCategoryCommandHandler: Flashcard category with Id ${itemId} not found!`)
            throw new FlashcardCategoryNotFound()
        }

        // VERIFY OR CREATE FLASHCARD
        const flashcardResult = await this.entityVerificationService.verifyOrCreateFlashcardAsync(

            isPracticeExists.id,
            userId,
            languageId
        )

        // FAST FAIL
        if (!flashcardResult.isSuccess) throw new FlashcardResultNotSuccess()

        const data = {

            name: categoryName,
            flashcard: {connect : { id: flashcardResult.data!.id }}
        }

        await this.flashcardCategoryRepository.updateAsync(itemId, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.flashcardCategory.prefix)

        this.logger.info(`UpdateFlashcardCategoryCommandHandler: Successfully updated flashcard category with Id ${itemId}`)

        return
    }
}