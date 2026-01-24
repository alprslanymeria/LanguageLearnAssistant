// IMPORTS
import { injectable, multiInject } from "inversify"
import { ITranslateFactory } from "@/src/services/translate/ITranslateFactory"
import { ITranslationProvider } from "@/src/services/translate/ITranslationProvider"
import { TranslateType } from "@/src/services/translate/Translate"
import { TYPES } from "@/src/di/type"

@injectable()
export class TranslateFactory implements ITranslateFactory {

    // FIELDS
    private providers: Map<string, ITranslationProvider>

    // CTOR
    constructor(
        
        @multiInject(TYPES.TranslationProvider)
        providers: ITranslationProvider[]
    
    ) {
        
        this.providers = new Map(providers.map(s => [s.type, s]))

    }

    createStrategy(type: TranslateType): ITranslationProvider {
        
        const provider = this.providers.get(type)

        if (!provider) {
            
            throw new Error(`UNKNOWN TRANSLATION TYPE: ${type}`)
        }

        return provider
    }
}