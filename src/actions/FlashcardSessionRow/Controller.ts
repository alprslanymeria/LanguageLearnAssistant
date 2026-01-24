"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveFlashcardRowsRequest } from "@/src/actions/FlashcardSessionRow/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createFRowsCommandFactory } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/CommandFactory"
import { CreateFRowsCommandValidator } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { FlashcardOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { FlashcardRowsResponse } from "@/src/actions/FlashcardSessionRow/Response"
import { getFWordsByIdWithPagingQuery } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryFactory"
import { GetFWordsByIdWithPagingQueryValidator } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryValidator"

export async function CreateFRows(request: SaveFlashcardRowsRequest) : Promise<ServiceResult<number>> {

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

        return ServiceResult.successAsCreated<number>(createdRowsCount as number, "")
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateFRows: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof FlashcardOldSessionNotFound) {

            logger.error("CreateFRows: Flashcard old session not found!", {error})
            return ServiceResult.failOne<number>("Flashcard old session not found!", HttpStatusCode.NotFound)
        }

        logger.error("CreateFRows: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetFWordsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<ServiceResult<FlashcardRowsResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetFWordsByIdWithPaging: oldSessionId and PagedRequest data:", {oldSessionId, request})

        // QUERY
        const query = getFWordsByIdWithPagingQuery(oldSessionId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetFWordsByIdWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const flashcardRowsResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<FlashcardRowsResponse>(flashcardRowsResponse as FlashcardRowsResponse)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetFWordsByIdWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<FlashcardRowsResponse>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof FlashcardOldSessionNotFound) {

            logger.error("GetFWordsByIdWithPaging: Flashcard old session not found!", {error})
            return ServiceResult.failOne<FlashcardRowsResponse>("Flashcard old session not found!", HttpStatusCode.NotFound)
        }

        logger.error("GetFWordsByIdWithPaging: FAIL", {error})
        return ServiceResult.failOne<FlashcardRowsResponse>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}