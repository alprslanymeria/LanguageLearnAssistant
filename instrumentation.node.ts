/*instrumentation.ts*/
import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'
import {
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics'
import { resourceFromAttributes } from '@opentelemetry/resources'
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions'


const resource = resourceFromAttributes({

    [ATTR_SERVICE_NAME]: 'language-learn-assistant',
    [ATTR_SERVICE_VERSION]: '5.0',
})

const sdk = new NodeSDK({

    resource,
    traceExporter: new OTLPTraceExporter(),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(),
    }), 
    instrumentations: [
      getNodeAutoInstrumentations(),
      new PrismaInstrumentation(),
      new PinoInstrumentation()
    ]

})

sdk.start()
