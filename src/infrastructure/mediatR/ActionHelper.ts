import 'server-only'

// IMPORTS
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import type { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import type { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult, SerializedServiceResult, ServiceResultBase, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { handleErrorSerialized, handleErrorBaseSerialized } from "@/src/infrastructure/common/ErrorHandler"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import type { ZodType } from "zod"

/// <summary>
/// ERROR CONFIG FOR ACTION HELPERS
/// </summary>
export interface ActionErrorConfig {

    expectedErrors?: Array<new (...args: any[]) => Error>
    silentErrors?: Array<new (...args: any[]) => Error>
}

/// <summary>
/// EXECUTE QUERY ACTION
/// LOGGING AND VALIDATION ARE HANDLED BY PIPELINE BEHAVIORS
/// </summary>
export async function executeQuery<T>(

    actionName: string,
    queryFactory: () => IQuery<T>,
    errorConfig?: ActionErrorConfig

): Promise<SerializedServiceResult<T>> {

    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        const query = queryFactory()
        const result = await queryBus.send(query)

        return ServiceResult.success<T>(result as T).toPlain()

    } catch (error) {

        return handleErrorSerialized<T>({
            actionName,
            logger,
            error,
            ...errorConfig
        })
    }
}

/// <summary>
/// EXECUTE COMMAND ACTION
/// LOGGING AND VALIDATION ARE HANDLED BY PIPELINE BEHAVIORS
/// </summary>
export async function executeCommand(

    actionName: string,
    commandFactory: () => ICommand<any>,
    successStatus: HttpStatusCode = HttpStatusCode.OK,
    errorConfig?: ActionErrorConfig

): Promise<SerializedServiceResultBase> {

    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        const command = commandFactory()
        await commandBus.send(command)

        return ServiceResultBase.success(successStatus).toPlain()

    } catch (error) {

        return handleErrorBaseSerialized({
            actionName,
            logger,
            error,
            ...errorConfig
        })
    }
}

/// <summary>
/// EXECUTE FORMDATA COMMAND ACTION
/// FORMDATA VALIDATION STAYS HERE (VALIDATES PLAIN OBJECT REPRESENTATION, NOT THE COMMAND)
/// LOGGING IS HANDLED BY PIPELINE BEHAVIOR
/// </summary>
export async function executeFormDataCommand(

    actionName: string,
    formData: FormData,
    validator: ZodType<any>,
    commandFactory: (formData: FormData) => ICommand<any>,
    successStatus: HttpStatusCode = HttpStatusCode.Created,
    errorConfig?: ActionErrorConfig

): Promise<SerializedServiceResultBase> {

    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // FORMDATA VALIDATION (VALIDATES PLAIN OBJECT REPRESENTATION)
        const plainObject = Object.fromEntries(formData.entries())
        await validator.parseAsync(plainObject)

        // COMMAND
        const command = commandFactory(formData)
        await commandBus.send(command)

        return ServiceResultBase.success(successStatus).toPlain()

    } catch (error) {

        return handleErrorBaseSerialized({
            actionName,
            logger,
            error,
            ...errorConfig
        })
    }
}
