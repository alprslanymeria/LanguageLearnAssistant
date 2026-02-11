// IMPORTS
import { inject, injectable } from "inversify"
import { ITranslateService } from "@/src/services/translate/ITranslateService"
import { ITranslationProvider } from "@/src/services/translate/ITranslationProvider"
import { TYPES } from "@/src/di/type"
import type { ITranslateFactory } from "@/src/services/translate/ITranslateFactory"
import type { TranslateOptions } from "./Translate"

@injectable()
export class TranslateService implements ITranslateService {

    // FIELDS
    private translateProvider: ITranslationProvider

    // CTOR
    constructor(

        @inject(TYPES.TranslateFactory)
        private readonly translateFactory: ITranslateFactory,

        @inject(TYPES.TranslateConfig)
        private readonly translateConfig: TranslateOptions

    ) {
        
        this.translateProvider = this.translateFactory.createStrategy(this.translateConfig.type)
    }

    async translateTextAsync(text: string, targetLanguageCode: string): Promise<string> {
        
        return await this.translateProvider.translateAsync(text, targetLanguageCode)
    }
}