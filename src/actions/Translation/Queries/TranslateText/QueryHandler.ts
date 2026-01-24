// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { TranslateTextResponse } from "@/src/actions/Translation/Response"
import { TranslateTextQuery } from "./Query"
import type { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import type { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import type { ITranslationProvider } from "@/src/services/translate/ITranslationProvider"
import { InvalidPracticeType, UncertainTargetLanguage } from "@/src/exceptions/invalid"


@injectable()
export class TranslateTextQueryHandler implements IQueryHandler<TranslateTextQuery, TranslateTextResponse> {

    // FIELDS
    private readonly logger : ILogger
    private readonly languageRepository : ILanguageRepository
    private readonly userRepository : IUserRepository
    private readonly translationProvider : ITranslationProvider

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.LanguageRepository) languageRepository : ILanguageRepository,
        @inject(TYPES.UserRepository) userRepository : IUserRepository,
        @inject(TYPES.TranslationProvider) translationProvider : ITranslationProvider

    ) {

        this.logger = logger
        this.languageRepository = languageRepository
        this.userRepository = userRepository
        this.translationProvider = translationProvider
    }

    private static readonly LANGUAGE_ID_TO_CODE: Record<number, string> = {

        1: 'en',
        2: 'tr',
        3: 'de',
        4: 'ru'
    }

    private static readonly VALID_PRACTICE_TYPES = ['reading', 'listening', 'writing']

    // UTILS
    private async GetUserNativeLanguageCodeAsync(userId: string) : Promise<string | null> {

        const user = await this.userRepository.getByIdAsync(userId)

        if(!user) {

            this.logger.warn(`User with ID ${userId} not found.`)
            return null
        }

        const nativeLanguageId = user.nativeLanguageId

        if(!nativeLanguageId) {

            this.logger.warn(`Native language ID for user ${userId} is invalid.`)
            return null
        }

        const code = TranslateTextQueryHandler.LANGUAGE_ID_TO_CODE[nativeLanguageId]

        if(!code) {

            this.logger.warn(`No language code mapping found for language ID ${nativeLanguageId}.`)
            return null
        }

        return code
    }

    private async GetLanguageCodeByNameAsync(languageName: string) : Promise<string | null> {

        const language = await this.languageRepository.getByNameAsync(languageName)

        if(!language) {

            this.logger.warn(`Language with name ${languageName} not found.`)
            return null
        }

        const code = TranslateTextQueryHandler.LANGUAGE_ID_TO_CODE[language.id]

        if(!code) {

            this.logger.warn(`No language code mapping found for language ID ${language.id}.`)
            return null
        }

        return code
    }

    private async DetermineTargetLanguageAsync(practiceType: string, languageName: string, userId: string ) {

        if(practiceType === 'reading' || practiceType === 'listening') {

            return await this.GetUserNativeLanguageCodeAsync(userId)
        }

        if(practiceType === 'writing' && languageName) {

            // GET TARGET LANGUAGE FROM DB
            return await this.GetLanguageCodeByNameAsync(languageName)

        }

        return null
    }

    async Handle(request: TranslateTextQuery): Promise<TranslateTextResponse> {
        
        // LOG MESSAGE
        this.logger.info(`Handling TranslateTextQuery for user ${request.userId}.`)

        const practiceType = request.request.practice.toLowerCase()

        // VALIDATE PRACTICE TYPE
        if(!TranslateTextQueryHandler.VALID_PRACTICE_TYPES.includes(practiceType)) {

            this.logger.error(`Invalid practice type: ${practiceType}`)
            throw new InvalidPracticeType()
        }

        // DETERMINE TARGET LANGUAGE
        const targetLanguageCode = await this.DetermineTargetLanguageAsync(practiceType, request.request.language, request.userId)

        if(!targetLanguageCode) {

            this.logger.error(`Could not determine target language for practice type: ${practiceType}`)
            throw new UncertainTargetLanguage()
        }

        // PERFORM TRANSLATION
        const translatedText = await this.translationProvider.translateAsync(

            request.request.selectedText,
            targetLanguageCode
        )

        this.logger.info(`Translation completed for user ${request.userId}.`)

        const data: TranslateTextResponse = {

            originalText: request.request.selectedText,
            translatedText: translatedText,
            targetLanguage: targetLanguageCode
        }

        return data
    } 
}