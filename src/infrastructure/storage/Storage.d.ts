export type StorageType = 'local' | 'gcloud'

export interface StorageOptions {
    
    type: StorageType
    basePath?: string
    bucketName?: string
}

export interface IStoragePath {

    path: string
    contentType: string
}