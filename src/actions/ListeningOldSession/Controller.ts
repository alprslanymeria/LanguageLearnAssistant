"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { SaveListeningOldSessionRequest } from "@/src/actions/ListeningOldSession/Request"
import { createLOSCommandFactory } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/CommandFactory"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateLOSCommandValidator } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/CommandValidator"
import { ListeningCategoryNotFound, ListeningNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { ListeningOldSessionWithTotalCount } from "@/src/actions/ListeningOldSession/Response"
import { getLOSWithPagingQuery } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryFactory"
import { GetLOSWithPagingQueryValidator } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryValidator"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateLOS(request: SaveListeningOldSessionRequest) : Promise<SerializedServiceResult<string>> {

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

        return ServiceResult.successAsCreated<string>(losId as string, "").toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<string>({
            actionName: "CreateLOS",
            logger,
            error,
            expectedErrors: [ListeningNotFound, ListeningCategoryNotFound],
            silentErrors: [ListeningNotFound, ListeningCategoryNotFound]
        })
    }
}

export async function GetLOSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ListeningOldSessionWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetLOSWithPaging: userId and PagedRequest data:", {userId, request})

        // QUERY
        const query = getLOSWithPagingQuery(userId, language, request)

        // ZOD VALIDATION
        const validatedQuery = await GetLOSWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<ListeningOldSessionWithTotalCount>>(pagedResult as PagedResult<ListeningOldSessionWithTotalCount>).toPlain()
        
    } catch (error) {

        return handleErrorSerialized<PagedResult<ListeningOldSessionWithTotalCount>>({
            actionName: "GetLOSWithPaging",
            logger,
            error
        })
    }
}