// IMPORTS
import { ITranslationProvider } from "@/src/services/translate/ITranslationProvider"
import { TranslateType } from "@/src/services/translate/Translate"

export interface ITranslateFactory {

    createStrategy(type: TranslateType): ITranslationProvider
}