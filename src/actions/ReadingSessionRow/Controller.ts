"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveReadingRowsRequest } from "@/src/actions/ReadingSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateRRowsCommandValidator } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/CommandValidator"
import { createRRowsCommandFactory } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/CommandFactory"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { ReadingRowsResponse } from "@/src/actions/ReadingSessionRow/Response"
import { GetRRowsByIdWithPagingQueryValidator } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryValidator"
import { getRRowsByIdWithPagingQuery } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryFactory"
import { ReadingOldSessionNotFound } from "@/src/exceptions/NotFound"

export async function CreateRRows(request: SaveReadingRowsRequest) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateRRows: SaveReadingRowsRequest data:", {request})

        // COMMAND
        const command = createRRowsCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateRRowsCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const createdRowsCount = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "")
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateRRows: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ReadingOldSessionNotFound) {

            logger.error("CreateRRows: READING OLD SESSION NOT FOUND!", {error})
            return ServiceResult.failOne<number>(error.message, HttpStatusCode.NotFound)
        }
        
        logger.error("CreateRRows: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetRRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<ServiceResult<ReadingRowsResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetRRowsByIdWithPaging: oldSessionId and PagedRequest data:", {oldSessionId, request})

        // QUERY
        const query = getRRowsByIdWithPagingQuery(oldSessionId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetRRowsByIdWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const readingRowsResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<ReadingRowsResponse>(readingRowsResponse as ReadingRowsResponse)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetRRowsByIdWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<ReadingRowsResponse>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ReadingOldSessionNotFound) {

            logger.error("GetRRowsByIdWithPaging: READING OLD SESSION NOT FOUND!", {error})
            return ServiceResult.failOne<ReadingRowsResponse>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetRRowsByIdWithPaging: FAIL", {error})
        return ServiceResult.failOne<ReadingRowsResponse>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}