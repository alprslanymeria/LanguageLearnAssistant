// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IListeningOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IListeningOldSessionRepository"
import { CreateLOSCommand } from "./Command"
import type { IListeningRepository } from "@/src/infrastructure/persistence/contracts/IListeningRepository"
import type { IListeningCategoryRepository } from "@/src/infrastructure/persistence/contracts/IListeningCategoryRepository"
import { ListeningCategoryNotFound, ListeningNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateLOSCommandHandler implements ICommandHandler<CreateLOSCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly listeningOldSessionRepository : IListeningOldSessionRepository
    private readonly listeningRepository: IListeningRepository
    private readonly listeningCategoryRepository: IListeningCategoryRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ListeningOldSessionRepository) listeningOldSessionRepository : IListeningOldSessionRepository,
        @inject(TYPES.ListeningRepository) listeningRepository: IListeningRepository,
        @inject(TYPES.ListeningCategoryRepository) listeningCategoryRepository: IListeningCategoryRepository
    
    ) {
        
        this.logger = logger;
        this.listeningOldSessionRepository = listeningOldSessionRepository;
        this.listeningRepository = listeningRepository;
        this.listeningCategoryRepository = listeningCategoryRepository;
    }
    
    async Handle(request: CreateLOSCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`CreateLOSCommandHandler: Creating listening old session for user!`)

        const listening = await this.listeningRepository.getByIdAsync(request.request.listeningId)

        // FAST FAIL
        if(!listening) {

            this.logger.error(`CreateLOSCommandHandler: Listening with Id ${request.request.listeningId} not found!`)
            throw new ListeningNotFound()
        }

        const listeningCategory = await this.listeningCategoryRepository.getByIdAsync(request.request.listeningCategoryId)

        // FAST FAIL
        if(!listeningCategory) {

            this.logger.error(`CreateLOSCommandHandler: Listening category with Id ${request.request.listeningCategoryId} not found!`)
            throw new ListeningCategoryNotFound()
        }

        const data = {

            oldSessionId: request.request.id,
            listening: {connect: {id: request.request.listeningId}},
            category: {connect: {id: request.request.listeningCategoryId}},
            rate: request.request.rate
        }

        await this.listeningOldSessionRepository.createAsync(data)

        this.logger.info(`CreateLOSCommandHandler: Successfully created listening old session for user!`)
        
        return
    }
}