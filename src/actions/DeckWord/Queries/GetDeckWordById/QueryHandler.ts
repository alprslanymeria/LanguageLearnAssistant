// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IDeckWordRepository } from "@/src/infrastructure/persistence/contracts/IDeckWordRepository"
import { DeckWordWithLanguageId } from "@/src/actions/DeckWord/Response"
import { GetDeckWordByIdQuery } from "./Query"
import { DeckWordNotFound } from "@/src/exceptions/NotFound"

@injectable()
export class GetDeckWordByIdQueryHandler implements IQueryHandler<GetDeckWordByIdQuery, DeckWordWithLanguageId> {

    // FIELDS
    private readonly logger : ILogger
    private readonly deckWordRepository : IDeckWordRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.DeckWordRepository) deckWordRepository : IDeckWordRepository

    ) {

        this.logger = logger
        this.deckWordRepository = deckWordRepository
        
    }


    async Handle(request: GetDeckWordByIdQuery): Promise<DeckWordWithLanguageId> {

        const id = request.id

        this.logger.info(`GetDeckWordByIdQueryHandler: Fetching deck word with Id ${id}`)

        const deckWord =  await this.deckWordRepository.getDeckWordItemByIdAsync(id)

        if(!deckWord) {

            this.logger.info(`GetDeckWordByIdQueryHandler: No deck word found with Id ${id}`)
            throw new DeckWordNotFound()
        }

        this.logger.info(`GetDeckWordByIdQueryHandler: Successfully fetched deck word with Id ${id}`)

        const response: DeckWordWithLanguageId = {

            flashcardCategoryId: deckWord.categoryId,
            question: deckWord.question,
            answer: deckWord.answer,
            languageId: deckWord.category.flashcard.language.id
        }

        return response
    }
}