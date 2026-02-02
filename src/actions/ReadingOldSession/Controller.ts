"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveReadingOldSessionRequest } from "@/src/actions/ReadingOldSession/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createROSCommandFactory } from "@/src/actions/ReadingOldSession/Commands/CreateROS/CommandFactory"
import { CreateROSCommandValidator } from "@/src/actions/ReadingOldSession/Commands/CreateROS/CommandValidator"
import { ReadingBookNotFound, ReadingNotFound } from "@/src/exceptions/NotFound"
import { getROSWithPagingQuery } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryFactory"
import { GetROSWithPagingQueryValidator } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryValidator"
import { ReadingOldSessionWithTotalCount } from "@/src/actions/ReadingOldSession/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"

export async function CreateROS(request: SaveReadingOldSessionRequest) : Promise<SerializedServiceResult<string>> {

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

        return ServiceResult.successAsCreated<string>(rosId as string, "").toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<string>({
            actionName: "CreateROS",
            logger,
            error,
            expectedErrors: [ReadingNotFound, ReadingBookNotFound],
            silentErrors: [ReadingNotFound, ReadingBookNotFound]
        })
    }
}

export async function GetROSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ReadingOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetROSWithPaging: userId and PagedRequest data:", {userId, request})

        // QUERY
        const query = getROSWithPagingQuery(userId, language, request)

        // ZOD VALIDATION
        const validatedQuery = await GetROSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<ReadingOldSessionWithTotalCount>>(pagedResult as PagedResult<ReadingOldSessionWithTotalCount>).toPlain()
        
    } catch (error) {

        return handleErrorSerialized<PagedResult<ReadingOldSessionWithTotalCount>>({
            actionName: "GetROSWithPaging",
            logger,
            error
        })
    }
}