// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IReadingSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IReadingSessionRowRepository"
import { CreateRRowsCommand } from "./Command"
import type { IReadingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IReadingOldSessionRepository"
import { ReadingOldSessionNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateRRowsCommandHandler implements ICommandHandler<CreateRRowsCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingSessionRowRepository : IReadingSessionRowRepository
    private readonly readingOldSessionRepository : IReadingOldSessionRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingSessionRowRepository) readingSessionRowRepository : IReadingSessionRowRepository,
        @inject(TYPES.ReadingOldSessionRepository) readingOldSessionRepository : IReadingOldSessionRepository
    ) {
        
        this.logger = logger
        this.readingSessionRowRepository = readingSessionRowRepository
        this.readingOldSessionRepository = readingOldSessionRepository
    }
    
    async Handle(request: CreateRRowsCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`CreateRRowsCommandHandler: Creating reading session rows for reading old session with Id ${request.request.readingOldSessionId}`)

        const session = await this.readingOldSessionRepository.getByIdAsync(request.request.readingOldSessionId)

        // FAST FAIL
        if(!session) {

            this.logger.error(`CreateRRowsCommandHandler: Reading old session with Id ${request.request.readingOldSessionId} not found!`)
            throw new ReadingOldSessionNotFound()
        }

        const rows = request.request.rows.map(row => ({

            oldSessionId: request.request.readingOldSessionId,
            selectedSentence: row.selectedSentence,
            answer: row.answer,
            answerTranslate: row.answerTranslate,
            similarity: row.similarity
        }))

        await this.readingSessionRowRepository.createRangeAsync(rows)

        this.logger.info(`CreateRRowsCommandHandler: Successfully created reading session rows for reading old session with Id ${request.request.readingOldSessionId}`)

        return
    }
}
