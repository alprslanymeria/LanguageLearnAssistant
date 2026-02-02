// IMPORTS
import { inject, injectable } from 'inversify'
import { Storage, Bucket } from '@google-cloud/storage'
import { IStorageStrategy } from '@/src/infrastructure/storage/IStorageStrategy'
import { TYPES } from '@/src/di/type'
import { StorageType } from '@/src/infrastructure/storage/Storage'

@injectable()
export class GoogleCloudStorageStrategy implements IStorageStrategy {

    // FIELDS
    type: StorageType = 'gcloud'
    private readonly bucket: Bucket

    // CTOR
    constructor(
        
        @inject(TYPES.GoogleCloudClient) 
        private readonly storage: Storage,
        @inject(TYPES.BucketName)
        private readonly bucketName: string

    ) {

        this.bucket = this.storage.bucket(this.bucketName)
    }

    // UTILS
    async getPublicUrl(filePath: string): Promise<string> {

        return `https://storage.googleapis.com/${this.bucketName}/${filePath}`
    }

    async list(prefix?: string): Promise<string[]> {

        const options = prefix ? { prefix } : {}

        const [files] = await this.bucket.getFiles(options)

        return files.map(file => file.name)
    }

    async makePublic(filePath: string): Promise<void> {

        const file = this.bucket.file(filePath)

        await file.makePublic()
    }

    async makePrivate(filePath: string): Promise<void> {

        const file = this.bucket.file(filePath)

        await file.makePrivate()
    }

    // INTERFACE IMPLEMENTATION
    async upload(filePath: string, data: Buffer, contentType?: string): Promise<string> {

        const file = this.bucket.file(filePath)

        await file.save(data, {
            contentType: contentType ?? 'application/octet-stream',
            resumable: false
        })

        return filePath
    }

    async download(filePath: string): Promise<Buffer> {

        const file = this.bucket.file(filePath)

        const [contents] = await file.download()

        return contents
    }

    async delete(filePath: string): Promise<void> {

        const file = this.bucket.file(filePath)

        try {
            await file.delete()
        } catch (error: any) {
            if (error.code !== 404) throw error
        }
    }

    async deleteByPrefix(prefix: string): Promise<void> {

        const [files] = await this.bucket.getFiles({ prefix })

        await Promise.all(
            files.map(file => file.delete().catch(() => {}))
        )
    }

    async exists(filePath: string): Promise<boolean> {

        const file = this.bucket.file(filePath)

        const [exists] = await file.exists()

        return exists
    }

    async getUrl(filePath: string): Promise<string> {

        const file = this.bucket.file(filePath)

        const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000 // 15 minutes
        })

        return signedUrl
    }
}
