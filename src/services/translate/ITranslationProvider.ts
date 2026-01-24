// IMPORTS
import { TranslateType } from "@/src/services/translate/Translate"

export interface ITranslationProvider {

    type: TranslateType
    translateAsync(text: string, targetLanguageCode: string): Promise<string>
}