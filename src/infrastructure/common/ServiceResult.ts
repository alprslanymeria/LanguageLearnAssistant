// IMPORTS
import { HttpStatusCode } from "./HttpStatusCode"

export class ServiceResult<T> {

    data?: T
    errorMessage?: string[]
    status!: HttpStatusCode
    urlAsCreated?: string

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

    // FACTORY METHODS
    static success<T>(data: T, status: HttpStatusCode = HttpStatusCode.OK) : ServiceResult<T> {

        return new ServiceResult<T>({ data, status })
    }

    static successAsCreated<T>(data: T, urlAsCreated: string) : ServiceResult<T> {

        return new ServiceResult<T>({ data, status: HttpStatusCode.Created, urlAsCreated })
    }

    static fail<T>(errorMessage: string[], status: HttpStatusCode = HttpStatusCode.BadRequest) : ServiceResult<T> {

        return new ServiceResult<T>({ errorMessage, status })
    }

    static failOne<T>(errorMessage: string, status: HttpStatusCode = HttpStatusCode.BadRequest) : ServiceResult<T> {

        return new ServiceResult<T>({ errorMessage: [errorMessage], status })
    }
}


export class ServiceResultBase {

    errorMessage?: string[]
    status!: HttpStatusCode

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

    // FACTORY METHODS
    static success(status: HttpStatusCode = HttpStatusCode.OK) : ServiceResultBase {

        return new ServiceResultBase({ status })
    }

    static fail(errorMessage: string[], status: HttpStatusCode = HttpStatusCode.BadRequest) : ServiceResultBase {

        return new ServiceResultBase({ errorMessage, status })
    }

    static failOne(errorMessage: string, status: HttpStatusCode = HttpStatusCode.BadRequest) : ServiceResultBase {

        return new ServiceResultBase({ errorMessage: [errorMessage], status })
    }
}