export interface ITranslateService {

    translateTextAsync(text: string, targetLanguageCode: string): Promise<string>
}