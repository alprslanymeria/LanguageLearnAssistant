// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IDeckWordRepository, UpdateDeckWordData } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { UpdateDeckWordCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { DeckWordNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class UpdateDeckWordCommandHandler implements ICommandHandler<UpdateDeckWordCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly cacheService: ICacheService
    private readonly deckWordRepository : IDeckWordRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.DeckWordRepository) deckWordRepository : IDeckWordRepository
    
    ) {
        
        this.logger = logger;
        this.cacheService = cacheService;
        this.deckWordRepository = deckWordRepository;
    }

    async Handle(request: UpdateDeckWordCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`UpdateDeckWordCommandHandler: Updating deck word with Id ${request.request.id}`)

        const existingDeckWord = await this.deckWordRepository.getByIdAsync(request.request.id)

        if(!existingDeckWord) {

            this.logger.error(`UpdateDeckWordCommandHandler: Deck word with Id ${request.request.id} not found!`)
            throw new DeckWordNotFound()
        }

        const data : UpdateDeckWordData = {

            categoryId: request.request.flashcardCategoryId,
            question: request.request.question,
            answer: request.request.answer
        }

        const updatedId = await this.deckWordRepository.update(request.request.id, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.deckWord.prefix)

        this.logger.info(`UpdateDeckWordCommandHandler: Successfully updated deck word with Id ${request.request.id}`)

        return updatedId
    }
}