"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveListeningRowsRequest } from "@/src/actions/ListeningSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createLRowsCommandFactory } from "@/src/actions/ListeningSessionRow/Commands/CreateLRows/CommandFactory"
import { CreateLRowsCommandValidator } from "@/src/actions/ListeningSessionRow/Commands/CreateLRows/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ListeningOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { getLRowsByIdWithPagingQuery } from "@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/QueryFactory"
import { GetLRowsByIdWithPagingQueryValidator } from "@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/QueryValidator"
import { ListeningRowsResponse } from "@/src/actions/ListeningSessionRow/Response"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"

export async function CreateLRows(request: SaveListeningRowsRequest) : Promise<ServiceResult <number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus) 

    try {

        // LOG INFO
        logger.info("CreateLRows: SaveListeningRowsRequest data:", {request})

        // COMMAND
        const command = createLRowsCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateLRowsCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const createdRowsCount = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "")
        
    } catch (error) {

        if(error instanceof ZodError) {
        
            const firstError = error.issues?.[0]?.message
            logger.error("CreateLRows: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ListeningOldSessionNotFound) {

            logger.error("CreateLRows: Listening old session not found!", {error})
            return ServiceResult.failOne<number>("Listening old session not found!", HttpStatusCode.NotFound)
        }

        logger.error("CreateLRows: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
    
}

export async function GetLRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<ServiceResult<ListeningRowsResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetLRowsByIdWithPaging: oldSessionId and PagedRequest data:", {oldSessionId, request})

        // QUERY
        const query = getLRowsByIdWithPagingQuery(oldSessionId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetLRowsByIdWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const listeningRowsResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<ListeningRowsResponse>(listeningRowsResponse as ListeningRowsResponse)
        
    } catch (error) {

        if(error instanceof ZodError) {
        
            const firstError = error.issues?.[0]?.message
            logger.error("GetLRowsByIdWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<ListeningRowsResponse>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ListeningOldSessionNotFound) {

            logger.error("GetLRowsByIdWithPaging: Listening old session not found!", {error})
            return ServiceResult.failOne<ListeningRowsResponse>("Listening old session not found!", HttpStatusCode.NotFound)
        }

        logger.error("GetLRowsByIdWithPaging: FAIL", {error})
        return ServiceResult.failOne<ListeningRowsResponse>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}