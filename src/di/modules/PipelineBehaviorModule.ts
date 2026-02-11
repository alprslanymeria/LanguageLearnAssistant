import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { IPipelineBehavior } from "@/src/infrastructure/mediatR/IPipelineBehavior"
import { LoggingBehavior } from "@/src/infrastructure/mediatR/behaviors/LoggingBehavior"
import { ValidationBehavior } from "@/src/infrastructure/mediatR/behaviors/ValidationBehavior"
import { ValidationRegistry } from "@/src/infrastructure/mediatR/ValidationRegistry"
import { CacheBehavior } from '@/src/infrastructure/mediatR/behaviors/CacheBehavior'

export class PipelineBehaviorModule implements IContainerModule {

    register(container: Container): void {

        // VALIDATION REGISTRY (SINGLETON — POPULATED IN QUERY AND COMMAND MODULES)
        container.bind<ValidationRegistry>(TYPES.ValidationRegistry).to(ValidationRegistry).inSingletonScope()

        // PIPELINE BEHAVIORS (BINDING ORDER = EXECUTION ORDER: FIRST BOUND = OUTERMOST)
        container.bind<IPipelineBehavior<any, any>>(TYPES.PipelineBehavior).to(LoggingBehavior).inSingletonScope()
        container.bind<IPipelineBehavior<any, any>>(TYPES.PipelineBehavior).to(ValidationBehavior).inSingletonScope()
        container.bind<IPipelineBehavior<any, any>>(TYPES.PipelineBehavior).to(CacheBehavior).inSingletonScope()
    }
}
