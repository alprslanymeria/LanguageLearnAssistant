import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { Translate } from "@google-cloud/translate/build/src/v2"
import { v2 } from "@google-cloud/translate"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { ITranslationProvider } from "@/src/services/translate/ITranslationProvider"
import { GoogleTranslationProvider } from "@/src/services/translate/GoogleTranslationProvider"
import { ITranslateFactory } from "@/src/services/translate/ITranslateFactory"
import { TranslateFactory } from "@/src/services/translate/TranslateFactory"
import { ITranslateService } from "@/src/services/translate/ITranslateService"
import { TranslateService } from "@/src/services/translate/TranslateService"

export class TranslationModule implements IContainerModule {

    register(container: Container): void {

        container.bind<ITranslationProvider>(TYPES.TranslationProvider).to(GoogleTranslationProvider)
        container.bind<ITranslateFactory>(TYPES.TranslateFactory).to(TranslateFactory)
        container.bind<ITranslateService>(TYPES.TranslateService).to(TranslateService)
        container.bind<Translate>(TYPES.GoogleTranslationProvider).toDynamicValue(() => {

            const { Translate } = v2

            return new Translate({

                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
            })

        }).inTransientScope()
    }
}