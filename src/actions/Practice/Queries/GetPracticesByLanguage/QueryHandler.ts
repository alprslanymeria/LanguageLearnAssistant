// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { PracticeDto } from "@/src/actions/Practice/Response"
import { GetPracticesByLanguageQuery } from "./Query"
import type { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import { NoLanguageFound } from "@/src/exceptions/NotFound"

@injectable()
export class GetPracticesByLanguageQueryHandler implements IQueryHandler<GetPracticesByLanguageQuery, PracticeDto[]> {

    // FIELDS
    private readonly logger : ILogger
    private readonly practiceRepository : IPracticeRepository
    private readonly languageRepository : ILanguageRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.PracticeRepository) practiceRepository : IPracticeRepository,
        @inject(TYPES.LanguageRepository) languageRepository : ILanguageRepository

    ) {

        this.logger = logger
        this.practiceRepository = practiceRepository
        this.languageRepository = languageRepository
    }


    async Handle(request: GetPracticesByLanguageQuery): Promise<PracticeDto[]> {

        const language = request.language.trim().toLowerCase()

        // LOG MESSAGE
        this.logger.info(`GetPracticesByLanguageQueryHandler: Fetching practices for language ${language}`)

        // CHECK IF LANGUAGE EXISTS
        const languageExists = await this.languageRepository.existsByNameAsync(language)

        // FAST FAIL
        if(!languageExists) {

            this.logger.info(`GetPracticesByLanguageQueryHandler: No language found with name ${language}`)
            throw new NoLanguageFound()
        }

        // GET PRACTICES
        const practices = await this.practiceRepository.getPracticesByLanguageAsync(language)

        this.logger.info(`GetPracticesByLanguageQueryHandler: Successfully fetched ${practices.length} practices for language ${language}`)

        const response: PracticeDto[] = practices.map(practice => ({

            languageId: practice.languageId,
            name: practice.name,
        }))

        return response
    }
    
}