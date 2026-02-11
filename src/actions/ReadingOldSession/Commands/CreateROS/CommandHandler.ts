// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IReadingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IReadingOldSessionRepository"
import { CreateROSCommand } from "./Command"
import type { IReadingRepository } from "@/src/infrastructure/persistence/contracts/IReadingRepository"
import type { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { ReadingBookNotFound, ReadingNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateROSCommandHandler implements ICommandHandler<CreateROSCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingOldSessionRepository : IReadingOldSessionRepository
    private readonly readingRepository: IReadingRepository
    private readonly readingBookRepository: IReadingBookRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingOldSessionRepository) readingOldSessionRepository : IReadingOldSessionRepository,
        @inject(TYPES.ReadingRepository) readingRepository: IReadingRepository,
        @inject(TYPES.ReadingBookRepository) readingBookRepository: IReadingBookRepository
    ) {
        
        this.logger = logger;
        this.readingOldSessionRepository = readingOldSessionRepository;
        this.readingRepository = readingRepository;
        this.readingBookRepository = readingBookRepository;
    }
    
    async Handle(request: CreateROSCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`CreateROSCommandHandler: Creating reading old session for user!`)

        const reading = await this.readingRepository.getByIdAsync(request.request.readingId)

        // FAST FAIL
        if(!reading) {

            this.logger.error(`CreateROSCommandHandler: Reading with Id ${request.request.readingId} not found!`)
            
            throw new ReadingNotFound()
        }

        const readingBook = await this.readingBookRepository.getByIdAsync(request.request.readingBookId)

        // FAST FAIL
        if(!readingBook) {

            this.logger.error(`CreateROSCommandHandler: Reading book with Id ${request.request.readingBookId} not found!`)
            
            throw new ReadingBookNotFound()
        }

        const data = {

            oldSessionId: request.request.id,
            reading: { connect: { id: request.request.readingId } },
            book: { connect: { id: request.request.readingBookId } },
            rate: request.request.rate
        }

        await this.readingOldSessionRepository.createAsync(data)

        this.logger.info(`CreateROSCommandHandler: Successfully created reading old session for user!`)
    }
}