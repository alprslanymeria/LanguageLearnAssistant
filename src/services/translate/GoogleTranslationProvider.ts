// IMPORTS
import { inject, injectable } from "inversify"
import { v2 } from "@google-cloud/translate"
import { ITranslationProvider } from "@/src/services/translate/ITranslationProvider"
import { TranslateType } from "@/src/services/translate/Translate"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"


@injectable()
export class GoogleTranslationProvider implements ITranslationProvider {

    // FIELDS
    type: TranslateType = 'google'
    private readonly logger: ILogger

    constructor(

        @inject(TYPES.GoogleTranslationProvider)
        private readonly googleTranslateClient: v2.Translate,

        @inject(TYPES.Logger) logger: ILogger

    ) {
        this.logger = logger
    }

    async translateAsync(text: string, targetLanguageCode: string): Promise<string> {

        // LOG MESSAGE
        this.logger.info(`Translating text to ${targetLanguageCode} using Google Translation API.`)

        const [translatedText] = await this.googleTranslateClient.translate(text, targetLanguageCode)

        this.logger.info(`Translation completed.`)

        return translatedText
        
    }
}