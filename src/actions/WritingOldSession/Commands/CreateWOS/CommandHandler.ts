// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { CreateWritingOldSessionData, IWritingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IWritingOldSessionRepository"
import { CreateWOSCommand } from "./Command"
import type { IWritingRepository } from "@/src/infrastructure/persistence/contracts/IWritingRepository"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { WritingBookNotFound, WritingNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateWOSCommandHandler implements ICommandHandler<CreateWOSCommand, string> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingOldSessionRepository : IWritingOldSessionRepository
    private readonly writingRepository : IWritingRepository
    private readonly writingBookRepository : IWritingBookRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingOldSessionRepository) writingOldSessionRepository : IWritingOldSessionRepository,
        @inject(TYPES.WritingRepository) writingRepository : IWritingRepository,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository
        
    ) {
        
        this.logger = logger;
        this.writingOldSessionRepository = writingOldSessionRepository;
        this.writingRepository = writingRepository;
        this.writingBookRepository = writingBookRepository;
    }
    
    async Handle(request: CreateWOSCommand): Promise<string> {
        
        // LOG MESSAGE
        this.logger.info(`CreateWOSCommandHandler: Creating writing old session for user!`)

        const writing = await this.writingRepository.getByIdAsync(request.request.writingId)

        // FAST FAIL
        if(!writing) {

            this.logger.error(`CreateWOSCommandHandler: Writing with Id ${request.request.writingId} not found!`)
            
            throw new WritingNotFound()
        }

        const writingBook = await this.writingBookRepository.getByIdAsync(request.request.writingBookId)

        // FAST FAIL
        if(!writingBook) {

            this.logger.error(`CreateWOSCommandHandler: Writing book with Id ${request.request.writingBookId} not found!`)
            
            throw new WritingBookNotFound()
        }

        const data : CreateWritingOldSessionData = {

            oldSessionId: request.request.id,
            writingId: request.request.writingId,
            bookId: request.request.writingBookId,
            rate: request.request.rate
        }

        const createdId = await this.writingOldSessionRepository.createAsync(data)

        this.logger.info(`CreateWOSCommandHandler: Successfully created writing old session with Id ${createdId} for user!`)

        return createdId
    }
}
