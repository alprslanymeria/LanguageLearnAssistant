// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { GetWBookCreateItemsQuery } from "./Query"
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { PracticeRepository } from "@/src/infrastructure/persistence/repositories/PracticeRepository"
import { LanguageRepository } from "@/src/infrastructure/persistence/repositories/LanguageRepository"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetWBookCreateItemsQueryHandler implements IQueryHandler<GetWBookCreateItemsQuery, WritingBookDto[]> {

    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository
    private readonly languageRepository : LanguageRepository
    private readonly practiceRepository : PracticeRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository,
        @inject(TYPES.LanguageRepository) languageRepository : LanguageRepository,
        @inject(TYPES.PracticeRepository) practiceRepository : PracticeRepository

    ) {

        this.logger = logger
        this.writingBookRepository = writingBookRepository
        this.languageRepository = languageRepository
        this.practiceRepository = practiceRepository
        
    }
    
    async Handle(request: GetWBookCreateItemsQuery): Promise<WritingBookDto[]> {
        
        // LOG MESSAGE
        this.logger.info(`GetWBookCreateItemsQueryHandler: Fetching writing books for creating writing sessions`)

        // CHECK IF LANGUAGE EXISTS
        const languageExists = await this.languageRepository.existsByNameAsync(request.language)

        if(!languageExists) {

            this.logger.info(`GetWBookCreateItemsQueryHandler: No language found with name ${request.language}`)
            
            throw new NoLanguageFound()
        }

        // CHECK IF PRACTICE EXISTS
        const practiceExists = await this.practiceRepository.existsByNameAndLanguageIdAsync(request.practice, languageExists.id)

        if(!practiceExists) {

            this.logger.info(`GetWBookCreateItemsQueryHandler: No practice found with name ${request.practice} for language ${request.language}`)  
            throw new NoPracticeFound()
        }

        const writingBooks = await this.writingBookRepository.getWBookCreateItemsAsync(request.userId, languageExists.id, practiceExists.id)
    
        const result : WritingBookDto[] = writingBooks.map(wb => ({

            id: wb.id,
            writingId: wb.writingId,
            name: wb.name,
            imageUrl: wb.imageUrl,
            sourceUrl: wb.sourceUrl,
            leftColor: wb.leftColor
        }))

        return result
    }
}