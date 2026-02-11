// IMPORTS
import { inject, injectable } from "inversify"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { GetLanguagesQuery } from "@/src/actions/Language/Queries/GetLanguages/Query"
import { LanguageDto } from "@/src/actions/Language/Response"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { TYPES } from "@/src/di/type"
import type { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"

@injectable()
export class GetLanguagesQueryHandler implements IQueryHandler<GetLanguagesQuery, LanguageDto[]> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly languageRepository : ILanguageRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.LanguageRepository) languageRepository : ILanguageRepository
    
    ) {
        
        this.logger = logger
        this.languageRepository = languageRepository
    }
    
    async Handle(request: GetLanguagesQuery): Promise<LanguageDto[]> {
        
        // LOG MESSAGE
        this.logger.info("GetLanguagesQueryHandler: Handling GetLanguagesQuery")

        // GET LANGUAGES FROM REPOSITORY
        const languages = await this.languageRepository.getAllAsync()

        this.logger.info(`languages: ${JSON.stringify(languages)}`)

        this.logger.info(`GetLanguagesQueryHandler: Retrieved ${languages.length} languages from repository`)

        // MAP TO RESPONSE DTO
        const response: LanguageDto[] = languages.map(lang => ({

            id: lang.id,
            name: lang.name!,
            imageUrl: lang.imageUrl!
        }))

        return response
    }
}