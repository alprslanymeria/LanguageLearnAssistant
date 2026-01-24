// IMPORTS
import { injectable, multiInject } from "inversify"
import { ICacheFactory } from "@/src/infrastructure/caching/ICacheFactory"
import { ICacheStrategy } from "@/src/infrastructure/caching/ICacheStrategy"
import { TYPES } from "@/src/di/type"
import { CacheType } from "@/src/infrastructure/caching/Cache"

@injectable()
export class CacheFactory implements ICacheFactory {

    // FIELDS
    private strategies: Map<string, ICacheStrategy>

    // CTOR
    constructor(
        
        @multiInject(TYPES.CacheStrategy)
        strategies: ICacheStrategy[]
    
    ) {
       
        this.strategies = new Map(strategies.map(s => [s.type, s]))

    }

    createStrategy(type: CacheType): ICacheStrategy {

        const strategy = this.strategies.get(type)

        if (!strategy) {
            
            throw new Error(`UNKNOWN CACHE TYPE: ${type}`)
        }

        return strategy
    }
}