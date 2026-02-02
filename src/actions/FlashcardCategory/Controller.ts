"use server"

import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { SerializedServiceResult, SerializedServiceResultBase, ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { createFlashcardCategoryCommandFactory } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/CommandFactory"
import { createFlashcardCategoryCommandValidator } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/CommandValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { deleteFCategoryItemByIdCommandFactory } from "@/src/actions/FlashcardCategory/Commands/DeleteFCategoryItemById/CommandFactory"
import { DeleteFCategoryItemByIdCommandValidator } from "@/src/actions/FlashcardCategory/Commands/DeleteFCategoryItemById/CommandValidator"
import { FlashcardCategoryNotFound, NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"
import { updateFlashcardCategoryCommandFactory } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/CommandFactory"
import { UpdateFlashcardCategoryCommandValidator } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/CommandValidator"
import { FlashcardResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { FlashcardCategoryWithDeckWords, FlashcardCategoryWithLanguageId, FlashcardCategoryWithLanguageIds, FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { getAllFCategoriesWithPagingQuery } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryFactory"
import { GetAllFCategoriesWithPagingQueryValidator } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryValidator"
import { getFCategoryCreateItemsQuery } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryFactory"
import { GetFCategoryCreateItemsQueryValidator } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryValidator"
import { getFlashcardCategoryByIdQuery } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryFactory"
import { GetFlashcardCategoryByIdQueryValidator } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryValidator"
import { getAllFCategories } from "./Queries/GetAllFCategories/QueryFactory"
import { GetAllFCategoriesQueryValidator } from "./Queries/GetAllFCategories/QueryValidator"
import { handleErrorSerialized, handleErrorBaseSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function CreateFlashcardCategory(formData: FormData) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateFlashcardCategory: Request received")

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await createFlashcardCategoryCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = createFlashcardCategoryCommandFactory(formData)

        // SEND COMMAND TO BUS
        const flashcardCategoryId = await commandBus.send(command)

        return ServiceResult.success<number>(flashcardCategoryId as number).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "CreateFlashcardCategory",
            logger,
            error,
            expectedErrors: [NoPracticeFound, FlashcardResultNotSuccess],
            silentErrors: [NoPracticeFound, FlashcardResultNotSuccess]
        })
    }
}

export async function DeleteFCategoryItemById(id: number) : Promise<SerializedServiceResultBase> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {
        
        // LOG INFO
        logger.info(`DeleteFCategoryItemById: Request received for Id ${id}`)

        // COMMAND
        const command = deleteFCategoryItemByIdCommandFactory(id)

        // ZOD VALIDATION
        const validatedCommand = await DeleteFCategoryItemByIdCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        await commandBus.send(validatedCommand)

        return ServiceResultBase.success(HttpStatusCode.NoContent).toPlain()

    } catch (error) {

        return handleErrorBaseSerialized({
            actionName: "DeleteFCategoryItemById",
            logger,
            error,
            expectedErrors: [FlashcardCategoryNotFound]
        })
    }
}

export async function UpdateFlashcardCategory(formData: FormData) : Promise<SerializedServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`UpdateFlashcardCategory: Request received...`)

        // TURN FORM DATA TO PLAIN OBJECT
        const plainObject = Object.fromEntries(formData.entries())

        // ZOD VALIDATION
        await UpdateFlashcardCategoryCommandValidator.parseAsync(plainObject)

        // COMMAND
        const command = updateFlashcardCategoryCommandFactory(formData)

        // SEND COMMAND TO BUS
        const updatedId = await commandBus.send(command)

        return ServiceResult.success<number>(updatedId as number).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<number>({
            actionName: "UpdateFlashcardCategory",
            logger,
            error,
            expectedErrors: [NoPracticeFound, FlashcardCategoryNotFound, FlashcardResultNotSuccess],
            silentErrors: [NoPracticeFound, FlashcardResultNotSuccess]
        })
    }
}

export async function GetAllFCategoriesWithPaging(userId: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<FlashcardCategoryWithTotalCount>>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetAllFCategoriesWithPaging: Request received", {userId, request})

        // QUERY
        const query = getAllFCategoriesWithPagingQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await GetAllFCategoriesWithPagingQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const pagedResult = await queryBus.send(validatedQuery)

        return ServiceResult.success<PagedResult<FlashcardCategoryWithTotalCount>>(pagedResult as PagedResult<FlashcardCategoryWithTotalCount>).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<PagedResult<FlashcardCategoryWithTotalCount>>({
            actionName: "GetAllFCategoriesWithPaging",
            logger,
            error
        })
    }
}

export async function GetAllFCategories(userId: string) : Promise<SerializedServiceResult<FlashcardCategoryWithLanguageIds>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetAllFCategories: Request received", {userId})

        // QUERY
        const query = getAllFCategories(userId)

        // ZOD VALIDATION
        const validatedQuery = await GetAllFCategoriesQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const flashcardCategories = await queryBus.send(validatedQuery)

        return ServiceResult.success<FlashcardCategoryWithLanguageIds>(flashcardCategories as FlashcardCategoryWithLanguageIds).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<FlashcardCategoryWithLanguageIds>({
            actionName: "GetAllFCategories",
            logger,
            error
        })
    }
}

export async function GetFCategoryCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<FlashcardCategoryWithDeckWords[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetFCategoryCreateItems: Request received", {userId, language, practice})

        // QUERY
        const query = getFCategoryCreateItemsQuery(userId, language, practice)

        // ZOD VALIDATION
        const validatedQuery = await GetFCategoryCreateItemsQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const flashcardCategories = await queryBus.send(validatedQuery)

        return ServiceResult.success<FlashcardCategoryWithDeckWords[]>(flashcardCategories as FlashcardCategoryWithDeckWords[]).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<FlashcardCategoryWithDeckWords[]>({
            actionName: "GetFCategoryCreateItems",
            logger,
            error,
            expectedErrors: [NoLanguageFound, NoPracticeFound],
            silentErrors: [NoLanguageFound, NoPracticeFound]
        })
    }
}

export async function GetFlashcardCategoryById(id: number) : Promise<SerializedServiceResult<FlashcardCategoryWithLanguageId>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetFlashcardCategoryById: Request received for Id ${id}`)

        // QUERY
        const query = getFlashcardCategoryByIdQuery(id)

        // ZOD VALIDATION
        const validatedQuery = await GetFlashcardCategoryByIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const flashcardCategory = await queryBus.send(validatedQuery)

        return ServiceResult.success<FlashcardCategoryWithLanguageId>(flashcardCategory as FlashcardCategoryWithLanguageId).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<FlashcardCategoryWithLanguageId>({
            actionName: "GetFlashcardCategoryById",
            logger,
            error,
            expectedErrors: [FlashcardCategoryNotFound]
        })
    }
}