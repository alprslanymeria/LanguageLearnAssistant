"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveWritingOldSessionRequest } from "@/src/actions/WritingOldSession/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateWOSCommandValidator } from "@/src/actions/WritingOldSession/Commands/CreateWOS/CommandValidator"
import { createWOSCommandFactory } from "@/src/actions/WritingOldSession/Commands/CreateWOS/CommandFactory"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { WritingBookNotFound, WritingNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { WritingOldSessionWithTotalCount } from "@/src/actions/WritingOldSession/Response"
import { GetWOSWithPagingQueryValidator } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryValidator"
import { getWOSWithPagingQuery } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryFactory"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"

export async function CreateWOS(request: SaveWritingOldSessionRequest) : Promise<ServiceResult<string>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateWOS: SaveWritingOldSessionRequest data:", {request})

        // COMMAND
        const command = createWOSCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateWOSCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const wosId = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<string>(wosId as string, "")
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateWOS: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<string>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof WritingNotFound) {

            logger.error("CreateWOS: Writing not found!", {error})
            return ServiceResult.failOne<string>("Writing not found!", HttpStatusCode.NotFound)
        }

        if(error instanceof WritingBookNotFound) {

            logger.error("CreateWOS: Writing book not found!", {error})
            return ServiceResult.failOne<string>("Writing book not found!", HttpStatusCode.NotFound)
        }

        logger.error("CreateWOS: FAIL", {error})
        return ServiceResult.failOne<string>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}


export async function GetWOSWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<WritingOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetWOSWithPaging: userId and PagedRequest data:", {userId, request})

        // QUERY
        const query = getWOSWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetWOSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<WritingOldSessionWithTotalCount>>(pagedResult as PagedResult<WritingOldSessionWithTotalCount>)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetWOSWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<WritingOldSessionWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetWOSWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<WritingOldSessionWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}