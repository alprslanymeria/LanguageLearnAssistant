// EXCEPTION BASE TYPES FOR CATEGORIZATION
import * as NotFoundExceptions from "@/src/exceptions/NotFound"
import * as InvalidExceptions from "@/src/exceptions/invalid"
import * as AlreadyExistExceptions from "@/src/exceptions/AlreadyExist"
import * as NotSuccessExceptions from "@/src/exceptions/NotSuccess"
import { HttpStatusCode } from "./HttpStatusCode"
import { ILogger } from "../logging/ILogger"

// ERROR CATEGORIES
export type ErrorCategory = "NotFound" | "Invalid" | "AlreadyExist" | "NotSuccess" | "Validation" | "APIError" | "Unknown"

// ERROR MAPPING INTERFACE
export interface ErrorMapping {

    statusCode: HttpStatusCode
    category: ErrorCategory
}

// COLLECT ALL EXCEPTION TYPES FROM MODULES
export const NotFoundErrorTypes = Object.values(NotFoundExceptions)
export const InvalidErrorTypes = Object.values(InvalidExceptions)
export const AlreadyExistErrorTypes = Object.values(AlreadyExistExceptions)
export const NotSuccessErrorTypes = Object.values(NotSuccessExceptions)

// ERROR TYPE TO HTTPS STATUS CODE MAPPING
export const errorCategoryMap: Record<ErrorCategory, HttpStatusCode> = {

    NotFound: HttpStatusCode.NotFound,
    Invalid: HttpStatusCode.BadRequest,
    AlreadyExist: HttpStatusCode.BadRequest,
    NotSuccess: HttpStatusCode.BadRequest,
    Validation: HttpStatusCode.BadRequest,
    APIError: HttpStatusCode.BadRequest,
    Unknown: HttpStatusCode.InternalServerError
}

// CONFIGURATION FOR ERROR HANDLING
export interface ErrorHandlerConfig<T> {

    actionName: string
    logger: ILogger
    error: unknown
    expectedErrors?: Array<new (...args: any[]) => Error>
    silentErrors?: Array<new (...args: any[]) => Error>
    context?: Record<string, unknown>
}

// CONFIGURATION FOR SERIALIZED ERROR HANDLING
export interface SerializedErrorHandlerConfig<T> extends ErrorHandlerConfig<T> {}