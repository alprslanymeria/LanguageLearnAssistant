// IMPORTS
import pino from 'pino'
import { inject, injectable, multiInject } from 'inversify'
import { ILogger } from '@/src/infrastructure/logging/ILogger'
import { ILogStream } from '@/src/infrastructure/logging/ILogStream'
import { LogLevel } from '@/src/infrastructure/logging/Log'
import { TYPES } from '@/src/di/type'


@injectable()
export class LoggerService implements ILogger {

    // FIELDS
    private readonly logger: pino.Logger

    // CTOR
    constructor(

        @multiInject(TYPES.LogStreams) streams: ILogStream[],
        @inject(TYPES.LoggerConfig) config: pino.LoggerOptions
        
    ) {
        const pinoStreams = streams.map(stream => ({ 
            stream: stream.getStream() 
        }))

        this.logger = pino(config, pino.multistream(pinoStreams))
    }

    // INTERFACE IMPLEMENTATION
    private log(level: LogLevel, message: string, meta?: object): void {
        this.logger[level](meta ?? {}, message)
    }

    info(message: string, meta?: object): void {
        this.log('info', message, meta)
    }

    warn(message: string, meta?: object): void {
        this.log('warn', message, meta)
    }

    error(message: string, meta?: object): void {
        this.log('error', message, meta)
    }

    debug(message: string, meta?: object): void {
        this.log('debug', message, meta)
    }

    trace(message: string, meta?: object): void {
        this.log('trace', message, meta)
    }
}