// IMPORTS
import { StorageType } from "@/src/infrastructure/storage/Storage"

// STRATEGY DESIGN PATTERN INTERFACE FOR STORAGE
export interface IStorageStrategy {

    type: StorageType
    upload(path: string, data: Buffer, contentType?: string): Promise<string>
    download(path: string): Promise<Buffer>
    delete(path: string): Promise<void>
    deleteByPrefix(prefix: string): Promise<void>
    exists(path: string): Promise<boolean>
    getUrl(path: string): Promise<string>
    list(prefix?: string): Promise<string[]>
}
