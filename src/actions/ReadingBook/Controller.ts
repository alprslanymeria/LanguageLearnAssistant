"use server"

import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { SerializedServiceResult, SerializedServiceResultBase, ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createReadingBookCommandFactory } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/CommandFactory"
import { CreateReadingBookCommandValidator } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ReadingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { deleteRBookItemByIdCommandFactory } from "@/src/actions/ReadingBook/Commands/DeleteRBookItemById/CommandFactory"
import { DeleteRBookItemByIdCommandValidator } from "@/src/actions/ReadingBook/Commands/DeleteRBookItemById/CommandValidator"
import { NoLanguageFound, NoPracticeFound, ReadingBookNotFound } from "@/src/exceptions/NotFound"
import { UpdateReadingBookCommandValidator } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/CommandValidator"
import { updateReadingBookCommandFactory } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/CommandFactory"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { ReadingBookDto, ReadingBookWithLanguageId, ReadingBookWithTotalCount } from "@/src/actions/ReadingBook/Response"
import { getAllRBooksWithPagingQuery } from "@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/QueryFactory"
import { GetAllRBooksWithPagingQueryValidator } from "@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/QueryValidator"
import { getRBookCreateItemsQuery } from "@/src/actions/ReadingBook/Queries/GetRBookCreateItems/QueryFactory"
import { GetRBookCreateItemsQueryValidator } from "@/src/actions/ReadingBook/Queries/GetRBookCreateItems/QueryValidator"
import { getReadingBookByIdQuery } from "@/src/actions/ReadingBook/Queries/GetReadingBookById/QueryFactory"
import { GetReadingBookByIdQueryValidator } from "@/src/actions/ReadingBook/Queries/GetReadingBookById/QueryValidator"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { handleErrorBaseSerialized, handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateReadingBook(formData: FormData) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateReadingBook: CreateReadingBookRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        logger.info("CreateReadingBook: CreateReadingBookRequest plainObject data:", {plainObject})

        // ZOD VALIDATION
        await CreateReadingBookCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = createReadingBookCommandFactory(formData)

        // SEND COMMAND TO BUS
        const readingBookId = await commandBus.send(command)

        return ServiceResult.successAsCreated<number>(readingBookId as number, "").toPlain()
        
    } catch (error) {

        return handleErrorSerialized<number>({
            actionName: "CreateReadingBook",
            logger,
            error,
            expectedErrors: [NoPracticeFound, ReadingResultNotSuccess],
            silentErrors: [NoPracticeFound, ReadingResultNotSuccess]
        })
    }
}

export async function DeleteRBookItemById(id : number) : Promise<SerializedServiceResultBase> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`DeleteRBookItemById: Request received for Id ${id}`)

        // COMMAND
        const command = deleteRBookItemByIdCommandFactory(id)

        // ZOD VALIDATION
        const validatedCommand = await DeleteRBookItemByIdCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        await commandBus.send(validatedCommand)
        
        return ServiceResultBase.success(HttpStatusCode.NoContent).toPlain()
        
    } catch (error) {
        
        return handleErrorBaseSerialized({
            actionName: "DeleteRBookItemById",
            logger,
            error,
            expectedErrors: [ReadingBookNotFound]
        })
    }
}

export async function UpdateReadingBook(formData: FormData) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("UpdateReadingBook: UpdateReadingBookRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await UpdateReadingBookCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = updateReadingBookCommandFactory(formData)

        // SEND COMMAND TO BUS
        const readingBookId = await commandBus.send(command)

        return ServiceResult.success<number>(readingBookId as number).toPlain()
        
    } catch (error) {

        return handleErrorSerialized<number>({
            actionName: "UpdateReadingBook",
            logger,
            error,
            expectedErrors: [NoPracticeFound, ReadingBookNotFound, ReadingResultNotSuccess],
            silentErrors: [NoPracticeFound, ReadingResultNotSuccess]
        })
    }
}

export async function GetAllRBooksWithPaging(userId: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ReadingBookWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetAllRBooksWithPaging: Fetching reading books for UserId ${userId}, Page ${request.page}, PageSize ${request.pageSize}`)

        // QUERY
        const query = getAllRBooksWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetAllRBooksWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<ReadingBookWithTotalCount>>(pagedResult as PagedResult<ReadingBookWithTotalCount>).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<PagedResult<ReadingBookWithTotalCount>>({

            actionName: "GetAllRBooksWithPaging",
            logger,
            error
        })
    }
}

export async function GetRBookCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<ReadingBookDto[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetRBookCreateItems: Fetching reading books for creating reading sessions`)

        // QUERY
        const query = getRBookCreateItemsQuery(userId, language, practice)

        // ZOD VALIDATION
        const validatedQuery = await GetRBookCreateItemsQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const readingBooks = await queryBus.send(validatedQuery)

        return ServiceResult.success<ReadingBookDto[]>(readingBooks as ReadingBookDto[]).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<ReadingBookDto[]>({
            actionName: "GetRBookCreateItems",
            logger,
            error,
            expectedErrors: [NoLanguageFound, NoPracticeFound],
            silentErrors: [NoLanguageFound, NoPracticeFound]
        })
    }
}

export async function GetReadingBookById(id: number) : Promise<SerializedServiceResult<ReadingBookWithLanguageId>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetReadingBookById: Request received for Id ${id}`)

        // QUERY
        const query = getReadingBookByIdQuery(id)

        // ZOD VALIDATION
        const validatedQuery = await GetReadingBookByIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const readingBook = await queryBus.send(validatedQuery)

        return ServiceResult.success<ReadingBookWithLanguageId>(readingBook as ReadingBookWithLanguageId).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<ReadingBookWithLanguageId>({
            
            actionName: "GetReadingBookById",
            logger,
            error,
            expectedErrors: [ReadingBookNotFound]
        })
    }
}