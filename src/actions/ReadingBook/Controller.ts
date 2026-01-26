"use server"

import { ZodError } from "zod"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
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

export async function CreateReadingBook(prevState: ServiceResult<number> | undefined, formData: FormData) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateReadingBook: CreateReadingBookRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await CreateReadingBookCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = createReadingBookCommandFactory(prevState, formData)

        // SEND COMMAND TO BUS
        const readingBookId = await commandBus.send(command)

        return ServiceResult.successAsCreated<number>(readingBookId as number, "")
        
    } catch (error) {

        if(error instanceof ZodError) {
        
            const firstError = error.issues?.[0]?.message
            logger.error("CreateReadingBook: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof NoPracticeFound) {

            logger.error("CreateReadingBook: No practice found!", {error})
            return ServiceResult.failOne<number>("No practice found!", HttpStatusCode.NotFound)
        }

        if(error instanceof ReadingResultNotSuccess) {

            logger.error("CreateReadingBook: Reading verification failed.", {error})
            return ServiceResult.failOne<number>("Reading verification failed.", HttpStatusCode.BadRequest)
        }

        logger.error("CreateReadingBook: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}

export async function DeleteRBookItemById(id : number) : Promise<ServiceResultBase> {

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
        
        return ServiceResultBase.success(HttpStatusCode.NoContent)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("DeleteRBookItemById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResultBase.failOne(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ReadingBookNotFound) {

            logger.error("DeleteRBookItemById: Reading book item not found!", {error})
            return ServiceResultBase.failOne("Reading book item not found!", HttpStatusCode.NotFound)
        }

        logger.error("DeleteRBookItemById: FAIL", {error})
        return ServiceResultBase.failOne("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }

}

export async function UpdateReadingBook(prevState: ServiceResult<number> | undefined, formData: FormData) : Promise<ServiceResult<number>> {

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
        const command = updateReadingBookCommandFactory(prevState, formData)

        // SEND COMMAND TO BUS
        const readingBookId = await commandBus.send(command)

        return ServiceResult.success<number>(readingBookId as number)
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("UpdateReadingBook: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof NoPracticeFound) {

            logger.error("UpdateReadingBook: No practice found!", {error})
            return ServiceResult.failOne<number>("No practice found!", HttpStatusCode.NotFound)
        }

        if(error instanceof ReadingBookNotFound) {

            logger.error("UpdateReadingBook: Reading book not found!", {error})
            return ServiceResult.failOne<number>("Reading book not found!", HttpStatusCode.NotFound)
        }

        if(error instanceof ReadingResultNotSuccess) {

            logger.error("UpdateReadingBook: Reading verification failed.", {error})
            return ServiceResult.failOne<number>("Reading verification failed.", HttpStatusCode.BadRequest)
        }

        logger.error("UpdateReadingBook: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}

export async function GetAllRBooksWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<ReadingBookWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetAllRBooksWithPaging: Fetching reading books for UserId ${userId}, Page ${request.page}, PageSize ${request.pageSize}`)

        // QUERY
        const query = getAllRBooksWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetAllRBooksWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<ReadingBookWithTotalCount>>(pagedResult as PagedResult<ReadingBookWithTotalCount>)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetAllRBooksWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<ReadingBookWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetAllRBooksWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<ReadingBookWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
    
}

export async function GetRBookCreateItems(userId: string, language: string, practice: string) : Promise<ServiceResult<ReadingBookDto[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetRBookCreateItems: Fetching reading books for creating reading sessions`)

        // QUERY
        const query = getRBookCreateItemsQuery(userId, language, practice)

        // ZOD VALIDATION
        const validatedQuery = await GetRBookCreateItemsQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const readingBooks = await queryBus.send(validatedQuery)

        return ServiceResult.success<ReadingBookDto[]>(readingBooks as ReadingBookDto[])
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetRBookCreateItems: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<ReadingBookDto[]>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof NoLanguageFound) {

            logger.error("GetRBookCreateItems: No language found!", {error})
            return ServiceResult.failOne<ReadingBookDto[]>("No language found!", HttpStatusCode.NotFound)
        }

        if(error instanceof NoPracticeFound) {

            logger.error("GetRBookCreateItems: No practice found!", {error})
            return ServiceResult.failOne<ReadingBookDto[]>("No practice found!", HttpStatusCode.NotFound)
        }

        logger.error("GetRBookCreateItems: FAIL", {error})
        return ServiceResult.failOne<ReadingBookDto[]>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetReadingBookById(id: number) : Promise<ServiceResult<ReadingBookWithLanguageId>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<CommandBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetReadingBookById: Request received for Id ${id}`)

        // QUERY
        const query = getReadingBookByIdQuery(id)

        // ZOD VALIDATION
        const validatedQuery = await GetReadingBookByIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const readingBook = await queryBus.send(validatedQuery)

        return ServiceResult.success<ReadingBookWithLanguageId>(readingBook as ReadingBookWithLanguageId)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetReadingBookById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<ReadingBookWithLanguageId>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof ReadingBookNotFound) {

            logger.error("GetReadingBookById: Reading book not found!", {error})
            return ServiceResult.failOne<ReadingBookWithLanguageId>("Reading book not found!", HttpStatusCode.NotFound)
        }

        logger.error("GetReadingBookById: FAIL", {error})
        return ServiceResult.failOne<ReadingBookWithLanguageId>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}