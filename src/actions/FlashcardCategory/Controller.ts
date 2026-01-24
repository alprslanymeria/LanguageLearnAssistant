"use server"

import { ZodError } from "zod"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { CreateFlashcardCategoryRequest, UpdateFlashcardCategoryRequest } from "@/src/actions/FlashcardCategory/Request"
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
import { FlashcardCategoryDto, FlashcardCategoryWithLanguageId, FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { getAllFCategoriesWithPagingQuery } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryFactory"
import { GetAllFCategoriesWithPagingQueryValidator } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryValidator"
import { getFCategoryCreateItemsQuery } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryFactory"
import { GetFCategoryCreateItemsQueryValidator } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryValidator"
import { getFlashcardCategoryByIdQuery } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryFactory"
import { GetFlashcardCategoryByIdQueryValidator } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryValidator"

export async function CreateFlashcardCategory(request: CreateFlashcardCategoryRequest) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("CreateFlashcardCategory: Request received")

        // COMMAND
        const command = createFlashcardCategoryCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await createFlashcardCategoryCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const flashcardCategoryId = await commandBus.send(validatedCommand)

        return ServiceResult.success<number>(flashcardCategoryId as number)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CreateFlashcardCategory: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("CreateFlashcardCategory: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function DeleteFCategoryItemById(id: number) : Promise<ServiceResultBase> {

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

        return ServiceResultBase.success(HttpStatusCode.NoContent)

    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("DeleteFCategoryItemById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResultBase.failOne(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof FlashcardCategoryNotFound) {

            logger.error("DeleteFCategoryItemById: FLASHCARD CATEGORY NOT FOUND!", {error})
            // SHOW TO USER
            return ServiceResultBase.failOne(error.message, HttpStatusCode.NotFound)
        }

        logger.error("DeleteFCategoryItemById: FAIL", {error})
        return ServiceResultBase.failOne("SERVER ERROR!", HttpStatusCode.InternalServerError)
        
    }
}

export async function UpdateFlashcardCategory(request: UpdateFlashcardCategoryRequest) : Promise<ServiceResult<number>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info(`UpdateFlashcardCategory: Request received for Id ${request.id}`)

        // COMMAND
        const command = updateFlashcardCategoryCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await UpdateFlashcardCategoryCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        const updatedId = await commandBus.send(validatedCommand)

        return ServiceResult.success<number>(updatedId as number)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("UpdateFlashcardCategory: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<number>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof FlashcardResultNotSuccess) {

            logger.error("UpdateFlashcardCategory: FLASHCARD RESULT NOT SUCCESS!", {error})
            // SHOW TO USER
            return ServiceResult.failOne<number>(error.message, HttpStatusCode.InternalServerError)
        }

        logger.error("UpdateFlashcardCategory: FAIL", {error})
        return ServiceResult.failOne<number>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}


export async function GetAllFCategoriesWithPaging(userId: string, request: PagedRequest) : Promise<ServiceResult<PagedResult<FlashcardCategoryWithTotalCount>>> {

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

        return ServiceResult.success<PagedResult<FlashcardCategoryWithTotalCount>>(pagedResult as PagedResult<FlashcardCategoryWithTotalCount>)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetAllFCategoriesWithPaging: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PagedResult<FlashcardCategoryWithTotalCount>>(firstError, HttpStatusCode.BadRequest)
        }

        logger.error("GetAllFCategoriesWithPaging: FAIL", {error})
        return ServiceResult.failOne<PagedResult<FlashcardCategoryWithTotalCount>>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}

export async function GetFCategoryCreateItems(userId: string, language: string, practice: string) : Promise<ServiceResult<FlashcardCategoryDto[]>> {

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

        return ServiceResult.success<FlashcardCategoryDto[]>(flashcardCategories as FlashcardCategoryDto[])
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetFCategoryCreateItems: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<FlashcardCategoryDto[]>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof NoLanguageFound) {

            logger.error("GetFCategoryCreateItems: NO LANGUAGE FOUND!", {error})
            // SHOW TO USER
            return ServiceResult.failOne<FlashcardCategoryDto[]>(error.message, HttpStatusCode.NotFound)
        }

        if(error instanceof NoPracticeFound) {

            logger.error("GetFCategoryCreateItems: NO PRACTICE FOUND!", {error})
            // SHOW TO USER
            return ServiceResult.failOne<FlashcardCategoryDto[]>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetFCategoryCreateItems: FAIL", {error})
        return ServiceResult.failOne<FlashcardCategoryDto[]>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}


export async function GetFlashcardCategoryById(id: number) : Promise<ServiceResult<FlashcardCategoryWithLanguageId>> {

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

        return ServiceResult.success<FlashcardCategoryWithLanguageId>(flashcardCategory as FlashcardCategoryWithLanguageId)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetFlashcardCategoryById: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<FlashcardCategoryWithLanguageId>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof FlashcardCategoryNotFound) {

            logger.error("GetFlashcardCategoryById: FLASHCARD CATEGORY NOT FOUND!", {error})
            // SHOW TO USER
            return ServiceResult.failOne<FlashcardCategoryWithLanguageId>(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetFlashcardCategoryById: FAIL", {error})
        return ServiceResult.failOne<FlashcardCategoryWithLanguageId>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}