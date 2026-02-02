"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveFlashcardOldSessionRequest } from "@/src/actions/FlashcardOldSession/Request"
import { TYPES } from "@/src/di/type"
import container from "@/src/di/container"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createFOSCommandFactory } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/CommandFactory"
import { CreateFOSCommandValidator } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/CommandValidator"
import { FlashcardCategoryNotFound, FlashcardNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { FlashcardOldSessionWithTotalCount } from "@/src/actions/FlashcardOldSession/Response"
import { GetFOSWithPagingQueryValidator } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryValidator"
import { getFOSWithPagingQuery } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryFactory"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateFOS(request: SaveFlashcardOldSessionRequest) : Promise<SerializedServiceResult<string>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateFOS: Create Flashcard Old Session Request data:", {request})

        // COMMAND
        const command = createFOSCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateFOSCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const createdId = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<string>(createdId as string, "").toPlain()
        
    } catch (error) {

        return handleErrorSerialized<string>({
            actionName: "CreateFOS",
            logger,
            error,
            expectedErrors: [FlashcardNotFound, FlashcardCategoryNotFound],
            silentErrors: [FlashcardNotFound, FlashcardCategoryNotFound]
        })
    }
}

export async function GetFOSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<FlashcardOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetFOSWithPaging: Request received", {userId, request})

        // QUERY
        const query = getFOSWithPagingQuery(userId, language, request)

        // ZOD VALIDATION
        const validatedQuery = await GetFOSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<FlashcardOldSessionWithTotalCount>>(pagedResult as PagedResult<FlashcardOldSessionWithTotalCount>).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<PagedResult<FlashcardOldSessionWithTotalCount>>({
            actionName: "GetFOSWithPaging",
            logger,
            error
        })
    }
}