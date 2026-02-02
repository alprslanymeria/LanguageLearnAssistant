// IMPORTS
import { ZodError } from "zod"
import { APIError } from "better-auth"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ServiceResult, SerializedServiceResult, ServiceResultBase, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { ErrorMapping, NotFoundErrorTypes, InvalidErrorTypes, AlreadyExistErrorTypes, NotSuccessErrorTypes, ErrorHandlerConfig, SerializedErrorHandlerConfig } from "./ErrorHandlerTypes"

// DETERMINES THE ERROR CATEGORY BASED ON ERROR TYPE
function getErrorCategory(error: unknown): ErrorMapping {
    
    if (error instanceof ZodError) {
        return { statusCode: HttpStatusCode.BadRequest, category: "Validation" }
    }

    if (error instanceof APIError) {
        return { statusCode: HttpStatusCode.BadRequest, category: "APIError" }
    }

    if (NotFoundErrorTypes.some(ErrorType => error instanceof ErrorType)) {
        return { statusCode: HttpStatusCode.NotFound, category: "NotFound" }
    }

    if (InvalidErrorTypes.some(ErrorType => error instanceof ErrorType)) {
        return { statusCode: HttpStatusCode.BadRequest, category: "Invalid" }
    }

    if (AlreadyExistErrorTypes.some(ErrorType => error instanceof ErrorType)) {
        return { statusCode: HttpStatusCode.BadRequest, category: "AlreadyExist" }
    }

    if (NotSuccessErrorTypes.some(ErrorType => error instanceof ErrorType)) {
        return { statusCode: HttpStatusCode.BadRequest, category: "NotSuccess" }
    }

    return { statusCode: HttpStatusCode.InternalServerError, category: "Unknown" }
}

// GETS THE ERROR MESSAGE FROM DIFFERENT ERROR TYPES
function getErrorMessage(error: unknown): string {
    
    if (error instanceof ZodError) {

        const firstIssue = error.issues[0]
        const fieldPath = firstIssue?.path.join('.') || 'unknown'

        return `${fieldPath}: ${firstIssue?.message ?? "Validation error"}`
    }

    if (error instanceof APIError) return (error as Error).message

    if (NotFoundErrorTypes.some(ErrorType => error instanceof ErrorType)) return (error as Error).message

    if (InvalidErrorTypes.some(ErrorType => error instanceof ErrorType)) return (error as Error).message

    if (AlreadyExistErrorTypes.some(ErrorType => error instanceof ErrorType)) return (error as Error).message

    if (NotSuccessErrorTypes.some(ErrorType => error instanceof ErrorType)) return (error as Error).message

    if (error instanceof Error) return error.message
    

    return "SERVER ERROR!"
}

// CENTRAL ERROR HANDLER FOR ACTION METHODS
export function handleError<T>(config: ErrorHandlerConfig<T>): ServiceResult<T> {
    
    // GET CONFIGURATION INFOS
    const { actionName, logger, error, expectedErrors = [], silentErrors = [], context } = config
    const { statusCode, category } = getErrorCategory(error)

    // SHOULD DISPLAY
    const shouldDisplay = !silentErrors.some(ErrorType => error instanceof ErrorType)
    
    // LOG CONTEXT
    const logContext = {

        category,
        statusCode,
        ...context,
        ...(error instanceof Error && { message: error.message, stack: error.stack })
    }

    // DETERMINE ERROR MESSAGE
    let userMessage: string

    if (error instanceof ZodError) {

        userMessage = getErrorMessage(error)

        const allErrors = error.issues.map(issue => ({

            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code
        }))

        logger.error(`${actionName}: INVALID FORM DATA!`, { firstError: userMessage, allErrors, ...logContext })
    } 
    else if (expectedErrors.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
        logger.error(`${actionName}: ${(error as Error).name}`, logContext)
    }
    else if (error instanceof APIError) {

        userMessage = getErrorMessage(error)
    }
    else if (NotFoundErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (InvalidErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (AlreadyExistErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (NotSuccessErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (error instanceof Error) {

        userMessage = "SERVER ERROR!"
        logger.error(`${actionName}: FAIL`, logContext)
    }
    else {

        userMessage = "SERVER ERROR!"
        logger.error(`${actionName}: FAIL`, { error, ...logContext })
    }

    return ServiceResult.failOne<T>(userMessage, statusCode, shouldDisplay)
}

export function handleErrorSerialized<T>(config: SerializedErrorHandlerConfig<T>): SerializedServiceResult<T> {
    
    return handleError<T>(config).toPlain()
}

// CENTRAL ERROR HANDLER FOR ACTION METHODS THAT RETURNS ServiceResultBase
export function handleErrorBase(config: Omit<ErrorHandlerConfig<void>, "expectedErrors"> & { expectedErrors?: Array<new (...args: any[]) => Error> }): ServiceResultBase {
    
    // GET CONFIGURATION INFOS
    const { actionName, logger, error, expectedErrors = [], silentErrors = [], context } = config
    const { statusCode, category } = getErrorCategory(error)

    // SHOULD DISPLAY
    const shouldDisplay = !silentErrors.some(ErrorType => error instanceof ErrorType)
    
    // LOG CONTEXT
    const logContext = {

        category,
        statusCode,
        ...context,
        ...(error instanceof Error && { message: error.message, stack: error.stack })
    }

    // DETERMINE ERROR MESSAGE
    let userMessage: string

    if (error instanceof ZodError) {

        userMessage = getErrorMessage(error)

        const allErrors = error.issues.map(issue => ({

            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code
        }))

        logger.error(`${actionName}: INVALID FORM DATA!`, { firstError: userMessage, allErrors, ...logContext })
    } 
    else if (expectedErrors.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
        logger.error(`${actionName}: ${(error as Error).name}`, logContext)
    }
    else if (error instanceof APIError) {

        userMessage = getErrorMessage(error)
    }
    else if (NotFoundErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (InvalidErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (AlreadyExistErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (NotSuccessErrorTypes.some(ErrorType => error instanceof ErrorType)) {

        userMessage = getErrorMessage(error)
    }
    else if (error instanceof Error) {

        userMessage = "SERVER ERROR!"
        logger.error(`${actionName}: FAIL`, logContext)
    }
    else {

        userMessage = "SERVER ERROR!"
        logger.error(`${actionName}: FAIL`, { error, ...logContext })
    }

    return ServiceResultBase.failOne(userMessage, statusCode, shouldDisplay)
}

export function handleErrorBaseSerialized(config: Omit<ErrorHandlerConfig<void>, "expectedErrors"> & { expectedErrors?: Array<new (...args: any[]) => Error> }): SerializedServiceResultBase {
    
    return handleErrorBase(config).toPlain()
}