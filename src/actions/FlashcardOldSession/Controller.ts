"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveFlashcardOldSessionRequest } from "@/src/actions/FlashcardOldSession/Request"
import { TYPES } from "@/src/di/type"
import container from "@/src/di/container"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createFOSCommandFactory } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/CommandFactory"
import { CreateFOSCommandValidator } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { FlashcardCategoryNotFound, FlashcardNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { FlashcardOldSessionWithTotalCount } from "@/src/actions/FlashcardOldSession/Response"
import { GetFOSWithPagingQueryValidator } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryValidator"
import { getFOSWithPagingQuery } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryFactory"

export async function CreateFOS(request: SaveFlashcardOldSessionRequest) : Promise<ServiceResult<string>> {

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

        return ServiceResult.successAsCreated<string>(createdId as string, "")
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateFOS: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<string>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof FlashcardNotFound) {

            logger.error("CreateFOS: FLASHCARD NOT FOUND!", {error})
            return ServiceResult.failOne<string>("Flashcard not found!", HttpStatusCode.NotFound)
        }

        if(error instanceof FlashcardCategoryNotFound) {

            logger.error("CreateFOS: FLASHCARD CATEGORY NOT FOUND!", {error})
            return ServiceResult.failOne<string>("Flashcard category not found!", HttpStatusCode.NotFound)
        }

        logger.error("CreateFOS: FAIL", {error})
        return ServiceResult.failOne<string>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetFOSWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<FlashcardOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetFOSWithPaging: Request received", {userId, request})

        // QUERY
        const query = getFOSWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetFOSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<FlashcardOldSessionWithTotalCount>>(pagedResult as PagedResult<FlashcardOldSessionWithTotalCount>)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetFOSWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<FlashcardOldSessionWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetFOSWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<FlashcardOldSessionWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}