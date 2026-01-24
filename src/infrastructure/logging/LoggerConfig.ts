// IMPORTS
import pino from 'pino'
import { LoggerOptions } from 'pino'
import { context, trace } from '@opentelemetry/api'

export class LoggerConfig {

    static load() : LoggerOptions {

        return {

            level: process.env.LOG_LEVEL,
            timestamp: pino.stdTimeFunctions.isoTime,
            formatters: {
                level(label) {
                    return { level: label }
                },
                log(object) {
                    const span = trace.getSpan(context.active())
                    
                    if (!span) {
                        return object
                    }

                    const spanContext = span.spanContext()
                    return {
                        ...object,
                        trace_id: spanContext.traceId,
                        span_id: spanContext.spanId,
                    }
                },
            },
        }
    }
}