"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { CompareLanguageIdRequest } from "@/src/actions/User/Request"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { compareLanguageIdQuery } from "@/src/actions/User/Queries/CompareLanguageId/QueryFactory"
import { CompareLanguageIdQueryValidator } from "@/src/actions/User/Queries/CompareLanguageId/QueryValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { UserNotFound } from "@/src/exceptions/NotFound"
import { UserDto } from "./Response"
import { getProfileInfosQuery } from "./Queries/GetProfileInfos/QueryFactory"
import { UpdateProfileInfosCommandValidator } from "./Commands/UpdateProfileInfos/CommandValidator"
import { updateProfileInfosCommandFactory } from "./Commands/UpdateProfileInfos/CommandFactory"

export async function UpdateProfileInfos(prevState: ServiceResult<string> | undefined, formData: FormData) : Promise<ServiceResult<string>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<QueryBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`UpdateProfileInfos: Sending update command to bus`)

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await UpdateProfileInfosCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = updateProfileInfosCommandFactory(prevState, formData)

        // SEND COMMAND TO BUS
        const updatedId = await commandBus.send(command)

        return ServiceResult.success<string>(updatedId as string)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("UpdateProfileInfos: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<string>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof UserNotFound) {

            logger.error(`UpdateProfileInfos: User not found!`, {userId: formData.get("userId")?.toString()})
            return ServiceResult.failOne<string>("USER NOT FOUND", HttpStatusCode.NotFound)
        }

        logger.error("UpdateProfileInfos: INTERNAL SERVER ERROR!", {error})
        return ServiceResult.failOne<string>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function CompareLanguageId(request: CompareLanguageIdRequest) : Promise<ServiceResult<boolean>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus) 

    try {

        // LOG INFO
        logger.info(`CompareLanguageId: Comparing language ID ${request.languageId} for User ID ${request.userId}`)

        // QUERY
        const query = compareLanguageIdQuery(request)

        // ZOD VALIDATION
        const validatedQuery = await CompareLanguageIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const result = await queryBus.send(validatedQuery)

        return ServiceResult.success<boolean>(result as boolean)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CompareLanguageId: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<boolean>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof UserNotFound) {

            logger.error(`CompareLanguageId: User not found!`, {userId: request.userId})
            return ServiceResult.failOne<boolean>("USER NOT FOUND", HttpStatusCode.NotFound)
        }

        logger.error("CompareLanguageId: INTERNAL SERVER ERROR!", {error})
        return ServiceResult.failOne<boolean>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetProfileInfos(userId: string) : Promise<ServiceResult<UserDto>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetProfileInfos: Retrieving profile infos for User ID ${userId}`)

        // QUERY
        const query = getProfileInfosQuery(userId)

        // ZOD VALIDATION
        const validatedQuery = await CompareLanguageIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const userDto = await queryBus.send(validatedQuery)

        return ServiceResult.success<UserDto>(userDto as UserDto)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetProfileInfos: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<UserDto>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof UserNotFound) {

            logger.error(`GetProfileInfos: User not found!`, {userId})
            return ServiceResult.failOne<UserDto>("USER NOT FOUND", HttpStatusCode.NotFound)
        }

        logger.error("GetProfileInfos: INTERNAL SERVER ERROR!", {error})
        return ServiceResult.failOne<UserDto>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}