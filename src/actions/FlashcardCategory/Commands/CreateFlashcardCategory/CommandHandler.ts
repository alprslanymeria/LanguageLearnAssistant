// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"
import { CreateFlashcardCategoryCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { FlashcardResultNotSuccess } from "@/src/exceptions/NotSuccess"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { NoPracticeFound } from "@/src/exceptions/NotFound"
import { connect } from "http2"

@injectable()
export class CreateFlashcardCategoryCommandHandler implements ICommandHandler<CreateFlashcardCategoryCommand> {
    
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

    async Handle(request: CreateFlashcardCategoryCommand): Promise<void> {

        // FORM DATA'S
        const categoryName = request.formData.get("categoryName")?.toString()!
        const userId = request.formData.get("userId")?.toString()!
        const languageId = Number(request.formData.get("languageId"))
        const practice = request.formData.get("practice")?.toString()!

        
        // LOG MESSAGE
        this.logger.info(`CreateFlashcardCategoryCommandHandler: Creating flashcard category with name  ${categoryName}`)

        const isPracticeExists = await this.practiceRepository.getPracticeByLanguageIdAndNameAsync(languageId, practice)

        if (!isPracticeExists) throw new NoPracticeFound()
    
        const flashcardResult = await this.entityVerificationService.verifyOrCreateFlashcardAsync(

            isPracticeExists.id,
            userId,
            languageId
        )

        // FAST FAIL
        if (!flashcardResult.isSuccess) throw new FlashcardResultNotSuccess()
             
        const data = {

            name: categoryName,
            flashcard: {connect: {id: flashcardResult.data!.id}},
        }

        await this.flashcardCategoryRepository.createAsync(data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.flashcardCategory.prefix)

        this.logger.info(`CreateFlashcardCategoryCommandHandler: Successfully created flashcard category with name  ${categoryName}`)
    
        return
    }
}