// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IBaseRequest } from "@/src/infrastructure/mediatR/IBaseRequest"
import { IPipelineBehavior } from "@/src/infrastructure/mediatR/IPipelineBehavior"

/// <summary>
/// LOGGING PIPELINE BEHAVIOR
/// LOGS REQUEST TYPE AND DATA AT THE START OF HANDLING
/// </summary>
@injectable()
export class LoggingBehavior<TRequest extends IBaseRequest, TResponse> implements IPipelineBehavior<TRequest, TResponse> {

    constructor(

        @inject(TYPES.Logger) 
        private readonly logger: ILogger

    ) {}

    async Handle(request: TRequest, next: () => Promise<TResponse>): Promise<TResponse> {

        this.logger.info(`Handling ${request.type}`, { request })

        return next()
    }
}
