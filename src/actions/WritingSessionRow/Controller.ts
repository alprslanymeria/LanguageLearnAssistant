"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveWritingRowsRequest } from "@/src/actions/WritingSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateWRowsCommandValidator } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/CommandValidator"
import { createWRowsCommandFactory } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/CommandFactory"
import { WritingOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { WritingRowsResponse } from "@/src/actions/WritingSessionRow/Response"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { GetWRowsByIdWithPagingQueryValidator } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryValidator"
import { getWRowsByIdWithPagingQuery } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryFactory"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateWRows(request: SaveWritingRowsRequest) : Promise<SerializedServiceResult<number>> {

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

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "").toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "CreateWRows",
            logger,
            error,
            expectedErrors: [WritingOldSessionNotFound],
            silentErrors: [WritingOldSessionNotFound]
        })
    }
}

export async function GetWRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<WritingRowsResponse>> {

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

        return ServiceResult.success<WritingRowsResponse>(writingRowsResponse as WritingRowsResponse).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<WritingRowsResponse>({
            actionName: "GetWRowsByIdWithPaging",
            logger,
            error,
            expectedErrors: [WritingOldSessionNotFound],
            silentErrors: [WritingOldSessionNotFound]
        })
    }
}