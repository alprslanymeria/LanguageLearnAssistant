// IMPORTS
import { DestinationStream } from 'pino'
import pinoElastic from 'pino-elasticsearch'
import { inject, injectable } from 'inversify'
import { ILogStream } from '@/src/infrastructure/logging/ILogStream'
import { TYPES } from '@/src/di/type'
import type { ElasticLogOptions } from '@/src/infrastructure/logging/Log'

@injectable()
export class ElasticsearchLogStream implements ILogStream {

    // CTOR
    constructor(
        
        @inject(TYPES.ElasticLogConfig) private readonly config: ElasticLogOptions
    ) {}

    // INTERFACE IMPLEMENTATION
    getStream(): DestinationStream {
        
        return pinoElastic({
            index: this.config.index,
            node: this.config.node,
            'es-version': this.config.esVersion,
            flushBytes: this.config.flushBytes
        })
    }
}