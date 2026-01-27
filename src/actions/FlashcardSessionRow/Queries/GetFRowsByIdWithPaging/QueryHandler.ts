// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IFlashcardSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardSessionRowRepository"
import { FlashcardRowsResponse, FlashcardSessionRowDto } from "@/src/actions/FlashcardSessionRow/Response"
import { GetFWordsByIdWithPagingQuery } from "./Query"
import type { IFlashcardOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardOldSessionRepository"
import { FlashcardOldSessionNotFound } from "@/src/exceptions/NotFound"
import type { IFlashcardCategoryRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardCategoryRepository"


@injectable()
export class GetFWordsByIdWithPagingQueryHandler implements IQueryHandler<GetFWordsByIdWithPagingQuery, FlashcardRowsResponse> {

    // FIELDS
    private readonly logger : ILogger
    private readonly flashcardSessionRowRepository : IFlashcardSessionRowRepository
    private readonly flashcardOldSessionRepository : IFlashcardOldSessionRepository
    private readonly flashcardCategoryRepository : IFlashcardCategoryRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.FlashcardSessionRowRepository) flashcardSessionRowRepository : IFlashcardSessionRowRepository,
        @inject(TYPES.FlashcardOldSessionRepository) flashcardOldSessionRepository : IFlashcardOldSessionRepository,
        @inject(TYPES.FlashcardCategoryRepository) flashcardCategoryRepository : IFlashcardCategoryRepository

    ) {

        this.logger = logger
        this.flashcardSessionRowRepository = flashcardSessionRowRepository
        this.flashcardOldSessionRepository = flashcardOldSessionRepository
        this.flashcardCategoryRepository = flashcardCategoryRepository
    }

    async Handle(request: GetFWordsByIdWithPagingQuery): Promise<FlashcardRowsResponse> {
        
        // GET OLD SESSION
        const oldSession = await this.flashcardOldSessionRepository.getByIdAsync(request.oldSessionId)

        // FAST FAIL
        if(!oldSession) {

            this.logger.error(`GetFWordsByIdWithPagingQueryHandler: Flashcard old session with Id ${request.oldSessionId} not found!`)
            throw new FlashcardOldSessionNotFound()
        }

        // GET ROWS
        const rows = await this.flashcardSessionRowRepository.getFlashcardRowsByIdWithPagingAsync(
            request.oldSessionId,
            request.request.page,
            request.request.pageSize
        )

        // GET FLASHCARD CATEGORY ITEM
        const flashcardCategoryItem = await this.flashcardCategoryRepository.getByIdWithDeckWordsAsync(oldSession.categoryId)

        this.logger.info(`GetFWordsByIdWithPagingQueryHandler: Successfully fetched flashcard session rows for flashcard old session with Id ${request.oldSessionId}`)

        const result : FlashcardSessionRowDto[] = rows.items.map(row => ({

            id: row.id,
            flashcardOldSessionId: row.oldSessionId,
            question: row.question,
            answer: row.answer,
            status: row.status
        }))

        const response: FlashcardRowsResponse = {

            item: flashcardCategoryItem!,
            contents: result,
            total: rows.totalCount
        }

        return response
    }
    
}
