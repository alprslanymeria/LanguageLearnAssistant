// IMPORTS
import { inject, injectable } from "inversify"
import { IFileStorageHelper } from "./IFileStorageHelper"
import type { IStorageService } from "@/src/infrastructure/storage/IStorageService"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { TYPES } from "@/src/di/type"

@injectable()
export class FileStorageHelper implements IFileStorageHelper {

    // FIELDS
    private readonly logger : ILogger
    private readonly storageService: IStorageService
    
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.StorageService) storageService: IStorageService

    ) {
        this.logger = logger;
        this.storageService = storageService;
    }


    async uploadFileToStorageAsync(file: File, userId: string, folderName: string): Promise<string> {

        const fileName = `${userId}/${folderName}/${Date.now()}_${file.name}`

        const arrayBuffer = await file.arrayBuffer()

        const fileUrl = await this.storageService.uploadFile(fileName, Buffer.from(arrayBuffer), file.type)

        this.logger.info(`FileStorageHelper: Uploaded file for user ${userId} to ${fileUrl}`)

        return fileUrl
    }

    async deleteFileFromStorageAsync(fileUrl: string): Promise<void> {
        
        if(!fileUrl) return

        try {

            const fileExists = await this.storageService.fileExists(fileUrl)

            if(!fileExists) return

            await this.storageService.deleteFile(fileUrl)

            this.logger.info(`FileStorageHelper: Deleted file at ${fileUrl}`)
            
        } catch (error) {

            this.logger.error(`FileStorageHelper: Error deleting file at ${fileUrl} - ${(error as Error).message}`)
            
        }

    }
}