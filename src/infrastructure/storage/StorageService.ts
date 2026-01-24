// IMPORTS
import { inject, injectable } from 'inversify'
import { IStorageService } from '@/src/infrastructure/storage/IStorageService'
import { IStorageStrategy } from '@/src/infrastructure/storage/IStorageStrategy'
import type { IStorageFactory } from '@/src/infrastructure/storage/IStorageFactory'
import { TYPES } from '@/src/di/type'

@injectable()
export class StorageService implements IStorageService {

    // FIELDS
    private storageStrategy: IStorageStrategy

    // CTOR
    constructor(

        @inject(TYPES.StorageFactory)
        private readonly storageFactory: IStorageFactory
    
    ) {

        this.storageStrategy = this.storageFactory.createStrategy("gcloud")
    }


    // INTERFACE IMPLEMENTATION

    async uploadFile(path: string, data: Buffer, contentType?: string): Promise<string> {

        return await this.storageStrategy.upload(path, data, contentType)
    }

    async downloadFile(path: string): Promise<Buffer> {

        return await this.storageStrategy.download(path)
    }

    async deleteFile(path: string): Promise<void> {

        await this.storageStrategy.delete(path)
    }

    async deleteFilesByPrefix(prefix: string): Promise<void> {

        await this.storageStrategy.deleteByPrefix(prefix)
    }

    async fileExists(path: string): Promise<boolean> {

        return await this.storageStrategy.exists(path)
    }

    async getFileUrl(path: string): Promise<string> {

        return await this.storageStrategy.getUrl(path)
    }

    async listFiles(prefix?: string): Promise<string[]> {

        return await this.storageStrategy.list(prefix)
    }

    async withUpload<T>(

        path: string, 
        data: Buffer, 
        action: () => Promise<T>

    ): Promise<T> {

        await this.uploadFile(path, data)
        
        try {

            return await action()

        } catch (error) {
            
            // ROLLBACK UPLOAD ON ERROR
            await this.deleteFile(path)
            throw error
        }
    }
}
