"use server"

import { ZodError } from "zod"
import { ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { CreateWritingBookRequest, UpdateWritingBookRequest } from "@/src/actions/WritingBook/Request"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createWritingBookCommandFactory } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandFactory"
import { CreateWritingBookCommandValidator } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
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

export async function CreateWritingBook(request: CreateWritingBookRequest) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateWritingBook: CreateWritingBookRequest data:", {request})

        // COMMAND
        const command = createWritingBookCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await CreateWritingBookCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const writingBookId = await commandBus.send(validatedCommand)

        return ServiceResult.successAsCreated<number>(writingBookId as number, "")
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateWritingBook: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("CreateWritingBook: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function DeleteWBookItemById(id: number) : Promise<ServiceResultBase> {

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

        return ServiceResultBase.success(HttpStatusCode.NoContent)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("DeleteWBookItemById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResultBase.failOne(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof WritingBookNotFound) {

            logger.error("DeleteWBookItemById: Writing book item not found!", {error})
            return ServiceResultBase.failOne("WRITING BOOK ITEM NOT FOUND!", HttpStatusCode.NotFound)
        }

        logger.error("DeleteWBookItemById: FAIL", {error})
        return ServiceResultBase.failOne("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}


export async function UpdateWritingBook(request: UpdateWritingBookRequest) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("UpdateWritingBook: UpdateWritingBookRequest data:", {request})

        // COMMAND
        const command = updateWritingBookCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await UpdateWritingBookCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const writingBookId = await commandBus.send(validatedCommand)

        return ServiceResult.success<number>(writingBookId as number)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("UpdateWritingBook: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof WritingResultNotSuccess) {

            logger.error("UpdateWritingBook: WRITING RESULT NOT SUCCESS!", {error})
            return ServiceResult.failOne<number>("WRITING RESULT NOT SUCCESS!", HttpStatusCode.InternalServerError)
        }

        logger.error("UpdateWritingBook: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetAllWBooksWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<WritingBookWithTotalCount>>> {

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

        return ServiceResult.success<PagedResult<WritingBookWithTotalCount>>(pagedResult as PagedResult<WritingBookWithTotalCount>)
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetAllWBooksWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<WritingBookWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetAllWBooksWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<WritingBookWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}

export async function GetWBookCreateItems(userId: string, language: string, practice: string) : Promise<ServiceResult<WritingBookDto[]>> {

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

        return ServiceResult.success<WritingBookDto[]>(writingBooks as WritingBookDto[])
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetWBookCreateItems: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<WritingBookDto[]>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof NoLanguageFound) {

            logger.error("GetWBookCreateItems: NO LANGUAGE FOUND!", {error})
            return ServiceResult.failOne<WritingBookDto[]>(error.message, HttpStatusCode.NotFound)
        }

        if(error instanceof NoPracticeFound) {

            logger.error("GetWBookCreateItems: NO PRACTICE FOUND!", {error})
            return ServiceResult.failOne<WritingBookDto[]>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetWBookCreateItems: FAIL", {error})
        return ServiceResult.failOne<WritingBookDto[]>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetWritingBookById(id: number) : Promise<ServiceResult<WritingBookWithLanguageId>> {

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

        return ServiceResult.success<WritingBookWithLanguageId>(writingBook as WritingBookWithLanguageId)
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetWritingBookById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<WritingBookWithLanguageId>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof WritingBookNotFound) {

            logger.error("GetWritingBookById: WRITING BOOK NOT FOUND!", {error})
            return ServiceResult.failOne<WritingBookWithLanguageId>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetWritingBookById: FAIL", {error})
        return ServiceResult.failOne<WritingBookWithLanguageId>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}