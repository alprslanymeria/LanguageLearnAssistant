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
import { NoPracticeFound, ReadingBookNotFound } from "@/src/exceptions/NotFound"
import { ReadingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"


@injectable()
export class UpdateReadingBookCommandHandler implements ICommandHandler<UpdateReadingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository
    private readonly cacheService: ICacheService
    private readonly practiceRepository : IPracticeRepository
    private readonly entityVerificationService: IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.PracticeRepository) practiceRepository : IPracticeRepository,
        @inject(TYPES.EntityVerificationService) entityVerificationService: IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.readingBookRepository = readingBookRepository;
        this.cacheService = cacheService;
        this.practiceRepository = practiceRepository;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }
    
    async Handle(request: UpdateReadingBookCommand): Promise<number> {

        // FORM DATA'S
        const id = Number(request.formData.get("id"))
        const name = request.formData.get("name")?.toString()!
        const userId = request.formData.get("userId")?.toString()!
        const languageId = Number(request.formData.get("languageId"))
        const imageFile = request.formData.get("imageFile") as File
        const sourceFile = request.formData.get("sourceFile") as File
        
        // LOG MESSAGE
        this.logger.info(`UpdateReadingBookCommandHandler: Updating reading book with Id ${id}`)

        const practice = await this.practiceRepository.existsByLanguageIdAsync(languageId)
        
        if (!practice) throw new NoPracticeFound()

        const existingReadingBook = await this.readingBookRepository.getByIdAsync(id)

        if(!existingReadingBook) {

            this.logger.error(`UpdateReadingBookCommandHandler: Reading book with Id ${id} not found!`)
            throw new ReadingBookNotFound()
        }

        // VERIFY OR CREATE READING
        const readingResult = await this.entityVerificationService.verifyOrCreateReadingAsync(

            practice.id,
            userId,
            languageId
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
        if(imageFile) {

            this.logger.info(`UpdateReadingBookCommandHandler: Processing new image file for reading book with Id ${id}`)

            newImageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                imageFile,
                userId,
                `rbooks`
            )

            newLeftColor = await this.imageProcessingService.extractLeftSideColorAsync(imageFile)
        }

        // UPDATE SOURCE IF NEW FILE PROVIDED
        if(sourceFile) {

            this.logger.info(`UpdateReadingBookCommandHandler: Processing new source file for reading book with Id ${id}`)
            newSourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                sourceFile,
                userId,
                `rbooks`
            )
        }

        const data : UpdateReadingBookData = {

            name: name,
            readingId: readingResult.data!.id,
            imageUrl: newImageUrl,
            sourceUrl: newSourceUrl,
            leftColor: newLeftColor
        }

        const updatedId = await this.readingBookRepository.update(id, data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.readingBook.prefix)

        // DELETE OLD FILES FROM STORAGE IF URLS CHANGED
        if(imageFile && oldImageUrl.toLowerCase() != newImageUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldImageUrl)
        }

        if(sourceFile && oldSourceUrl.toLowerCase() != newSourceUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldSourceUrl)
        }

        this.logger.info(`UpdateReadingBookCommandHandler: Successfully updated reading book with Id ${id}`)

        return updatedId

    }
}
