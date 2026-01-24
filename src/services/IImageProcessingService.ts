export interface IImageProcessingService {

    extractLeftSideColorAsync(imageFile: File): Promise<string>
}