"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveWritingOldSessionRequest } from "@/src/actions/WritingOldSession/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateWOSCommandValidator } from "@/src/actions/WritingOldSession/Commands/CreateWOS/CommandValidator"
import { createWOSCommandFactory } from "@/src/actions/WritingOldSession/Commands/CreateWOS/CommandFactory"
import { WritingBookNotFound, WritingNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { WritingOldSessionWithTotalCount } from "@/src/actions/WritingOldSession/Response"
import { GetWOSWithPagingQueryValidator } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryValidator"
import { getWOSWithPagingQuery } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryFactory"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateWOS(request: SaveWritingOldSessionRequest) : Promise<SerializedServiceResult<string>> {

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

        return ServiceResult.successAsCreated<string>(wosId as string, "").toPlain()
        
    } catch (error) {

        return handleErrorSerialized<string>({

            actionName: "CreateWOS",
            logger,
            error,
            expectedErrors: [WritingNotFound, WritingBookNotFound],
            silentErrors: [WritingNotFound, WritingBookNotFound]
        })
    }
}


export async function GetWOSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<WritingOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetWOSWithPaging: userId and PagedRequest data:", {userId, request})

        // QUERY
        const query = getWOSWithPagingQuery(userId, language, request)

        // ZOD VALIDATION
        const validatedQuery = await GetWOSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<WritingOldSessionWithTotalCount>>(pagedResult as PagedResult<WritingOldSessionWithTotalCount>).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<PagedResult<WritingOldSessionWithTotalCount>>({
            actionName: "GetWOSWithPaging",
            logger,
            error
        })
    }
}