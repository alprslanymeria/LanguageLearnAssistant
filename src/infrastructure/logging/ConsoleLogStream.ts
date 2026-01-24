// IMPORTS
import { DestinationStream } from 'pino'
import { injectable } from 'inversify'
import { ILogStream } from '@/src/infrastructure/logging/ILogStream'

@injectable()
export class ConsoleLogStream implements ILogStream {

    // INTERFACE IMPLEMENTATION
    getStream(): DestinationStream {
        return process.stdout
    }
}