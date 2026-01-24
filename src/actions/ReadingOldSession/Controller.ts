"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveReadingOldSessionRequest } from "@/src/actions/ReadingOldSession/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createROSCommandFactory } from "@/src/actions/ReadingOldSession/Commands/CreateROS/CommandFactory"
import { CreateROSCommandValidator } from "@/src/actions/ReadingOldSession/Commands/CreateROS/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ReadingBookNotFound, ReadingNotFound } from "@/src/exceptions/NotFound"
import { getROSWithPagingQuery } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryFactory"
import { GetROSWithPagingQueryValidator } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryValidator"
import { ReadingOldSessionWithTotalCount } from "@/src/actions/ReadingOldSession/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"

export async function CreateROS(request: SaveReadingOldSessionRequest) : Promise<ServiceResult<string>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateROS: SaveReadingOldSessionRequest data:", {request})

        // COMMAND
        const command = createROSCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateROSCommandValidator.parseAsync(command)
         
        // SEND COMMAND TO BUS
        const rosId = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<string>(rosId as string, "")
        
    } catch (error) {
        
        if(error instanceof ZodError) {
        
            const firstError = error.issues?.[0]?.message
            logger.error("CreateROS: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<string>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ReadingNotFound) {

            logger.error("CreateROS: Reading not found!", {error})
            return ServiceResult.failOne<string>("Reading not found!", HttpStatusCode.NotFound)
        }

        if(error instanceof ReadingBookNotFound) {

            logger.error("CreateROS: Reading book not found!", {error})
            return ServiceResult.failOne<string>("Reading book not found!", HttpStatusCode.NotFound)
        }

        logger.error("CreateROS: FAIL", {error})
        return ServiceResult.failOne<string>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetROSWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<ReadingOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetROSWithPaging: userId and PagedRequest data:", {userId, request})

        // QUERY
        const query = getROSWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetROSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<ReadingOldSessionWithTotalCount>>(pagedResult as PagedResult<ReadingOldSessionWithTotalCount>)
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetROSWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<ReadingOldSessionWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetROSWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<ReadingOldSessionWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)   
    }
}