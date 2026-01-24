export interface IFileStorageHelper { 

    uploadFileToStorageAsync(file: File, userId: string, folderName: string ): Promise<string>

    deleteFileFromStorageAsync(fileUrl: string): Promise<void>
}