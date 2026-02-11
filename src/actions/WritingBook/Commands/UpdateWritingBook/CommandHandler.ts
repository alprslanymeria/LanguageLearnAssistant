// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { UpdateWritingBookCommand } from "./Command"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import type { IImageProcessingService } from "@/src/services/IImageProcessingService"
import { NoPracticeFound, WritingBookNotFound } from "@/src/exceptions/NotFound"
import { WritingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"


@injectable()
export class UpdateWritingBookCommandHandler implements ICommandHandler<UpdateWritingBookCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository
    private readonly cacheService: ICacheService
    private readonly practiceRepository : IPracticeRepository
    private readonly entityVerificationService: IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.PracticeRepository) practiceRepository : IPracticeRepository,
        @inject(TYPES.EntityVerificationService) entityVerificationService: IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.writingBookRepository = writingBookRepository;
        this.cacheService = cacheService;
        this.practiceRepository = practiceRepository;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }
    
    async Handle(request: UpdateWritingBookCommand): Promise<void> {

        // FORM DATA'S
        const itemId = Number(request.formData.get("itemId"))
        const bookName = request.formData.get("bookName")?.toString()!
        const userId = request.formData.get("userId")?.toString()!
        const languageId = Number(request.formData.get("languageId"))
        const imageFile = request.formData.get("imageFile") as File
        const sourceFile = request.formData.get("sourceFile") as File
        const practice = request.formData.get("practice")?.toString()!
        
        // LOG MESSAGE
        this.logger.info(`UpdateWritingBookCommandHandler: Updating writing book with Id ${itemId}`)

        const isPracticeExists = await this.practiceRepository.getPracticeByLanguageIdAndNameAsync(languageId, practice)
        
        if (!isPracticeExists) throw new NoPracticeFound()

        const existingWritingBook = await this.writingBookRepository.getByIdAsync(itemId)

        if(!existingWritingBook) {
            
            this.logger.error(`UpdateWritingBookCommandHandler: Writing book with Id ${itemId} not found!`)
            throw new WritingBookNotFound()
        }

        // VERIFY OR CREATE WRITING
        const writingResult = await this.entityVerificationService.verifyOrCreateWritingAsync(
            
            isPracticeExists.id,
            userId,
            languageId
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
        if(imageFile && imageFile.size > 0) {

            this.logger.info(`UpdateWritingBookCommandHandler: Processing new image file for writing book with Id ${itemId}`)

            newImageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                imageFile,
                userId,
                `wbooks`
            )

            newLeftColor = await this.imageProcessingService.extractLeftSideColorAsync(imageFile)
        }

        // UPDATE SOURCE IF NEW FILE PROVIDED
        if(sourceFile && sourceFile.size > 0) {

            this.logger.info(`UpdateWritingBookCommandHandler: Processing new source file for writing book with Id ${itemId}`)

            newSourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                sourceFile,
                userId,
                `wbooks`
            )
        }

        const data = {

            name: bookName,
            writing: { connect: { id: writingResult.data!.id } },
            imageUrl: newImageUrl,
            sourceUrl: newSourceUrl,
            leftColor: newLeftColor
        }

        await this.writingBookRepository.updateAsync(itemId, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.writingBook.prefix)

        // DELETE OLD FILES FROM STORAGE IF URLS CHANGED
        if(imageFile && oldImageUrl.toLowerCase() != newImageUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldImageUrl)
        }

        if(sourceFile && oldSourceUrl.toLowerCase() != newSourceUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldSourceUrl)
        }

        this.logger.info(`UpdateWritingBookCommandHandler: Successfully updated writing book with Id ${itemId}`)

        return
    }
}
