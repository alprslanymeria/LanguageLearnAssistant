// IMPORTS
import { inject, injectable } from "inversify"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { ListeningCategoryDto, ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"
import { GetLCategoryCreateItemsQuery } from "./Query"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { LanguageRepository } from "@/src/infrastructure/persistence/repositories/LanguageRepository"
import { PracticeRepository } from "@/src/infrastructure/persistence/repositories/PracticeRepository"
import type { IListeningCategoryRepository } from "@/src/infrastructure/persistence/contracts/IListeningCategoryRepository"
import { TYPES } from "@/src/di/type"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"

@injectable()
export class GetLCategoryCreateItemsQueryHandler implements IQueryHandler<GetLCategoryCreateItemsQuery, ListeningCategoryWithDeckVideos[]> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly listeningCategoryRepository : IListeningCategoryRepository
    private readonly languageRepository : LanguageRepository
    private readonly practiceRepository : PracticeRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ListeningCategoryRepository) listeningCategoryRepository : IListeningCategoryRepository,
        @inject(TYPES.LanguageRepository) languageRepository : LanguageRepository,
        @inject(TYPES.PracticeRepository) practiceRepository : PracticeRepository
    ) {
        
        this.logger = logger
        this.listeningCategoryRepository = listeningCategoryRepository
        this.languageRepository = languageRepository
        this.practiceRepository = practiceRepository
    }

    async Handle(request: GetLCategoryCreateItemsQuery): Promise<ListeningCategoryWithDeckVideos[]> {
        
        // LOG MESSAGE
        this.logger.info(`GetLCategoryCreateItemsQueryHandler: Fetching listening categories for creating listening items`)

        // CHECK IF LANGUAGE EXISTS
        const languageExists = await this.languageRepository.existsByNameAsync(request.language)

        if(!languageExists) {

            this.logger.info(`GetLCategoryCreateItemsQueryHandler: No language found with name ${request.language}`)
            throw new NoLanguageFound()
        }

        // CHECK IF PRACTICE EXISTS
        const practiceExists = await this.practiceRepository.existsByNameAndLanguageIdAsync(request.practice, languageExists.id)

        if(!practiceExists) {

            this.logger.info(`GetLCategoryCreateItemsQueryHandler: No practice found with name ${request.practice} for language ${request.language}`)
            throw new NoPracticeFound()
        }

        const listeningCategories = await this.listeningCategoryRepository.getLCategoryCreateItemsAsync(request.userId, languageExists.id, practiceExists.id)

        const result : ListeningCategoryWithDeckVideos[] = listeningCategories.map( lc => ({

            id: lc.id,
            deckVideos: lc.deckVideos,
            listeningId: lc.id,
            name: lc.name
            
        }))

        return result
    }
    
}