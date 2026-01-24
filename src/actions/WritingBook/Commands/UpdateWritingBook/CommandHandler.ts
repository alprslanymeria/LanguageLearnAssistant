// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IWritingBookRepository, UpdateWritingBookData } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { UpdateWritingBookCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import type { IImageProcessingService } from "@/src/services/IImageProcessingService"
import { WritingBookNotFound } from "@/src/exceptions/NotFound"
import { WritingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"


@injectable()
export class UpdateWritingBookCommandHandler implements ICommandHandler<UpdateWritingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository
    private readonly cacheService: ICacheService
    private readonly entityVerificationService: IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.EntityVerificationService) entityVerificationService: IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.writingBookRepository = writingBookRepository;
        this.cacheService = cacheService;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }
    
    async Handle(request: UpdateWritingBookCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`UpdateWritingBookCommandHandler: Updating writing book with Id ${request.request.id}`)

        const existingWritingBook = await this.writingBookRepository.getByIdAsync(request.request.id)

        if(!existingWritingBook) {
            
            this.logger.error(`UpdateWritingBookCommandHandler: Writing book with Id ${request.request.id} not found!`)
            throw new WritingBookNotFound()
        }

        // VERIFY OR CREATE WRITING
        const writingResult = await this.entityVerificationService.verifyOrCreateWritingAsync(
            
            request.request.writingId,
            request.request.userId,
            request.request.languageId
        )

        // FAST FAIL
        if(!writingResult.isSuccess) throw new WritingResultNotSuccess()

        // STORE OLD FIE URLS FOR DELETION
        const oldImageUrl = existingWritingBook.imageUrl
        const oldSourceUrl = existingWritingBook.sourceUrl
        var newImageUrl
        var newSourceUrl
        var newLeftColor

        // UPDATE IMAGE IF NEW FILE PROVIDED
        if(request.request.imageFile) {

            this.logger.info(`UpdateWritingBookCommandHandler: Processing new image file for writing book with Id ${request.request.id}`)

            newImageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                request.request.imageFile,
                request.request.userId,
                `wbooks`
            )

            newLeftColor = await this.imageProcessingService.extractLeftSideColorAsync(request.request.imageFile)
        }

        // UPDATE SOURCE IF NEW FILE PROVIDED
        if(request.request.sourceFile) {

            this.logger.info(`UpdateWritingBookCommandHandler: Processing new source file for writing book with Id ${request.request.id}`)

            newSourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                request.request.sourceFile,
                request.request.userId,
                `wbooks`
            )
        }

        const data : UpdateWritingBookData = {

            name: request.request.name,
            writingId: writingResult.data!.id,
            imageUrl: newImageUrl,
            sourceUrl: newSourceUrl,
            leftColor: newLeftColor
        }

        const updatedId = await this.writingBookRepository.update(request.request.id, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.writingBook.prefix)

        // DELETE OLD FILES FROM STORAGE IF URLS CHANGED
        if(request.request.imageFile && oldImageUrl.toLowerCase() != newImageUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldImageUrl)
        }

        if(request.request.sourceFile && oldSourceUrl.toLowerCase() != newSourceUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldSourceUrl)
        }

        this.logger.info(`UpdateWritingBookCommandHandler: Successfully updated writing book with Id ${updatedId}`)

        return updatedId
    }
}
