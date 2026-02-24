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
import { TranslateConfig } from '@/src/services/translate/TranslateConfig'
import { TranslateOptions } from '@/src/services/translate/Translate'
import { getSecret } from '@/src/utils/serverHelper'

export class TranslationModule implements IContainerModule {

    register(container: Container): void {

        const translateConfig = TranslateConfig.load()

        container.bind<TranslateOptions>(TYPES.TranslateConfig).toConstantValue(translateConfig)

        if(translateConfig.type === "google") {

            container.bind<Translate>(TYPES.GoogleTranslationProvider).toDynamicValue(async () => {

                const { Translate } = v2

                const json = await getSecret("GCP_SERVICE_ACCOUNT_JSON")
                const credentials = JSON.parse(json)

                return new Translate({

                    credentials
                })

            }).inSingletonScope()

            container.bind<ITranslationProvider>(TYPES.TranslationProvider).to(GoogleTranslationProvider).inSingletonScope()
        }

        container.bind<ITranslateFactory>(TYPES.TranslateFactory).to(TranslateFactory).inSingletonScope()
        container.bind<ITranslateService>(TYPES.TranslateService).to(TranslateService).inSingletonScope()
    }
}