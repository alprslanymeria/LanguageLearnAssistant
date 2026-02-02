"use server"

import { SerializedServiceResult, SerializedServiceResultBase, ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createWritingBookCommandFactory } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandFactory"
import { CreateWritingBookCommandValidator } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandValidator"
import { deleteWBookItemByIdCommandFactory } from "@/src/actions/WritingBook/Commands/DeleteWBookItemById/CommandFactory"
import { DeleteWBookItemByIdCommandValidator } from "@/src/actions/WritingBook/Commands/DeleteWBookItemById/CommandValidator"
import { NoLanguageFound, NoPracticeFound, WritingBookNotFound } from "@/src/exceptions/NotFound"
import { updateWritingBookCommandFactory } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/CommandFactory"
import { UpdateWritingBookCommandValidator } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/CommandValidator"
import { WritingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { WritingBookDto, WritingBookWithLanguageId, WritingBookWithTotalCount } from "@/src/actions/WritingBook/Response"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { GetAllWBooksWithPagingQueryValidator } from "@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/QueryValidator"
import { getAllWBooksWithPagingQuery } from "@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/QueryFactory"
import { GetWBookCreateItemsQueryValidator } from "@/src/actions/WritingBook/Queries/GetWBookCreateItems/QueryValidator"
import { getWBookCreateItemsQuery } from "@/src/actions/WritingBook/Queries/GetWBookCreateItems/QueryFactory"
import { getWritingBookByIdQuery } from "@/src/actions/WritingBook/Queries/GetWritingBookById/QueryFactory"
import { GetWritingBookByIdQueryValidator } from "@/src/actions/WritingBook/Queries/GetWritingBookById/QueryValidator"
import { handleErrorBaseSerialized, handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"

export async function CreateWritingBook(formData: FormData) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateWritingBook: CreateWritingBookRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await CreateWritingBookCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = createWritingBookCommandFactory(formData)

        // SEND COMMAND TO BUS
        const writingBookId = await commandBus.send(command)

        return ServiceResult.successAsCreated<number>(writingBookId as number, "").toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "CreateWritingBook",
            logger,
            error,
            expectedErrors: [NoPracticeFound, WritingResultNotSuccess],
            silentErrors: [NoPracticeFound, WritingResultNotSuccess]
        })
    }
}

export async function DeleteWBookItemById(id: number) : Promise<SerializedServiceResultBase> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`DeleteWBookItemById: Request received for Id ${id}`)
        
        // COMMAND
        const command = deleteWBookItemByIdCommandFactory(id)

        // ZOD VALIDATION
        const validatedCommand = await DeleteWBookItemByIdCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        await commandBus.send(validatedCommand)

        return ServiceResultBase.success(HttpStatusCode.NoContent).toPlain()
        
    } catch (error) {
        
        return handleErrorBaseSerialized({
            actionName: "DeleteWBookItemById",
            logger,
            error,
            expectedErrors: [WritingBookNotFound]
        })
    }
}

export async function UpdateWritingBook(formData: FormData) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("UpdateWritingBook: UpdateWritingBookRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await UpdateWritingBookCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = updateWritingBookCommandFactory(formData)

        // SEND COMMAND TO BUS
        const writingBookId = await commandBus.send(command)

        return ServiceResult.success<number>(writingBookId as number).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "UpdateWritingBook",
            logger,
            error,
            expectedErrors: [NoPracticeFound, WritingBookNotFound, WritingResultNotSuccess],
            silentErrors: [NoPracticeFound, WritingResultNotSuccess]
        })
    }
}

export async function GetAllWBooksWithPaging(userId: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<WritingBookWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetAllWBooksWithPaging: Request received for UserId ${userId}, Page ${request.page}, PageSize ${request.pageSize}`)

        // QUERY
        const query = getAllWBooksWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetAllWBooksWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<WritingBookWithTotalCount>>(pagedResult as PagedResult<WritingBookWithTotalCount>).toPlain()
        
    } catch (error) {

        return handleErrorSerialized<PagedResult<WritingBookWithTotalCount>>({
            actionName: "GetAllWBooksWithPaging",
            logger,
            error
        })
    }
}

export async function GetWBookCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<WritingBookDto[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetWBookCreateItems: Request received for UserId ${userId}, Language ${language}, Practice ${practice}`)

        // QUERY
        const query = getWBookCreateItemsQuery(userId, language, practice)

        // ZOD VALIDATION
        const validatedQuery = await GetWBookCreateItemsQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const writingBooks = await queryBus.send(validatedQuery)

        return ServiceResult.success<WritingBookDto[]>(writingBooks as WritingBookDto[]).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<WritingBookDto[]>({
            actionName: "GetWBookCreateItems",
            logger,
            error,
            expectedErrors: [NoLanguageFound, NoPracticeFound],
            silentErrors: [NoLanguageFound, NoPracticeFound]
        })
    }
}

export async function GetWritingBookById(id: number) : Promise<SerializedServiceResult<WritingBookWithLanguageId>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetWritingBookById: Request received for Id ${id}`)

        // QUERY
        const query = getWritingBookByIdQuery(id)

        // ZOD VALIDATION
        const validatedQuery = await GetWritingBookByIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const writingBook = await queryBus.send(validatedQuery)

        return ServiceResult.success<WritingBookWithLanguageId>(writingBook as WritingBookWithLanguageId).toPlain()
        
    } catch (error) {

        return handleErrorSerialized<WritingBookWithLanguageId>({
            actionName: "GetWritingBookById",
            logger,
            error,
            expectedErrors: [WritingBookNotFound]
        })
    }
}