// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CreateFOSCommand } from "./Command"
import type { CreateFlashcardOldSessionData, IFlashcardOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardOldSessionRepository"
import { FlashcardRepository } from "@/src/infrastructure/persistence/repositories/FlashcardRepository"
import { FlashcardCategoryRepository } from "@/src/infrastructure/persistence/repositories/FlashcardCategoryRepository"
import { FlashcardCategoryNotFound, FlashcardNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateFOSCommandHandler implements ICommandHandler<CreateFOSCommand, string> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardOldSessionRepository : IFlashcardOldSessionRepository
    private readonly flashcardRepository: FlashcardRepository
    private readonly flashcardCategoryRepository: FlashcardCategoryRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.FlashcardOldSessionRepository) flashcardOldSessionRepository : IFlashcardOldSessionRepository,
        @inject(TYPES.FlashcardRepository) flashcardRepository: FlashcardRepository,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository: FlashcardCategoryRepository
    ) {
        
        this.logger = logger;
        this.flashcardOldSessionRepository = flashcardOldSessionRepository;
        this.flashcardRepository = flashcardRepository;
        this.flashcardCategoryRepository = flashcardCategoryRepository;
    }
    
    async Handle(request: CreateFOSCommand): Promise<string> {
        
        // LOG MESSAGE
        this.logger.info(`CreateFOSCommandHandler: Creating flashcard old session for user!`)
    
        const flashcard = await this.flashcardRepository.getByIdAsync(request.request.flashcardId)

        // FAST FAIL
        if(!flashcard) {

            this.logger.error(`CreateFOSCommandHandler: Flashcard with Id ${request.request.flashcardId} not found!`)
            throw new FlashcardNotFound()
        }

        const flashcardCategory = await this.flashcardCategoryRepository.getByIdAsync(request.request.flashcardCategoryId)

        // FAST FAIL
        if(!flashcardCategory) {

            this.logger.error(`CreateFOSCommandHandler: Flashcard category with Id ${request.request.flashcardCategoryId} not found!`)
            throw new FlashcardCategoryNotFound()
        }

        const data : CreateFlashcardOldSessionData = {

            oldSessionId: request.request.id,
            flashcardId: request.request.flashcardId,
            categoryId: request.request.flashcardCategoryId,
            rate: request.request.rate
        }

        const createdId = await this.flashcardOldSessionRepository.createAsync(data)

        this.logger.info(`CreateFOSCommandHandler: Successfully created flashcard old session for user!`)
    
        return createdId
    }
}