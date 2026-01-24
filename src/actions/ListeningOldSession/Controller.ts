"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveListeningOldSessionRequest } from "@/src/actions/ListeningOldSession/Request"
import { createLOSCommandFactory } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/CommandFactory"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateLOSCommandValidator } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/CommandValidator"
import { ListeningCategoryNotFound, ListeningNotFound } from "@/src/exceptions/NotFound"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { ListeningOldSessionWithTotalCount } from "@/src/actions/ListeningOldSession/Response"
import { getLOSWithPagingQuery } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryFactory"
import { GetLOSWithPagingQueryValidator } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryValidator"

export async function CreateLOS(request: SaveListeningOldSessionRequest) : Promise<ServiceResult<string>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)
    
    try {

        // LOG INFO
        logger.info("CreateLOS: SaveListeningOldSessionRequest data:", {request})

        // COMMAND
        const command = createLOSCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateLOSCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const losId = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<string>(losId as string, "")
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateLOS: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<string>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ListeningNotFound) {

            logger.error("CreateLOS: LISTENING NOT FOUND!", {error})
            return ServiceResult.failOne<string>(error.message, HttpStatusCode.NotFound)
        }

        if(error instanceof ListeningCategoryNotFound) {

            logger.error("CreateLOS: LISTENING CATEGORY NOT FOUND!", {error})
            return ServiceResult.failOne<string>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("CreateLOS: FAIL", {error})
        return ServiceResult.failOne<string>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetLOSWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<ListeningOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetLOSWithPaging: userId and PagedRequest data:", {userId, request})

        // QUERY
        const query = getLOSWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetLOSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<ListeningOldSessionWithTotalCount>>(pagedResult as PagedResult<ListeningOldSessionWithTotalCount>)
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetLOSWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<ListeningOldSessionWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetLOSWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<ListeningOldSessionWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}