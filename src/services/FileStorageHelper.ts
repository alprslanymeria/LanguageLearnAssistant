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

        const editedFileUrl = `https://storage.googleapis.com/create-items/${fileUrl}`

        return editedFileUrl
    }

    async deleteFileFromStorageAsync(fileUrl: string): Promise<void> {
        
        if(!fileUrl) return

        // EXTRACT FILE PATH FROM URL
        // Remove domain and bucket name to get relative path
        // https://storage.googleapis.com/create-items/user/folder/file -> user/folder/file
        const filePath = fileUrl.replace("https://storage.googleapis.com/create-items/", "")

        try {

            this.logger.info(`FileStorageHelper: Deleting file at ${filePath}`)

            const fileExists = await this.storageService.fileExists(filePath)

            this.logger.info(`FileStorageHelper: File exists at ${filePath}: ${fileExists}`)

            if(!fileExists) return

            await this.storageService.deleteFile(filePath)

            this.logger.info(`FileStorageHelper: Deleted file at ${filePath}`)
            
        } catch (error) {

            this.logger.error(`FileStorageHelper: Error deleting file at ${filePath} - ${(error as Error).message}`)
            
        }

    }
}