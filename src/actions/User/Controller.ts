"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { CompareLanguageIdRequest } from "@/src/actions/User/Request"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { compareLanguageIdQuery } from "@/src/actions/User/Queries/CompareLanguageId/QueryFactory"
import { CompareLanguageIdQueryValidator } from "@/src/actions/User/Queries/CompareLanguageId/QueryValidator"
import { UserNotFound } from "@/src/exceptions/NotFound"
import { UserDto } from "./Response"
import { getProfileInfosQuery } from "./Queries/GetProfileInfos/QueryFactory"
import { UpdateProfileInfosCommandValidator } from "./Commands/UpdateProfileInfos/CommandValidator"
import { updateProfileInfosCommandFactory } from "./Commands/UpdateProfileInfos/CommandFactory"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { GetProfileInfosQueryValidator } from "./Queries/GetProfileInfos/QueryValidator"

export async function UpdateProfileInfos( formData: FormData) : Promise<SerializedServiceResult<string>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`UpdateProfileInfos: Sending update command to bus`)

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await UpdateProfileInfosCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = updateProfileInfosCommandFactory(formData)

        // SEND COMMAND TO BUS
        const updatedId = await commandBus.send(command)

        return ServiceResult.success<string>(updatedId as string).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<string>({
            actionName: "UpdateProfileInfos",
            logger,
            error,
            expectedErrors: [UserNotFound],
            silentErrors: [UserNotFound]
        })
    }
}

export async function CompareLanguageId(request: CompareLanguageIdRequest) : Promise<SerializedServiceResult<boolean>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus) 

    try {

        // LOG INFO
        logger.info(`CompareLanguageId: Comparing language ID ${request.languageName} for User ID ${request.userId}`)

        // QUERY
        const query = compareLanguageIdQuery(request)

        // ZOD VALIDATION
        const validatedQuery = await CompareLanguageIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const result = await queryBus.send(validatedQuery)

        return ServiceResult.success<boolean>(result as boolean).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<boolean>({
            actionName: "CompareLanguageId",
            logger,
            error,
            expectedErrors: [UserNotFound],
            silentErrors: [UserNotFound]
        })
    }
}

export async function GetProfileInfos(userId: string) : Promise<SerializedServiceResult<UserDto>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetProfileInfos: Retrieving profile infos for User ID ${userId}`)

        // QUERY
        const query = getProfileInfosQuery(userId)

        // ZOD VALIDATION
        const validatedQuery = await GetProfileInfosQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const userDto = await queryBus.send(validatedQuery)

        return ServiceResult.success<UserDto>(userDto as UserDto).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<UserDto>({
            actionName: "GetProfileInfos",
            logger,
            error,
            expectedErrors: [UserNotFound],
            silentErrors: [UserNotFound]
        })
    }
}