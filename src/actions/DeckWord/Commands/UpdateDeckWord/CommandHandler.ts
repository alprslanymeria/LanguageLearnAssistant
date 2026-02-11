// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IDeckWordRepository } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { UpdateDeckWordCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { DeckWordNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class UpdateDeckWordCommandHandler implements ICommandHandler<UpdateDeckWordCommand> {
    
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

    async Handle(request: UpdateDeckWordCommand): Promise<void> {

        // FORM DATA'S
        const itemId = Number(request.formData.get("itemId"))
        const categoryId = Number(request.formData.get("categoryId"))
        const word = request.formData.get("word")?.toString()!
        const answer = request.formData.get("answer")?.toString()!
        
        // LOG MESSAGE
        this.logger.info(`UpdateDeckWordCommandHandler: Updating deck word with Id ${itemId}`)

        const existingDeckWord = await this.deckWordRepository.getByIdAsync(itemId)

        if(!existingDeckWord) {

            this.logger.error(`UpdateDeckWordCommandHandler: Deck word with Id ${itemId} not found!`)
            throw new DeckWordNotFound()
        }

        const data = {

            category: { connect: { id: categoryId } },
            question: word,
            answer: answer
        }

        await this.deckWordRepository.updateAsync(itemId, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.deckWord.prefix)

        this.logger.info(`UpdateDeckWordCommandHandler: Successfully updated deck word with Id ${itemId}`)

        return
    }
}