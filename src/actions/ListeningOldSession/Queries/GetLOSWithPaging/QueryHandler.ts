// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IListeningOldSessionRepository } from "@/src/infrastructure/persistence/contracts/IListeningOldSessionRepository"
import { ListeningOldSessionDto, ListeningOldSessionWithTotalCount } from "@/src/actions/ListeningOldSession/Response"
import { GetLOSWithPagingQuery } from "./Query"
import { createPagedResult, PagedResult } from "@/src/infrastructure/common/pagedResult"


@injectable()
export class GetLOSWithPagingQueryHandler implements IQueryHandler<GetLOSWithPagingQuery, PagedResult<ListeningOldSessionWithTotalCount>> {

    // FIELDS
    private readonly logger : ILogger
    private readonly listeningOldSessionRepository : IListeningOldSessionRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ListeningOldSessionRepository) listeningOldSessionRepository : IListeningOldSessionRepository

    ) {

        this.logger = logger
        this.listeningOldSessionRepository = listeningOldSessionRepository
        
    }

    async Handle(request: GetLOSWithPagingQuery): Promise<PagedResult<ListeningOldSessionWithTotalCount>> {
        
        // LOG MESSAGE
        this.logger.info(`GetLOSWithPagingQueryHandler: Fetching listening old sessions with paging for user!`)

        const {items, totalCount} = await this.listeningOldSessionRepository.getListeningOldSessionsWithPagingAsync(request.userId, request.request.page, request.request.pageSize)
    
        // MAP ITEMS TO LISTENING OLDSESSION DTO
        const listeningOldSessionDtos : ListeningOldSessionDto[] = items.map(los => ({

            listeningId: los.listeningId,
            listeningCategoryId: los.categoryId,
            rate: los.rate.toNumber(),
            createdAt: los.createdAt
        }))

        const response : ListeningOldSessionWithTotalCount = {

            listeningOldSessionDtos,
            totalCount
        }

        const result = createPagedResult<ListeningOldSessionWithTotalCount>([response], request.request, totalCount)
    
        return result
    }
}