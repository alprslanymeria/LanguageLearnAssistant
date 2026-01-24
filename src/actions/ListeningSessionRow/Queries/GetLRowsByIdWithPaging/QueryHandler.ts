// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IListeningSessionRowRepository } from "@/src/infrastructure/persistence/contracts/IListeningSessionRowRepository"
import { ListeningRowsResponse, ListeningSessionRowDto } from "@/src/actions/ListeningSessionRow/Response"
import { GetLRowsByIdWithPagingQuery } from "./Query"
import type { IListeningOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IListeningOldSessionRepository"
import { ListeningOldSessionNotFound } from "@/src/exceptions/NotFound"
import type { IListeningCategoryRepository } from "@/src/infrastructure/persistence/contracts/IListeningCategoryRepository"


@injectable()
export class GetLRowsByIdWithPagingQueryHandler implements IQueryHandler<GetLRowsByIdWithPagingQuery, ListeningRowsResponse> {

    // FIELDS
    private readonly logger : ILogger
    private readonly listeningSessionRowRepository : IListeningSessionRowRepository
    private readonly listeningOldSessionRepository : IListeningOldSessionRepository
    private readonly listeningCategoryRepository : IListeningCategoryRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ListeningSessionRowRepository) listeningSessionRowRepository : IListeningSessionRowRepository,
        @inject(TYPES.ListeningOldSessionRepository) listeningOldSessionRepository : IListeningOldSessionRepository,
        @inject(TYPES.ListeningCategoryRepository) listeningCategoryRepository : IListeningCategoryRepository
    ) {

        this.logger = logger
        this.listeningSessionRowRepository = listeningSessionRowRepository
        this.listeningOldSessionRepository = listeningOldSessionRepository
        this.listeningCategoryRepository = listeningCategoryRepository
    }
    
    async Handle(request: GetLRowsByIdWithPagingQuery): Promise<ListeningRowsResponse> {
        
        // GET OLD SESSION
        const oldSession = await this.listeningOldSessionRepository.getByIdAsync(request.oldSessionId)

        // FAST FAIL
        if(!oldSession) {

            this.logger.error(`GetLRowsByIdWithPagingQueryHandler: Listening old session with Id ${request.oldSessionId} not found!`)
            throw new ListeningOldSessionNotFound()
        }

        // GET ROWS
        const rows = await this.listeningSessionRowRepository.getListeningRowsByIdWithPagingAsync(
            request.oldSessionId,
            request.request.page,
            request.request.pageSize
        )

        // GET LISTENING BOOK ITEM
        const listeningCategoryItem = await this.listeningCategoryRepository.getByIdAsync(oldSession.categoryId)

        this.logger.info(`GetLRowsByIdWithPagingQueryHandler: Successfully retrieved listening session rows for listening old session with Id ${request.oldSessionId}`)

        const result : ListeningSessionRowDto[] = rows.items.map(row => ({

            listeningOldSessionId: row.oldSessionId,
            listenedSentence: row.listenedSentence,
            answer: row.answer,
            similarity: row.similarity.toNumber()
        }))

        const response : ListeningRowsResponse = {

            item: listeningCategoryItem!,
            contents: result,
            total: rows.totalCount
        }

        return response
    }
}