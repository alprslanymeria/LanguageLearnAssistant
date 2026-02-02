"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveFlashcardRowsRequest } from "@/src/actions/FlashcardSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createFRowsCommandFactory } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/CommandFactory"
import { CreateFRowsCommandValidator } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/CommandValidator"
import { FlashcardOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { FlashcardRowsResponse } from "@/src/actions/FlashcardSessionRow/Response"
import { getFWordsByIdWithPagingQuery } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryFactory"
import { GetFWordsByIdWithPagingQueryValidator } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryValidator"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateFRows(request: SaveFlashcardRowsRequest) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateFRows: SaveFlashcardRowsRequest data:", {request})

        // COMMAND
        const command = createFRowsCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateFRowsCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const createdRowsCount = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "").toPlain()
        
    } catch (error) {

        return handleErrorSerialized<number>({
            actionName: "CreateFRows",
            logger,
            error,
            expectedErrors: [FlashcardOldSessionNotFound],
            silentErrors: [FlashcardOldSessionNotFound]
        })
    }
}

export async function GetFRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<FlashcardRowsResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetFWordsByIdWithPaging: oldSessionId and PagedRequest data:", {oldSessionId, request})

        // QUERY
        const query = getFWordsByIdWithPagingQuery(oldSessionId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetFWordsByIdWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const flashcardRowsResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<FlashcardRowsResponse>(flashcardRowsResponse as FlashcardRowsResponse).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<FlashcardRowsResponse>({
            actionName: "GetFRowsByIdWithPaging",
            logger,
            error,
            expectedErrors: [FlashcardOldSessionNotFound],
            silentErrors: [FlashcardOldSessionNotFound]
        })
    }
}