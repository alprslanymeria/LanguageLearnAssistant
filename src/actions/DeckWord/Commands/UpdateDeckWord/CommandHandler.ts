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

        // FORM DATA'S
        const id = Number(request.formData.get("id"))
        const flashcardCategoryId = Number(request.formData.get("flashcardCategoryId"))
        const question = request.formData.get("question")?.toString()!
        const answer = request.formData.get("answer")?.toString()!
        
        // LOG MESSAGE
        this.logger.info(`UpdateDeckWordCommandHandler: Updating deck word with Id ${id}`)

        const existingDeckWord = await this.deckWordRepository.getByIdAsync(id)

        if(!existingDeckWord) {

            this.logger.error(`UpdateDeckWordCommandHandler: Deck word with Id ${id} not found!`)
            throw new DeckWordNotFound()
        }

        const data : UpdateDeckWordData = {

            categoryId: flashcardCategoryId,
            question: question,
            answer: answer
        }

        const updatedId = await this.deckWordRepository.update(id, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.deckWord.prefix)

        this.logger.info(`UpdateDeckWordCommandHandler: Successfully updated deck word with Id ${id}`)

        return updatedId
    }
}