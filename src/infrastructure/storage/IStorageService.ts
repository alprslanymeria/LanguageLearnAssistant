// FACADE DESIGN PATTERN INTERFACE FOR STORAGE
export interface IStorageService {
    
    uploadFile(path: string, data: Buffer, contentType?: string): Promise<string>
    downloadFile(path: string): Promise<Buffer>
    deleteFile(path: string): Promise<void>
    deleteFilesByPrefix(prefix: string): Promise<void>
    fileExists(path: string): Promise<boolean>
    getFileUrl(path: string): Promise<string>
    listFiles(prefix?: string): Promise<string[]>
    withUpload<T>(path: string, data: Buffer, action: () => Promise<T>): Promise<T>
}
