// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IListeningSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IListeningSessionRowRepository"
import { CreateLRowsCommand } from "./Command"
import type { IListeningOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IListeningOldSessionRepository"
import { ListeningOldSessionNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateLRowsCommandHandler implements ICommandHandler<CreateLRowsCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly listeningSessionRowRepository : IListeningSessionRowRepository
    private readonly listeningOldSessionRepository : IListeningOldSessionRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ListeningSessionRowRepository) listeningSessionRowRepository : IListeningSessionRowRepository,
        @inject(TYPES.ListeningOldSessionRepository) listeningOldSessionRepository : IListeningOldSessionRepository

    ) {
        
        this.logger = logger;
        this.listeningSessionRowRepository = listeningSessionRowRepository;
        this.listeningOldSessionRepository = listeningOldSessionRepository;
    }
    
    async Handle(request: CreateLRowsCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`CreateLRowsCommandHandler: Creating listening session rows for listening old session with Id ${request.request.listeningOldSessionId}`)
    
        const session = await this.listeningOldSessionRepository.getByIdAsync(request.request.listeningOldSessionId)
    
        // FAST FAIL
        if(!session) {

            this.logger.error(`CreateLRowsCommandHandler: Listening old session with Id ${request.request.listeningOldSessionId} not found!`)
            throw new ListeningOldSessionNotFound()
        }

        const rows = request.request.rows.map(row => ({

            oldSessionId: request.request.listeningOldSessionId,
            listenedSentence: row.listenedSentence,
            answer: row.answer,
            similarity: row.similarity
        }))

        await this.listeningSessionRowRepository.createRangeAsync(rows)

        this.logger.info(`CreateLRowsCommandHandler: Successfully created listening session rows for listening old session with Id ${request.request.listeningOldSessionId}`)

        return
    }
}