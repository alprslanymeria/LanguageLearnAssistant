// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IReadingSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IReadingSessionRowRepository"
import { ReadingRowsResponse, ReadingSessionRowDto } from "@/src/actions/ReadingSessionRow/Response"
import { GetRRowsByIdWithPagingQuery } from "./Query"
import type { IReadingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IReadingOldSessionRepository"
import type { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { ReadingOldSessionNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetRRowsByIdWithPagingQueryHandler implements IQueryHandler<GetRRowsByIdWithPagingQuery, ReadingRowsResponse> {

    // FIELDS
    private readonly logger : ILogger
    private readonly readingSessionRowRepository : IReadingSessionRowRepository
    private readonly readingOldSessionRepository : IReadingOldSessionRepository
    private readonly readingBookRepository : IReadingBookRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingSessionRowRepository) readingSessionRowRepository : IReadingSessionRowRepository,
        @inject(TYPES.ReadingOldSessionRepository) readingOldSessionRepository : IReadingOldSessionRepository,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository

    ) {

        this.logger = logger
        this.readingSessionRowRepository = readingSessionRowRepository
        this.readingOldSessionRepository = readingOldSessionRepository
        this.readingBookRepository = readingBookRepository
    }
    
    async Handle(request: GetRRowsByIdWithPagingQuery): Promise<ReadingRowsResponse> {
        
        // GET OLD SESSION
        const oldSession = await this.readingOldSessionRepository.getByIdAsync(request.oldSessionId)

        // FAST FAIL
        if(!oldSession) {
            
            this.logger.error(`GetRRowsByIdWithPagingQueryHandler: Reading old session with Id ${request.oldSessionId} not found!`)
            throw new ReadingOldSessionNotFound()
        }

        // GET ROWS
        const rows = await this.readingSessionRowRepository.getReadingRowsByIdWithPagingAsync(
            request.oldSessionId,
            request.request.page,
            request.request.pageSize
        )

        // GET READING BOOK ITEM
        const readingBookItem = await this.readingBookRepository.getByIdAsync(oldSession.bookId)
        
        this.logger.info(`GetRRowsByIdWithPagingQueryHandler: Fetched reading book item for reading old session with Id ${request.oldSessionId}`)

        const result : ReadingSessionRowDto[] = rows.items.map(row => ({

            readingOldSessionId: row.oldSessionId,
            selectedSentence: row.selectedSentence,
            answer: row.answer,
            answerTranslate: row.answerTranslate,
            similarity: row.similarity.toNumber()
        }))

        const response : ReadingRowsResponse = {

            item: readingBookItem!,
            contents: result,
            total: rows.totalCount
        }

        return response
    }
    
}