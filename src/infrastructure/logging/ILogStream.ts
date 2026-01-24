// STRATEGY PATTERN
import { DestinationStream } from 'pino'

export interface ILogStream {
    
    getStream(): DestinationStream
}