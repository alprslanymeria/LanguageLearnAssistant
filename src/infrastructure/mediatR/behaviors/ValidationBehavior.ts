// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { IBaseRequest } from "@/src/infrastructure/mediatR/IBaseRequest"
import { IPipelineBehavior } from "@/src/infrastructure/mediatR/IPipelineBehavior"
import { ValidationRegistry } from "@/src/infrastructure/mediatR/ValidationRegistry"

/// <summary>
/// VALIDATION PIPELINE BEHAVIOR
/// VALIDATES REQUEST WITH ZOD SCHEMA IF VALIDATOR IS REGISTERED FOR THE REQUEST TYPE
/// THROWS ZODERROR IF VALIDATION FAILS
/// </summary>
@injectable()
export class ValidationBehavior<TRequest extends IBaseRequest, TResponse> implements IPipelineBehavior<TRequest, TResponse> {

    constructor(

        @inject(TYPES.ValidationRegistry) 
        private readonly validationRegistry: ValidationRegistry

    ) {}

    async Handle(request: TRequest, next: () => Promise<TResponse>): Promise<TResponse> {

        const validator = this.validationRegistry.get(request.type)

        if (validator) {

            await validator.parseAsync(request)
        }

        return next()
    }
}
