"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveReadingRowsRequest } from "@/src/actions/ReadingSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateRRowsCommandValidator } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/CommandValidator"
import { createRRowsCommandFactory } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/CommandFactory"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { ReadingRowsResponse } from "@/src/actions/ReadingSessionRow/Response"
import { GetRRowsByIdWithPagingQueryValidator } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryValidator"
import { getRRowsByIdWithPagingQuery } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryFactory"
import { ReadingOldSessionNotFound } from "@/src/exceptions/NotFound"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"

export async function CreateRRows(request: SaveReadingRowsRequest) : Promise<SerializedServiceResult<number>> {

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

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "").toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({

            actionName: "CreateRRows",
            logger,
            error,
            expectedErrors: [ReadingOldSessionNotFound],
            silentErrors: [ReadingOldSessionNotFound]
        })
    }
}

export async function GetRRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<ReadingRowsResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetRRowsByIdWithPaging: oldSessionId and PagedRequest data:", {oldSessionId, request})

        // QUERY
        const query = getRRowsByIdWithPagingQuery(oldSessionId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetRRowsByIdWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const readingRowsResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<ReadingRowsResponse>(readingRowsResponse as ReadingRowsResponse).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<ReadingRowsResponse>({
            actionName: "GetRRowsByIdWithPaging",
            logger,
            error,
            expectedErrors: [ReadingOldSessionNotFound],
            silentErrors: [ReadingOldSessionNotFound]
        })
    }
}