"use server"

import { ZodError } from "zod"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createDeckWordFactory } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandFactory"
import { CreateDeckWordCommandValidator } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandValidator"
import { ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { createDeleteDWordItemByIdCommandFactory } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/CommandFactory"
import { DeleteDWordItemByIdCommandValidator } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { DeckWordNotFound } from "@/src/exceptions/NotFound"
import { updateDeckWordCommandFactory } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/CommandFactory"
import { UpdateDeckWordCommandValidator } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/CommandValidator"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { getAllDWordsWithPagingQuery } from "@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/QueryFactory"
import { GetAllDWordsWithPagingQueryValidator } from "@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/QueryValidator"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { DeckWordWithLanguageId, DeckWordWithTotalCount } from "@/src/actions/DeckWord/Response"
import { getDeckWordByIdQuery } from "@/src/actions/DeckWord/Queries/GetDeckWordById/QueryFactory"
import { GetDeckWordByIdQueryValidator } from "@/src/actions/DeckWord/Queries/GetDeckWordById/QueryValidator"

export async function CreateDeckWord(prevState: ServiceResult<number> | undefined, formData: FormData) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateDeckWord: CreateDeckWordRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await CreateDeckWordCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = createDeckWordFactory(prevState, formData)

        // SEND COMMAND TO BUS
        const deckWordId = await commandBus.send(command)

        return ServiceResult.successAsCreated<number>(deckWordId as number, "")
        
    } catch (error) {
        
        if(error instanceof ZodError) {
        
            const firstError = error.issues?.[0]?.message
            logger.error("CreateDeckWord: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("CreateDeckWord: FAIL", {error})

        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function DeleteDWordItemById(id: number) : Promise<ServiceResultBase> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`DeleteDWordItemById: Request received for Id ${id}`)

        // COMMAND
        const command = createDeleteDWordItemByIdCommandFactory(id)

        // ZOD VALIDATION
        const validatedCommand = await DeleteDWordItemByIdCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        await commandBus.send(validatedCommand)

        return ServiceResultBase.success(HttpStatusCode.NoContent)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("DeleteDWordItemById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResultBase.failOne(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof DeckWordNotFound) {

            logger.error("DeleteDWordItemById: DECK WORD NOT FOUND!", {error})
            // SHOW TO USER
            return ServiceResultBase.failOne(error.message, HttpStatusCode.NotFound)
        }

        logger.error("DeleteDWordItemById: FAIL", {error})
        return ServiceResultBase.failOne("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function UpdateDeckWord(prevState: ServiceResult<number> | undefined, formData: FormData) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("UpdateDeckWord: UpdateDeckWordRequest data:", {formData})

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await UpdateDeckWordCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = updateDeckWordCommandFactory(prevState, formData)

        // SEND COMMAND TO BUS
        const updatedId = await commandBus.send(command)

        return ServiceResult.success<number>(updatedId as number)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("UpdateDeckWord: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof DeckWordNotFound) {

            logger.error("UpdateDeckWord: DECK WORD NOT FOUND!", {error})
            // SHOW TO USER
            return ServiceResult.failOne<number>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("UpdateDeckWord: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)

    }
}

export async function GetAllDWordsWithPaging(userId: string, request: PagedRequest): Promise<ServiceResult<PagedResult<DeckWordWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetAllDWordsWithPaging: Request received", {userId, request})

        // QUERY
        const query = getAllDWordsWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetAllDWordsWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<DeckWordWithTotalCount>>(pagedResult as PagedResult<DeckWordWithTotalCount>)        

    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetAllDWordsWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<DeckWordWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetAllDWordsWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<DeckWordWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }   
}

export async function GetDeckWordById(id: number) : Promise<ServiceResult<DeckWordWithLanguageId>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetDeckWordById: Request received for Id ${id}`)

        // QUERY
        const query = getDeckWordByIdQuery(id)

        // ZOD VALIDATION
        const validatedQuery = await GetDeckWordByIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const deckWord = await queryBus.send(validatedQuery)

        return ServiceResult.success<DeckWordWithLanguageId>(deckWord as DeckWordWithLanguageId)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetDeckWordById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<DeckWordWithLanguageId>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof DeckWordNotFound) {

            logger.error("GetDeckWordById: DECK WORD NOT FOUND!", {error})
            // SHOW TO USER
            return ServiceResult.failOne<DeckWordWithLanguageId>(error.message, HttpStatusCode.NotFound)
        }
        
        logger.error("GetDeckWordById: FAIL", {error})
        return ServiceResult.failOne<DeckWordWithLanguageId>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}