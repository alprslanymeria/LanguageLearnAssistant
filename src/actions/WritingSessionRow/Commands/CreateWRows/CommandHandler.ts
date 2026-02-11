// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IWritingSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IWritingSessionRowRepository"
import { CreateWRowsCommand } from "./Command"
import type { IWritingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IWritingOldSessionRepository"
import { WritingOldSessionNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateWRowsCommandHandler implements ICommandHandler<CreateWRowsCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingSessionRowRepository : IWritingSessionRowRepository
    private readonly writingOldSessionRepository : IWritingOldSessionRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingSessionRowRepository) writingSessionRowRepository : IWritingSessionRowRepository,
        @inject(TYPES.WritingOldSessionRepository) writingOldSessionRepository : IWritingOldSessionRepository
    ) {
        
        this.logger = logger;
        this.writingSessionRowRepository = writingSessionRowRepository;
        this.writingOldSessionRepository = writingOldSessionRepository;
    }
    
    async Handle(request: CreateWRowsCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`CreateWRowsCommandHandler: Creating writing session rows for writing old session with Id ${request.request.writingOldSessionId}`)

        const session = await this.writingOldSessionRepository.getByIdAsync(request.request.writingOldSessionId)

        // FAST FAIL
        if(!session) {

            this.logger.error(`CreateWRowsCommandHandler: Writing old session with Id ${request.request.writingOldSessionId} not found!`)
            throw new WritingOldSessionNotFound()
        }

        const rows = request.request.rows.map(row => ({

            oldSessionId: request.request.writingOldSessionId,
            selectedSentence: row.selectedSentence,
            answer: row.answer,
            answerTranslate: row.answerTranslate,
            similarity: row.similarity
        }))

        await this.writingSessionRowRepository.createRangeAsync(rows)

        this.logger.info(`CreateWRowsCommandHandler: Successfully created writing session rows for writing old session with Id ${request.request.writingOldSessionId}`)

        return
    }
}
