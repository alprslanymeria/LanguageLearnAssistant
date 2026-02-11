import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { LoggerOptions } from "pino"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { ILogStream } from "@/src/infrastructure/logging/ILogStream"
import { ElasticsearchLogStream } from "@/src/infrastructure/logging/ElasticsearchLogStream"
import { ConsoleLogStream } from "@/src/infrastructure/logging/ConsoleLogStream"
import { LoggerConfig } from "@/src/infrastructure/logging/LoggerConfig"
import { LoggerService } from "@/src/infrastructure/logging/Logger"
import { ElasticLogConfig } from "@/src/infrastructure/logging/ElasticLogConfig"
import { ElasticLogOptions } from "@/src/infrastructure/logging/Log"

export class LoggingModule implements IContainerModule {

    register(container: Container): void {

        container.bind<LoggerOptions>(TYPES.LoggerConfig).toConstantValue(LoggerConfig.load())

        // ACTIVE LOG TYPES
        let activeLogTypes: string[] = ['console']

        try {

            const logTypesEnv = process.env.LOG_TYPES

            if (logTypesEnv) activeLogTypes = JSON.parse(logTypesEnv)
            
        } catch (error) {
            
            console.warn(`[LoggingModule] LOG_TYPES COULD NOT BE PARSED: ${process.env.LOG_TYPES}. USING 'console' AS A DEFAULT.`)
        }

        if(activeLogTypes.includes('console')) container.bind<ILogStream>(TYPES.LogStreams).to(ConsoleLogStream).inSingletonScope() 

        if(activeLogTypes.includes('elasticsearch')) {

            container.bind<ElasticLogOptions>(TYPES.ElasticLogConfig).toConstantValue(ElasticLogConfig.load())
            container.bind<ILogStream>(TYPES.LogStreams).to(ElasticsearchLogStream).inSingletonScope()
        } 
        
        container.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope()
    }
}