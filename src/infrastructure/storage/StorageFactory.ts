// IMPORTS
import { injectable, multiInject } from 'inversify'
import { StorageType } from '@/src/infrastructure/storage/Storage'
import { IStorageStrategy } from '@/src/infrastructure/storage/IStorageStrategy'
import { IStorageFactory } from '@/src/infrastructure/storage/IStorageFactory'
import { TYPES } from '@/src/di/type'

@injectable()
export class StorageFactory implements IStorageFactory {

    // FIELDS
    private strategies: Map<string, IStorageStrategy>

    // CTOR
    constructor(
        
        @multiInject(TYPES.StorageStrategy)
        strategies: IStorageStrategy[]
    
    ) {
       
        this.strategies = new Map(strategies.map(s => [s.type, s]))

    }

    createStrategy(type: StorageType): IStorageStrategy {

        const strategy = this.strategies.get(type)

        if (!strategy) {
            
            throw new Error(`UNKNOWN STORAGE TYPE: ${type}`)
        }

        return strategy
    }
}