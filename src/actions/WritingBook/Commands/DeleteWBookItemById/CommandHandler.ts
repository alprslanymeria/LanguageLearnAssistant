// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { DeleteWBookItemByIdCommand } from "./Command"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { WritingBookNotFound } from "@/src/exceptions/NotFound"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"


@injectable()
export class DeleteWBookItemByIdCommandHandler implements ICommandHandler<DeleteWBookItemByIdCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository
    private readonly cacheService: ICacheService
    private readonly fileStorageHelper: IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper: IFileStorageHelper
    ) {
        
        this.logger = logger;
        this.writingBookRepository = writingBookRepository;
        this.cacheService = cacheService;
        this.fileStorageHelper = fileStorageHelper;
    }
    
    async Handle(request: DeleteWBookItemByIdCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`DeleteWBookItemByIdCommandHandler: Deleting writing book item with Id ${request.id}`)

        const writingBook = await this.writingBookRepository.getByIdAsync(request.id)

        // FAST FAIL
        if(!writingBook) {

            this.logger.warn(`DeleteWBookItemByIdCommandHandler: Writing book item with Id ${request.id} not found!`)
            throw new WritingBookNotFound()
        }

        // STORE FILE PATHS BEFORE DELETION
        const imageUrl = writingBook.imageUrl
        const sourceUrl = writingBook.sourceUrl

        await this.writingBookRepository.deleteAsync(request.id)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.writingBook.prefix)

        this.logger.info(`DeleteWBookItemByIdCommandHandler: Deleted writing book item with Id ${request.id}`)

        // DELETE FILES FROM STORAGE AFTER DATABASE DELETION
        await this.fileStorageHelper.deleteFileFromStorageAsync(imageUrl)
        await this.fileStorageHelper.deleteFileFromStorageAsync(sourceUrl)

        return
    }
}
