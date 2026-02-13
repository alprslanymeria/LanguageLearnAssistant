"use server"

// NEXT
import { cookies } from "next/headers"
// TYPES
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { AUTH_COOKIES } from "@/src/infrastructure/auth/authTypes"


const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL


type BackendApiResponse<T> = {

    data?: T
    errorMessage?: string[]
}


// FOR QUERY REQUESTS
export async function backendFetch<T>(

    endpoint: string,
    options?: RequestInit

): Promise<SerializedServiceResult<T>> {

    try {

        const cookieStore = await cookies()
        const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value

        const response = await fetch(`${BACKEND_SERVER_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
                ...options?.headers,
            },
        })

        const result: BackendApiResponse<T> = await response.json()

        const hasError = !response.ok || (result.errorMessage && result.errorMessage.length > 0)

        return {
            data: result.data,
            errorMessage: result.errorMessage,
            status: response.status as HttpStatusCode,
            isSuccess: !hasError,
            isFail: !!hasError,
            shouldDisplayError: !!hasError,
        }

    } catch {

        return {
            errorMessage: ["Unable to connect to the server"],
            status: HttpStatusCode.InternalServerError,
            isSuccess: false,
            isFail: true,
            shouldDisplayError: true,
        }
    }
}

// FOR COMMAND REQUESTS
export async function backendFetchBase(

    endpoint: string,
    options?: RequestInit
    
): Promise<SerializedServiceResultBase> {

    try {

        const cookieStore = await cookies()
        const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value

        const response = await fetch(`${BACKEND_SERVER_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
                ...options?.headers,
            },
        })

        const result: BackendApiResponse<void> = await response.json()

        const hasError = !response.ok || (result.errorMessage && result.errorMessage.length > 0)

        return {
            errorMessage: result.errorMessage,
            status: response.status as HttpStatusCode,
            isSuccess: !hasError,
            isFail: !!hasError,
            shouldDisplayError: !!hasError,
        }

    } catch {

        return {
            errorMessage: ["Unable to connect to the server"],
            status: HttpStatusCode.InternalServerError,
            isSuccess: false,
            isFail: true,
            shouldDisplayError: true,
        }
    }
}

// FOR COMMAND REQUESTS WITH FORM DATA (WITHOUT JSON CONTENT TYPE)
export async function backendFetchForm(

    endpoint: string,
    options?: RequestInit
    
): Promise<SerializedServiceResultBase> {

    try {

        const cookieStore = await cookies()
        const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value

        const response = await fetch(`${BACKEND_SERVER_URL}${endpoint}`, {
            ...options,
            headers: {
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
                ...options?.headers,
            },
        })

        const result: BackendApiResponse<void> = await response.json()

        const hasError = !response.ok || (result.errorMessage && result.errorMessage.length > 0)

        return {
            errorMessage: result.errorMessage,
            status: response.status as HttpStatusCode,
            isSuccess: !hasError,
            isFail: !!hasError,
            shouldDisplayError: !!hasError,
        }

    } catch {

        return {
            errorMessage: ["Unable to connect to the server"],
            status: HttpStatusCode.InternalServerError,
            isSuccess: false,
            isFail: true,
            shouldDisplayError: true,
        }
    }
}