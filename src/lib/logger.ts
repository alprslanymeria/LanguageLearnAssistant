import pino, { multistream } from 'pino'
import pinoElastic from 'pino-elasticsearch'
import { LogLevel } from '@/src/types/log'
import { context, trace } from '@opentelemetry/api'

class LoggerService {

    private logger

    constructor() {

        // ELASTICSEARCH STREAM
        const streamToElastic = pinoElastic({

            index: process.env.ELASTIC_INDEX || 'language-assistant-logs',
            node: process.env.ELASTIC_URL || 'http://localhost:9200',
            'es-version': 8,
            flushBytes: 1000
        })

        // STREAMS
        const streams = [

            { stream: process.stdout },
            { stream: streamToElastic }
        ]

        this.logger = pino({

            level: process.env.LOG_LEVEL || 'info',
            timestamp: pino.stdTimeFunctions.isoTime,

            formatters: {

                level(label) {

                    return { level: label }
                },

                log(object) {

                    const span = trace.getSpan(context.active())

                    if (span) {
                        const spanContext = span.spanContext()
                        return {
                            ...object,
                            trace_id: spanContext.traceId,
                            span_id: spanContext.spanId,
                        }
                    }
                    
                    return object
                },
            },
        },
    
        multistream(streams)
    )}
    

    private log(level: LogLevel, message: string, meta?: object) {

        this.logger[level](meta ?? {}, message)
    }

    info(message: string, meta?: object) {
        this.log('info', message, meta)
    }

    warn(message: string, meta?: object) {
        this.log('warn', message, meta)
    }

    error(message: string, meta?: object) {
        this.log('error', message, meta)
    }

    debug(message: string, meta?: object) {
        this.log('debug', message, meta)
    }
}

export const logger = new LoggerService()