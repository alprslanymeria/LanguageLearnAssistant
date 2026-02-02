// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IDeckWordRepository } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { DeleteDWordItemByIdCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { DeckWordNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class DeleteDWordItemByIdCommandHandler implements ICommandHandler<DeleteDWordItemByIdCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly deckWordRepository : IDeckWordRepository
    private readonly cacheService: ICacheService

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

    async Handle(request: DeleteDWordItemByIdCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`DeleteDWordItemByIdCommandHandler: Deleting deck word item with Id ${request.id}`)

        const deckWord = await this.deckWordRepository.getByIdAsync(request.id)

        // FAST FAIL
        if(!deckWord) {

            this.logger.warn(`DeleteDWordItemByIdCommandHandler: Deck word item with Id ${request.id} not found!`)
            throw new DeckWordNotFound()
        }

        await this.deckWordRepository.deleteAsync(deckWord.id)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.deckWord.prefix)

        this.logger.info(`DeleteDWordItemByIdCommandHandler: Successfully deleted deck word item with Id ${request.id}`)

        return
    }
}