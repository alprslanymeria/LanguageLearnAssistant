"use server"

import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createDeckWordFactory } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandFactory"
import { CreateDeckWordCommandValidator } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandValidator"
import { SerializedServiceResult, SerializedServiceResultBase, ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { createDeleteDWordItemByIdCommandFactory } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/CommandFactory"
import { DeleteDWordItemByIdCommandValidator } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { DeckWordNotFound, FlashcardCategoryNotFound } from "@/src/exceptions/NotFound"
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
import { handleErrorSerialized, handleErrorBaseSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateDeckWord(formData: FormData) : Promise<SerializedServiceResult<number>> {

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
        const command = createDeckWordFactory(formData)

        // SEND COMMAND TO BUS
        const deckWordId = await commandBus.send(command)

        return ServiceResult.successAsCreated<number>(deckWordId as number, "").toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "CreateDeckWord",
            logger,
            error,
            expectedErrors: [FlashcardCategoryNotFound],
            silentErrors: [FlashcardCategoryNotFound]
        })
    }
}

export async function DeleteDWordItemById(id: number) : Promise<SerializedServiceResultBase> {

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

        return ServiceResultBase.success(HttpStatusCode.NoContent).toPlain()
        
    } catch (error) {
        
        return handleErrorBaseSerialized({
            actionName: "DeleteDWordItemById",
            logger,
            error,
            expectedErrors: [DeckWordNotFound]
        })
    }
}

export async function UpdateDeckWord(formData: FormData) : Promise<SerializedServiceResult<number>> {

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
        const command = updateDeckWordCommandFactory(formData)

        // SEND COMMAND TO BUS
        const updatedId = await commandBus.send(command)

        return ServiceResult.success<number>(updatedId as number).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "UpdateDeckWord",
            logger,
            error,
            expectedErrors: [DeckWordNotFound]
        })
    }
}

export async function GetAllDWordsWithPaging(userId: string, request: PagedRequest): Promise<SerializedServiceResult<PagedResult<DeckWordWithTotalCount>>> {

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

        return ServiceResult.success<PagedResult<DeckWordWithTotalCount>>(pagedResult as PagedResult<DeckWordWithTotalCount>).toPlain()       

    } catch (error) {

        return handleErrorSerialized<PagedResult<DeckWordWithTotalCount>>({
            actionName: "GetAllDWordsWithPaging",
            logger,
            error
        })
    }   
}

export async function GetDeckWordById(id: number) : Promise<SerializedServiceResult<DeckWordWithLanguageId>> {

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

        return ServiceResult.success<DeckWordWithLanguageId>(deckWord as DeckWordWithLanguageId).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<DeckWordWithLanguageId>({
            actionName: "GetDeckWordById",
            logger,
            error,
            expectedErrors: [DeckWordNotFound]
        })
    }
}