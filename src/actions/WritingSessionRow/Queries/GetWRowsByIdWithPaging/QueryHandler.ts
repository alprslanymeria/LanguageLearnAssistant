// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IWritingSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IWritingSessionRowRepository"
import { WritingRowsResponse, WritingSessionRowDto } from "@/src/actions/WritingSessionRow/Response"
import { GetWRowsByIdWithPagingQuery } from "./Query"
import type { IWritingOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IWritingOldSessionRepository"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { WritingOldSessionNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetWRowsByIdWithPagingQueryHandler implements IQueryHandler<GetWRowsByIdWithPagingQuery, WritingRowsResponse> {

    // FIELDS
    private readonly logger : ILogger
    private readonly writingSessionRowRepository : IWritingSessionRowRepository
    private readonly writingOldSessionRepository : IWritingOldSessionRepository
    private readonly writingBookRepository : IWritingBookRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingSessionRowRepository) writingSessionRowRepository : IWritingSessionRowRepository,
        @inject(TYPES.WritingOldSessionRepository) writingOldSessionRepository : IWritingOldSessionRepository,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository
        
    ) {

        this.logger = logger
        this.writingSessionRowRepository = writingSessionRowRepository
        this.writingOldSessionRepository = writingOldSessionRepository
        this.writingBookRepository = writingBookRepository
        
    }
    
    async Handle(request: GetWRowsByIdWithPagingQuery): Promise<WritingRowsResponse> {
        
        // GET OLD SESSION
        const oldSession = await this.writingOldSessionRepository.getByIdAsync(request.oldSessionId)

        // FAST FAIL
        if(!oldSession) {
            
            this.logger.error(`GetWRowsByIdWithPagingQueryHandler: Writing old session with Id ${request.oldSessionId} not found!`)
            throw new WritingOldSessionNotFound()
        }

        // GET ROWS
        const rows = await this.writingSessionRowRepository.getWritingRowsByIdWithPagingAsync(
            request.oldSessionId,
            request.request.page,
            request.request.pageSize
        )

        // GET WRITING BOOK ITEM
        const writingBookItem = await this.writingBookRepository.getByIdAsync(oldSession.bookId)

        this.logger.info(`GetWRowsByIdWithPagingQueryHandler: Fetched writing book item for writing old session with Id ${request.oldSessionId}`)

        const result : WritingSessionRowDto[] = rows.items.map(row => ({

            id: row.id,
            writingOldSessionId: row.oldSessionId,
            selectedSentence: row.selectedSentence,
            answer: row.answer,
            answerTranslate: row.answerTranslate,
            similarity: row.similarity.toNumber()
        }))

        const response : WritingRowsResponse = {

            item: writingBookItem!,
            contents: result,
            total: rows.totalCount
        }

        return response
    }
}