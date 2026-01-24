// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { WritingBookWithLanguageId } from "@/src/actions/WritingBook/Response"
import { GetWritingBookByIdQuery } from "./Query"
import { WritingBookNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetWritingBookByIdQueryHandler implements IQueryHandler<GetWritingBookByIdQuery, WritingBookWithLanguageId> {

    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository

    ) {

        this.logger = logger
        this.writingBookRepository = writingBookRepository
        
    }

    async Handle(request: GetWritingBookByIdQuery): Promise<WritingBookWithLanguageId> {
        
        const id = request.id

        this.logger.info(`GetWritingBookByIdQueryHandler: Fetching writing book with Id ${id}`)

        const writingBook =  await this.writingBookRepository.getWritingBookItemByIdAsync(id)

        if(!writingBook) {

            this.logger.info(`GetWritingBookByIdQueryHandler: No writing book found with Id ${id}`)
            throw new WritingBookNotFound()
        }

        this.logger.info(`GetWritingBookByIdQueryHandler: Successfully fetched writing book with Id ${id}`)

        const response: WritingBookWithLanguageId = {

            writingId: writingBook.writingId,
            name: writingBook.name,
            imageUrl: writingBook.imageUrl,
            sourceUrl: writingBook.sourceUrl,
            leftColor: writingBook.leftColor,
            languageId: writingBook.writing.language.id
        }

        return response
    }
}