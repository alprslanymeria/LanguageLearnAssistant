"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveWritingRowsRequest } from "@/src/actions/WritingSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateWRowsCommandValidator } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/CommandValidator"
import { createWRowsCommandFactory } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/CommandFactory"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { WritingOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { WritingRowsResponse } from "@/src/actions/WritingSessionRow/Response"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { GetWRowsByIdWithPagingQueryValidator } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryValidator"
import { getWRowsByIdWithPagingQuery } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryFactory"

export async function CreateWRows(request: SaveWritingRowsRequest) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateWRows: Creating writing session rows...")

        // COMMAND
        const command = createWRowsCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateWRowsCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const createdRowsCount = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "")
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateWRows: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof WritingOldSessionNotFound) {

            logger.error("CreateWRows: WRITING OLD SESSION NOT FOUND!", {error})
            return ServiceResult.failOne<number>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("CreateWRows: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetWRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<ServiceResult<WritingRowsResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetWRowsByIdWithPaging: Fetching writing session rows with paging...")

        // QUERY
        const query = getWRowsByIdWithPagingQuery(oldSessionId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetWRowsByIdWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const writingRowsResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<WritingRowsResponse>(writingRowsResponse as WritingRowsResponse)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetWRowsByIdWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<WritingRowsResponse>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof WritingOldSessionNotFound) {

            logger.error("GetWRowsByIdWithPaging: WRITING OLD SESSION NOT FOUND!", {error})
            return ServiceResult.failOne<WritingRowsResponse>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetWRowsByIdWithPaging: FAIL", {error})
        return ServiceResult.failOne<WritingRowsResponse>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}