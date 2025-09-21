// TYPES
import { ApiResponse } from "../../src/types/response"


export function createResponse<T>(

    success: boolean,
    status: number = 200,
    data: T | null,
    message?: string,

): ApiResponse<T> {

    return {
        success,
        status,
        message: message ?? (success ? "OPERATION SUCCESS" : "OPERATION FAILED"),
        data,
    }
}