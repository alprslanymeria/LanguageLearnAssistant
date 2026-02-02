// IMPORTS
import { HttpStatusCode } from "./HttpStatusCode"

// SERIALIZABLE TYPE'S FOR RETURN FROM SERVER ACTIONS
export type SerializedServiceResult<T> = {
    data?: T
    errorMessage?: string[]
    status: HttpStatusCode
    urlAsCreated?: string
    isSuccess: boolean
    isFail: boolean
    shouldDisplayError?: boolean
}

export type SerializedServiceResultBase = {
    errorMessage?: string[]
    status: HttpStatusCode
    isSuccess: boolean
    isFail: boolean
    shouldDisplayError?: boolean
}

export class ServiceResult<T> {

    data?: T
    errorMessage?: string[]
    status!: HttpStatusCode
    urlAsCreated?: string
    shouldDisplayError?: boolean
    private constructor(init?: Partial<ServiceResult<T>>) {
        
        Object.assign(this, init)
    }

    // COMPUTED PROPERTIES
    get isSuccess() : boolean {

        return !this.errorMessage || this.errorMessage.length === 0
    }

    get isFail() : boolean {

        return !this.isSuccess
    }

    // SERIALIZE METHOD
    toPlain(): SerializedServiceResult<T> {
        return {
            data: this.data,
            errorMessage: this.errorMessage,
            status: this.status,
            urlAsCreated: this.urlAsCreated,
            isSuccess: this.isSuccess,
            isFail: this.isFail,
            shouldDisplayError: this.shouldDisplayError
        }
    }

    // FACTORY METHODS
    static success<T>(data: T, status: HttpStatusCode = HttpStatusCode.OK) : ServiceResult<T> {

        return new ServiceResult<T>({ data, status })
    }

    static successAsCreated<T>(data: T, urlAsCreated: string) : ServiceResult<T> {

        return new ServiceResult<T>({ data, status: HttpStatusCode.Created, urlAsCreated })
    }

    static fail<T>(errorMessage: string[], status: HttpStatusCode = HttpStatusCode.BadRequest, shouldDisplayError?: boolean) : ServiceResult<T> {

        return new ServiceResult<T>({ errorMessage, status, shouldDisplayError })
    }

    static failOne<T>(errorMessage: string, status: HttpStatusCode = HttpStatusCode.BadRequest, shouldDisplayError?: boolean) : ServiceResult<T> {

        return new ServiceResult<T>({ errorMessage: [errorMessage], status, shouldDisplayError })
    }
}


export class ServiceResultBase {

    errorMessage?: string[]
    status!: HttpStatusCode
    shouldDisplayError?: boolean

    private constructor(init?: Partial<ServiceResultBase>) {
        
        Object.assign(this, init)
    }

    // COMPUTED PROPERTIES
    get isSuccess() : boolean {

        return !this.errorMessage || this.errorMessage.length === 0
    }

    get isFail() : boolean {

        return !this.isSuccess
    }

    // SERIALIZE METHOD
    toPlain(): SerializedServiceResultBase {
        return {
            errorMessage: this.errorMessage,
            status: this.status,
            isSuccess: this.isSuccess,
            isFail: this.isFail,
            shouldDisplayError: this.shouldDisplayError
        }
    }

    // FACTORY METHODS
    static success(status: HttpStatusCode = HttpStatusCode.OK) : ServiceResultBase {

        return new ServiceResultBase({ status })
    }

    static fail(errorMessage: string[], status: HttpStatusCode = HttpStatusCode.BadRequest, shouldDisplayError?: boolean) : ServiceResultBase {

        return new ServiceResultBase({ errorMessage, status, shouldDisplayError })
    }

    static failOne(errorMessage: string, status: HttpStatusCode = HttpStatusCode.BadRequest, shouldDisplayError?: boolean) : ServiceResultBase {

        return new ServiceResultBase({ errorMessage: [errorMessage], status, shouldDisplayError })
    }
}