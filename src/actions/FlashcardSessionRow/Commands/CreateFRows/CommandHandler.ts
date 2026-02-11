// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IFlashcardSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardSessionRowRepository"
import { CreateFRowsCommand } from "./Command"
import type { IFlashcardOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardOldSessionRepository"
import { FlashcardOldSessionNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateFRowsCommandHandler implements ICommandHandler<CreateFRowsCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardSessionRowRepository : IFlashcardSessionRowRepository
    private readonly flashcardOldSessionRepository : IFlashcardOldSessionRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.FlashcardSessionRowRepository) flashcardSessionRowRepository : IFlashcardSessionRowRepository,
        @inject(TYPES.FlashcardOldSessionRepository) flashcardOldSessionRepository : IFlashcardOldSessionRepository
    
    ) {
        
        this.logger = logger;
        this.flashcardSessionRowRepository = flashcardSessionRowRepository;
        this.flashcardOldSessionRepository = flashcardOldSessionRepository;
    }
    
    async Handle(request: CreateFRowsCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`CreateFRowsCommandHandler: Creating flashcard session rows for flashcard old session with Id ${request.request.flashcardOldSessionId}`)

        const session = await this.flashcardOldSessionRepository.getByIdAsync(request.request.flashcardOldSessionId)

        // FAST FAIL
        if(!session) {

            this.logger.error(`CreateFRowsCommandHandler: Flashcard old session with Id ${request.request.flashcardOldSessionId} not found!`)
            throw new FlashcardOldSessionNotFound()
        }

        const rows = request.request.rows.map(row => ({

            oldSessionId: request.request.flashcardOldSessionId,
            question: row.question,
            answer: row.answer,
            status: row.status
        }))

        await this.flashcardSessionRowRepository.createRangeAsync(rows)

        this.logger.info(`CreateFRowsCommandHandler: Successfully created flashcard session rows for flashcard old session with Id ${request.request.flashcardOldSessionId}`)

        return
    }
}