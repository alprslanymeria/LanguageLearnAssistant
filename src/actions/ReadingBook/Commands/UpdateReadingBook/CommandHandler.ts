// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IReadingBookRepository, UpdateReadingBookData } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { UpdateReadingBookCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import type { IImageProcessingService } from "@/src/services/IImageProcessingService"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import { ReadingBookNotFound } from "@/src/exceptions/NotFound"
import { ReadingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"


@injectable()
export class UpdateReadingBookCommandHandler implements ICommandHandler<UpdateReadingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository
    private readonly cacheService: ICacheService
    private readonly entityVerificationService: IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.EntityVerificationService) entityVerificationService: IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.readingBookRepository = readingBookRepository;
        this.cacheService = cacheService;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }
    
    async Handle(request: UpdateReadingBookCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`UpdateReadingBookCommandHandler: Updating reading book with Id ${request.request.id}`)

        const existingReadingBook = await this.readingBookRepository.getByIdAsync(request.request.id)

        if(!existingReadingBook) {

            this.logger.error(`UpdateReadingBookCommandHandler: Reading book with Id ${request.request.id} not found!`)
            throw new ReadingBookNotFound()
        }

        // VERIFY OR CREATE READING
        const readingResult = await this.entityVerificationService.verifyOrCreateReadingAsync(

            request.request.readingId,
            request.request.userId,
            request.request.languageId
        )

        // FAST FAIL
        if (!readingResult.isSuccess) throw new ReadingResultNotSuccess()

        // STORE OLD FILE URLS FOR DELETION
        const oldImageUrl = existingReadingBook.imageUrl
        const oldSourceUrl = existingReadingBook.sourceUrl
        var newImageUrl
        var newSourceUrl
        var newLeftColor

        // UPDATE IMAGE IF NEW FILE PROVIDED
        if(request.request.imageFile) {

            this.logger.info(`UpdateReadingBookCommandHandler: Processing new image file for reading book with Id ${request.request.id}`)

            newImageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                request.request.imageFile,
                request.request.userId,
                `rbooks`
            )

            newLeftColor = await this.imageProcessingService.extractLeftSideColorAsync(request.request.imageFile)
        }

        // UPDATE SOURCE IF NEW FILE PROVIDED
        if(request.request.sourceFile) {

            this.logger.info(`UpdateReadingBookCommandHandler: Processing new source file for reading book with Id ${request.request.id}`)
            newSourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                request.request.sourceFile,
                request.request.userId,
                `rbooks`
            )
        }

        const data : UpdateReadingBookData = {

            name: request.request.name,
            readingId: readingResult.data!.id,
            imageUrl: newImageUrl,
            sourceUrl: newSourceUrl,
            leftColor: newLeftColor
        }

        const updatedId = await this.readingBookRepository.update(request.request.id, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.readingBook.prefix)

        // DELETE OLD FILES FROM STORAGE IF URLS CHANGED
        if(request.request.imageFile && oldImageUrl.toLowerCase() != newImageUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldImageUrl)
        }

        if(request.request.sourceFile && oldSourceUrl.toLowerCase() != newSourceUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldSourceUrl)
        }

        this.logger.info(`UpdateReadingBookCommandHandler: Successfully updated reading book with Id ${request.request.id}`)

        return updatedId

    }
}
